use std::{
	net::{IpAddr, Ipv4Addr},
	path::{Path, PathBuf},
};

use pegboard::protocol;
use serde::Deserialize;
use url::Url;
use uuid::Uuid;

#[derive(Clone, Deserialize)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Config {
	// We store all configs under `client` in order to prevent the config from being mixed up with
	// the server config.
	pub client: Client,
}

impl Config {
	/// Builds a config that will be sent to the server.
	///
	/// This holds information that the server needs in order to orchestrate nodes.
	pub fn build_client_config(&self) -> pegboard::client_config::ClientConfig {
		pegboard::client_config::ClientConfig {
			network: pegboard::client_config::Network {
				bind_ip: self.client.network.bind_ip.to_string(),
				lan_ip: self.client.network.lan_ip.to_string(),
				wan_ip: self.client.network.wan_ip.to_string(),
				lan_port_range_min: self.client.network.lan_port_range_min(),
				lan_port_range_max: self.client.network.lan_port_range_max(),
				wan_port_range_min: self.client.network.wan_port_range_min(),
				wan_port_range_max: self.client.network.wan_port_range_max(),
			},
			reserved_resources: pegboard::client_config::ReservedResources {
				cpu: self.client.reserved_resources.cpu(),
				memory: self.client.reserved_resources.memory(),
			},
		}
	}
}

#[derive(Clone, Deserialize)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Client {
	pub data_dir: Option<PathBuf>,
	pub cluster: Cluster,
	pub runner: Runner,
	pub network: Network,
	#[serde(default)]
	pub cni: Cni,
	#[serde(default)]
	pub reserved_resources: ReservedResources,
	#[serde(default)]
	pub logs: Logs,
	#[serde(default)]
	pub metrics: Metrics,
	#[serde(default)]
	pub vector: Option<Vector>,
}

impl Client {
	pub fn data_dir(&self) -> PathBuf {
		self.data_dir
			.clone()
			.unwrap_or_else(|| Path::new("/var/lib/rivet-client").to_path_buf())
	}
}

#[derive(Clone, Deserialize)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Cluster {
	pub client_id: Uuid,
	pub datacenter_id: Uuid,
	pub api_endpoint: Url,
	pub pegboard_endpoint: Url,
}

#[derive(Clone, Deserialize)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Runner {
	pub flavor: protocol::ClientFlavor,

	/// WebSocket Port for runners on this machine to connect to.
	pub port: Option<u16>,

	/// If true, a cgroup will be created for the runners.
	///
	/// This should only be disabled for testing & development.
	pub use_cgroup: Option<bool>,

	pub container_runner_binary_path: Option<PathBuf>,
	pub isolate_runner_binary_path: Option<PathBuf>,
}

impl Runner {
	pub fn port(&self) -> u16 {
		self.port.unwrap_or(7080)
	}

	pub fn use_cgroup(&self) -> bool {
		self.use_cgroup.unwrap_or(true)
	}

	pub fn container_runner_binary_path(&self) -> PathBuf {
		self.container_runner_binary_path
			.clone()
			.unwrap_or_else(|| Path::new("/usr/local/bin/rivet-container-runner").into())
	}

	pub fn isolate_runner_binary_path(&self) -> PathBuf {
		self.isolate_runner_binary_path
			.clone()
			.unwrap_or_else(|| Path::new("/usr/local/bin/rivet-isolate-v8-runner").into())
	}
}

#[derive(Clone, Deserialize)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Network {
	/// Address to serve actor traffic on.
	///
	/// This will usually be the same as `actor_lan_ip` unless the node is accessed within the
	/// LAN by a different IP.
	pub bind_ip: Ipv4Addr,

	/// Address to access this node in a LAN.
	///
	/// This IP is used to route traffic from Game Guard.
	pub lan_ip: IpAddr,

	/// Address to access this node publicly.
	///
	/// This IP is used when providing the actor's IP & port for host networking.
	pub wan_ip: IpAddr,

	pub lan_port_range_min: Option<u16>,
	pub lan_port_range_max: Option<u16>,
	pub wan_port_range_min: Option<u16>,
	pub wan_port_range_max: Option<u16>,
}

impl Network {
	pub fn lan_port_range_min(&self) -> u16 {
		self.lan_port_range_min.unwrap_or(20000)
	}

	pub fn lan_port_range_max(&self) -> u16 {
		self.lan_port_range_max.unwrap_or(25999)
	}

	pub fn wan_port_range_min(&self) -> u16 {
		self.wan_port_range_min.unwrap_or(26000)
	}

	pub fn wan_port_range_max(&self) -> u16 {
		self.wan_port_range_max.unwrap_or(31999)
	}
}

#[derive(Clone, Deserialize, Default)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Cni {
	pub network_interface: String,
	pub network_name: Option<String>,
	pub bin_path: Option<String>,
	pub config_path: Option<String>,
}

impl Cni {
	pub fn network_name(&self) -> String {
		self.network_name
			.clone()
			.unwrap_or_else(|| "rivet-actor".into())
	}

	pub fn bin_path(&self) -> String {
		self.bin_path
			.clone()
			.unwrap_or_else(|| "/opt/cni/bin".into())
	}

	pub fn config_path(&self) -> String {
		self.config_path
			.clone()
			.unwrap_or_else(|| "/opt/cni/config".into())
	}
}

#[derive(Clone, Deserialize, Default)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct ReservedResources {
	// Millicores
	pub cpu: Option<u64>,
	// MiB
	pub memory: Option<u64>,
}

impl ReservedResources {
	pub fn cpu(&self) -> u64 {
		self.cpu.unwrap_or(0)
	}

	pub fn memory(&self) -> u64 {
		self.memory.unwrap_or(0)
	}
}

#[derive(Clone, Deserialize, Default)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Logs {
	pub redirect_logs: Option<bool>,
}

impl Logs {
	pub fn redirect_logs(&self) -> bool {
		self.redirect_logs.unwrap_or(true)
	}
}

#[derive(Clone, Deserialize, Default)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Metrics {
	pub port: Option<u16>,
}

impl Metrics {
	pub fn port(&self) -> u16 {
		self.port.unwrap_or(7090)
	}
}

#[derive(Clone, Deserialize)]
#[serde(rename_all = "snake_case", deny_unknown_fields)]
pub struct Vector {
	pub address: String,
}
