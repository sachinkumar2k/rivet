use api_helper::{anchor::WatchIndexQuery, ctx::Ctx};
use rivet_api::models;
use rivet_convert::{ApiInto, ApiTryInto};
use rivet_operation::prelude::*;
use serde::Deserialize;
use serde_json::json;
use std::collections::{HashMap, HashSet};

use crate::{
	assert,
	auth::{Auth, CheckOutput},
	utils::build_global_query_compat,
};

use super::GlobalQuery;

// MARK: GET /actors/{}
pub async fn get(
	ctx: Ctx<Auth>,
	actor_id: Uuid,
	watch_index: WatchIndexQuery,
	query: GlobalQuery,
) -> GlobalResult<models::ActorGetActorResponse> {
	get_inner(&ctx, actor_id, watch_index, query).await
}

async fn get_inner(
	ctx: &Ctx<Auth>,
	actor_id: Uuid,
	_watch_index: WatchIndexQuery,
	query: GlobalQuery,
) -> GlobalResult<models::ActorGetActorResponse> {
	let CheckOutput { env_id, .. } = ctx.auth().check(ctx.op_ctx(), &query, false).await?;

	// Get the server
	let servers_res = ctx
		.op(ds::ops::server::get::Input {
			server_ids: vec![actor_id],
		})
		.await?;
	let server = unwrap_with!(servers_res.servers.first(), SERVERS_SERVER_NOT_FOUND);

	// Get the datacenter
	let dc_res = ctx
		.op(cluster::ops::datacenter::get::Input {
			datacenter_ids: vec![server.datacenter_id],
		})
		.await?;
	let dc = unwrap!(dc_res.datacenters.first());

	// Validate token can access server
	ensure_with!(server.env_id == env_id, SERVERS_SERVER_NOT_FOUND);

	Ok(models::ActorGetActorResponse {
		actor: Box::new(ds::types::convert_actor_to_api(server.clone(), dc)?),
	})
}

pub async fn get_deprecated(
	ctx: Ctx<Auth>,
	game_id: Uuid,
	env_id: Uuid,
	actor_id: Uuid,
	watch_index: WatchIndexQuery,
) -> GlobalResult<models::ServersGetServerResponse> {
	let global = build_global_query_compat(&ctx, game_id, env_id).await?;
	let get_res = get_inner(&ctx, actor_id, watch_index, global).await?;

	let game_res = ctx
		.op(cluster::ops::get_for_game::Input {
			game_ids: vec![game_id],
		})
		.await?;
	let game = unwrap!(game_res.games.first());

	let dc_resolve_res = ctx
		.op(cluster::ops::datacenter::resolve_for_name_id::Input {
			cluster_id: game.cluster_id,
			name_ids: vec![get_res.actor.region.clone()],
		})
		.await?;
	let dc_id = unwrap!(dc_resolve_res.datacenters.first()).datacenter_id;

	let dc_res = ctx
		.op(cluster::ops::datacenter::get::Input {
			datacenter_ids: vec![dc_id],
		})
		.await?;
	let dc = unwrap!(dc_res.datacenters.first());

	Ok(models::ServersGetServerResponse {
		server: Box::new(legacy_convert_actor_to_server(*get_res.actor, dc)),
	})
}

// MARK: POST /actors
pub async fn create(
	ctx: Ctx<Auth>,
	body: models::ActorCreateActorRequest,
	query: GlobalQuery,
) -> GlobalResult<models::ActorCreateActorResponse> {
	let CheckOutput { game_id, env_id } = ctx.auth().check(ctx.op_ctx(), &query, false).await?;

	let (clusters_res, game_configs_res) = tokio::try_join!(
		ctx.op(cluster::ops::get_for_game::Input {
			game_ids: vec![game_id],
		}),
		ctx.op(ds::ops::game_config::get::Input {
			game_ids: vec![game_id],
		}),
	)?;
	let cluster_id = unwrap!(clusters_res.games.first()).cluster_id;
	let game_config = unwrap!(game_configs_res.game_configs.first());

	let resolved_dc_ids = ctx
		.op(cluster::ops::datacenter::resolve_for_name_id::Input {
			cluster_id,
			name_ids: vec![body.region.clone()],
		})
		.await?;
	let datacenter_id = unwrap!(resolved_dc_ids.datacenters.first()).datacenter_id;

	let tags = serde_json::from_value(body.tags.unwrap_or_default())?;

	tracing::info!(?tags, "creating server with tags");

	let server_id = Uuid::new_v4();

	let mut create_sub = ctx
		.subscribe::<ds::workflows::server::CreateComplete>(("server_id", server_id))
		.await?;
	let mut fail_sub = ctx
		.subscribe::<ds::workflows::server::CreateFailed>(("server_id", server_id))
		.await?;

	ctx.workflow(ds::workflows::server::Input {
		server_id,
		env_id,
		datacenter_id,
		cluster_id,
		runtime: game_config.runtime,
		tags,
		resources: (*body.resources).api_into(),
		kill_timeout_ms: body
			.lifecycle
			.as_ref()
			.and_then(|x| x.kill_timeout)
			.unwrap_or_default(),
		image_id: body.runtime.build,
		root_user_enabled: game_config.root_user_enabled,
		args: body.runtime.arguments.unwrap_or_default(),
		network_mode: body.network.mode.unwrap_or_default().api_into(),
		environment: body.runtime.environment.unwrap_or_default(),
		network_ports: unwrap!(body
			.network
			.ports
			.into_iter()
			.map(|(s, p)| Ok((
				s,
				ds::workflows::server::Port {
					internal_port: p.internal_port.map(TryInto::try_into).transpose()?,
					routing: if let Some(routing) = p.routing {
						match *routing {
							models::ActorPortRouting {
								game_guard: Some(gg),
								host: None,
							} => ds::types::Routing::GameGuard {
								protocol: p.protocol.api_into(),
								authorization: match gg.authorization.as_deref() {
									Some(models::ActorPortAuthorization {
										bearer: Some(token),
										..
									}) => ds::types::PortAuthorization::Bearer(token.clone()),
									Some(models::ActorPortAuthorization {
										query: Some(query),
										..
									}) => ds::types::PortAuthorization::Query(
										query.key.clone(),
										query.value.clone(),
									),
									_ => ds::types::PortAuthorization::None,
								},
							},
							models::ActorPortRouting {
								game_guard: None,
								host: Some(_),
							} => ds::types::Routing::Host {
								protocol: p.protocol.api_try_into()?,
							},
							models::ActorPortRouting { .. } => {
								bail_with!(SERVERS_MUST_SPECIFY_ROUTING_TYPE)
							}
						}
					} else {
						ds::types::Routing::GameGuard {
							protocol: p.protocol.api_into(),
							authorization: ds::types::PortAuthorization::None,
						}
					}
				}
			)))
			.collect::<GlobalResult<HashMap<_, _>>>()),
	})
	.tag("server_id", server_id)
	.dispatch()
	.await?;

	tokio::select! {
		res = create_sub.next() => { res?; },
		res = fail_sub.next() => {
			res?;
			bail_with!(SERVERS_SERVER_FAILED_TO_CREATE);
		}
	}

	let servers_res = ctx
		.op(ds::ops::server::get::Input {
			server_ids: vec![server_id],
		})
		.await?;
	let server = unwrap_with!(servers_res.servers.first(), SERVERS_SERVER_NOT_FOUND);

	let dc_res = ctx
		.op(cluster::ops::datacenter::get::Input {
			datacenter_ids: vec![server.datacenter_id],
		})
		.await?;
	let dc = unwrap!(dc_res.datacenters.first());

	Ok(models::ActorCreateActorResponse {
		actor: Box::new(ds::types::convert_actor_to_api(server.clone(), dc)?),
	})
}

pub async fn create_deprecated(
	ctx: Ctx<Auth>,
	game_id: Uuid,
	env_id: Uuid,
	body: models::ServersCreateServerRequest,
) -> GlobalResult<models::ServersCreateServerResponse> {
	// Resolve region slug
	let dc_res = ctx
		.op(cluster::ops::datacenter::get::Input {
			datacenter_ids: vec![body.datacenter],
		})
		.await?;
	let dc = unwrap!(dc_res.datacenters.first());

	let global = build_global_query_compat(&ctx, game_id, env_id).await?;
	let create_res = create(
		ctx,
		models::ActorCreateActorRequest {
			region: dc.name_id.clone(),
			lifecycle: body.lifecycle.map(|l| {
				Box::new(models::ActorLifecycle {
					kill_timeout: l.kill_timeout,
				})
			}),
			network: Box::new(models::ActorCreateActorNetworkRequest {
				mode: body.network.mode.map(|n| match n {
					models::ServersNetworkMode::Host => models::ActorNetworkMode::Host,
					models::ServersNetworkMode::Bridge => models::ActorNetworkMode::Bridge,
				}),
				ports: body
					.network
					.ports
					.into_iter()
					.map(|(k, p)| {
						(
							k,
							models::ActorCreateActorPortRequest {
								internal_port: p.internal_port,
								protocol: match p.protocol {
									models::ServersPortProtocol::Http => {
										models::ActorPortProtocol::Http
									}
									models::ServersPortProtocol::Https => {
										models::ActorPortProtocol::Https
									}
									models::ServersPortProtocol::Tcp => {
										models::ActorPortProtocol::Tcp
									}
									models::ServersPortProtocol::TcpTls => {
										models::ActorPortProtocol::TcpTls
									}
									models::ServersPortProtocol::Udp => {
										models::ActorPortProtocol::Udp
									}
								},
								routing: p.routing.map(|r| {
									Box::new(models::ActorPortRouting {
										game_guard: r.game_guard.map(|_| {
											Box::new(models::ActorGameGuardRouting::default())
										}),
										host: r.host.map(|_| json!({})),
									})
								}),
							},
						)
					})
					.collect(),
			}),
			resources: Box::new(models::ActorResources {
				cpu: body.resources.cpu,
				memory: body.resources.memory,
			}),
			runtime: Box::new(models::ActorCreateActorRuntimeRequest {
				arguments: body.runtime.arguments,
				environment: body.runtime.environment,
				build: body.runtime.build,
			}),
			tags: body.tags,
		},
		global,
	)
	.await?;

	Ok(models::ServersCreateServerResponse {
		server: Box::new(legacy_convert_actor_to_server(*create_res.actor, &dc)),
	})
}

// MARK: DELETE /actors/{}
#[derive(Debug, Clone, Deserialize)]
pub struct DeleteQuery {
	#[serde(flatten)]
	global: GlobalQuery,
	override_kill_timeout: Option<i64>,
}

pub async fn destroy(
	ctx: Ctx<Auth>,
	actor_id: Uuid,
	query: DeleteQuery,
) -> GlobalResult<serde_json::Value> {
	let CheckOutput { game_id, env_id } =
		ctx.auth().check(ctx.op_ctx(), &query.global, false).await?;

	assert::server_for_env(&ctx, actor_id, game_id, env_id).await?;

	ensure_with!(
		query.override_kill_timeout.unwrap_or(0) >= 0,
		API_BAD_QUERY_PARAMETER,
		parameter = "override_kill_timeout",
		error = "must be positive"
	);
	ensure_with!(
		query.override_kill_timeout.unwrap_or(0) < 2 * 60 * 60 * 1000,
		API_BAD_QUERY_PARAMETER,
		parameter = "override_kill_timeout",
		error = "cannot be longer than 2 hours"
	);

	let mut sub = ctx
		.subscribe::<ds::workflows::server::DestroyStarted>(("server_id", actor_id))
		.await?;

	ctx.signal(ds::workflows::server::Destroy {
		override_kill_timeout_ms: query.override_kill_timeout,
	})
	.tag("server_id", actor_id)
	.send()
	.await?;

	sub.next().await?;

	Ok(json!({}))
}

pub async fn destroy_deprecated(
	ctx: Ctx<Auth>,
	game_id: Uuid,
	env_id: Uuid,
	actor_id: Uuid,
	query: DeleteQuery,
) -> GlobalResult<serde_json::Value> {
	let global = build_global_query_compat(&ctx, game_id, env_id).await?;
	destroy(
		ctx,
		actor_id,
		DeleteQuery {
			global,
			override_kill_timeout: query.override_kill_timeout,
		},
	)
	.await
}

// MARK: GET /actors
#[derive(Debug, Clone, Deserialize)]
pub struct ListQuery {
	#[serde(flatten)]
	global: GlobalQuery,
	tags_json: Option<String>,
	include_destroyed: Option<bool>,
	cursor: Option<Uuid>,
}

pub async fn list_actors(
	ctx: Ctx<Auth>,
	watch_index: WatchIndexQuery,
	query: ListQuery,
) -> GlobalResult<models::ActorListActorsResponse> {
	list_actors_inner(&ctx, watch_index, query).await
}

async fn list_actors_inner(
	ctx: &Ctx<Auth>,
	_watch_index: WatchIndexQuery,
	query: ListQuery,
) -> GlobalResult<models::ActorListActorsResponse> {
	let CheckOutput { env_id, .. } = ctx.auth().check(ctx.op_ctx(), &query.global, false).await?;

	let list_res = ctx
		.op(ds::ops::server::list_for_env::Input {
			env_id,
			tags: query
				.tags_json
				.as_deref()
				.map_or(Ok(HashMap::new()), serde_json::from_str)?,
			include_destroyed: query.include_destroyed.unwrap_or(false),
			cursor: query.cursor,
		})
		.await?;

	let servers_res = ctx
		.op(ds::ops::server::get::Input {
			server_ids: list_res.server_ids.clone(),
		})
		.await?;

	let datacenter_ids = servers_res
		.servers
		.iter()
		.map(|s| s.datacenter_id)
		.collect::<HashSet<Uuid>>()
		.into_iter()
		.collect::<Vec<_>>();
	let dc_res = ctx
		.op(cluster::ops::datacenter::get::Input { datacenter_ids })
		.await?;

	let servers = servers_res
		.servers
		.into_iter()
		.map(|a| {
			let dc = unwrap!(dc_res
				.datacenters
				.iter()
				.find(|dc| dc.datacenter_id == a.datacenter_id));
			ds::types::convert_actor_to_api(a, &dc)
		})
		.collect::<GlobalResult<Vec<_>>>()?;

	Ok(models::ActorListActorsResponse { actors: servers })
}

pub async fn list_servers_deprecated(
	ctx: Ctx<Auth>,
	game_id: Uuid,
	env_id: Uuid,
	watch_index: WatchIndexQuery,
	query: ListQuery,
) -> GlobalResult<models::ServersListServersResponse> {
	let global = build_global_query_compat(&ctx, game_id, env_id).await?;
	let actors_res = list_actors_inner(&ctx, watch_index, ListQuery { global, ..query }).await?;

	let clusters_res = ctx
		.op(cluster::ops::get_for_game::Input {
			game_ids: vec![game_id],
		})
		.await?;
	let cluster_id = unwrap!(clusters_res.games.first()).cluster_id;

	let dc_name_ids = actors_res
		.actors
		.iter()
		.map(|s| s.region.clone())
		.collect::<HashSet<String>>()
		.into_iter()
		.collect::<Vec<_>>();
	let dc_resolve_res = ctx
		.op(cluster::ops::datacenter::resolve_for_name_id::Input {
			cluster_id,
			name_ids: dc_name_ids,
		})
		.await?;

	let dc_res = ctx
		.op(cluster::ops::datacenter::get::Input {
			datacenter_ids: dc_resolve_res
				.datacenters
				.iter()
				.map(|x| x.datacenter_id)
				.collect::<Vec<_>>(),
		})
		.await?;

	Ok(models::ServersListServersResponse {
		servers: actors_res
			.actors
			.into_iter()
			.map(|a| {
				let dc = unwrap!(dc_res.datacenters.iter().find(|dc| dc.name_id == a.region));
				GlobalResult::Ok(legacy_convert_actor_to_server(a, dc))
			})
			.collect::<Result<Vec<_>, _>>()?,
	})
}

fn legacy_convert_actor_to_server(
	a: models::ActorActor,
	datacenter: &cluster::types::Datacenter,
) -> models::ServersServer {
	models::ServersServer {
		created_at: a.created_at,
		datacenter: datacenter.datacenter_id,
		destroyed_at: a.destroyed_at,
		environment: Uuid::nil(),
		id: a.id,
		lifecycle: Box::new(models::ServersLifecycle {
			kill_timeout: a.lifecycle.kill_timeout,
		}),
		network: Box::new(models::ServersNetwork {
			mode: a.network.mode.map(|n| match n {
				models::ActorNetworkMode::Host => models::ServersNetworkMode::Host,
				models::ActorNetworkMode::Bridge => models::ServersNetworkMode::Bridge,
			}),
			ports: a
				.network
				.ports
				.into_iter()
				.map(|(k, p)| {
					(
						k,
						models::ServersPort {
							internal_port: p.internal_port,
							protocol: match p.protocol {
								models::ActorPortProtocol::Http => {
									models::ServersPortProtocol::Http
								}
								models::ActorPortProtocol::Https => {
									models::ServersPortProtocol::Https
								}
								models::ActorPortProtocol::Tcp => models::ServersPortProtocol::Tcp,
								models::ActorPortProtocol::TcpTls => {
									models::ServersPortProtocol::TcpTls
								}
								models::ActorPortProtocol::Udp => models::ServersPortProtocol::Udp,
							},
							public_hostname: p.public_hostname,
							public_port: p.public_port,
							routing: Box::new(models::ServersPortRouting {
								game_guard: p.routing.game_guard.map(|_| json!({})),
								host: p.routing.host.map(|_| json!({})),
							}),
						},
					)
				})
				.collect(),
		}),
		resources: Box::new(models::ServersResources {
			cpu: a.resources.cpu,
			memory: a.resources.memory,
		}),
		runtime: Box::new(models::ServersRuntime {
			arguments: a.runtime.arguments,
			build: a.runtime.build,
			environment: a.runtime.environment,
		}),
		started_at: a.started_at,
		tags: a.tags,
	}
}
