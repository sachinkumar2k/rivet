/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as environments from "../../../../../../../../environments";
import * as core from "../../../../../../../../core";
import * as Rivet from "../../../../../../../index";
import { Analytics } from "../resources/analytics/client/Client";
import { Logs } from "../resources/logs/client/Client";
export declare namespace Namespaces {
    interface Options {
        environment?: core.Supplier<environments.RivetEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        fetcher?: core.FetchFunction;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}
export declare class Namespaces {
    protected readonly _options: Namespaces.Options;
    constructor(_options?: Namespaces.Options);
    /**
     * Creates a new namespace for the given game.
     *
     * @param {string} gameId
     * @param {Rivet.cloud.games.namespaces.CreateGameNamespaceRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.createGameNamespace("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         displayName: "string",
     *         versionId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
     *         nameId: "string"
     *     })
     */
    createGameNamespace(gameId: string, request: Rivet.cloud.games.namespaces.CreateGameNamespaceRequest, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.CreateGameNamespaceResponse>;
    /**
     * Validates information used to create a new game namespace.
     *
     * @param {string} gameId
     * @param {Rivet.cloud.games.namespaces.ValidateGameNamespaceRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.validateGameNamespace("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         displayName: "string",
     *         nameId: "string"
     *     })
     */
    validateGameNamespace(gameId: string, request: Rivet.cloud.games.namespaces.ValidateGameNamespaceRequest, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.ValidateGameNamespaceResponse>;
    /**
     * Gets a game namespace by namespace ID.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.getGameNamespaceById("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32")
     */
    getGameNamespaceById(gameId: string, namespaceId: string, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.GetGameNamespaceByIdResponse>;
    /**
     * Adds an authenticated user to the given game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.UpdateNamespaceCdnAuthUserRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.updateNamespaceCdnAuthUser("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         user: "string",
     *         password: "string"
     *     })
     */
    updateNamespaceCdnAuthUser(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.UpdateNamespaceCdnAuthUserRequest, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    /**
     * Removes an authenticated user from the given game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {string} user - A user name.
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.removeNamespaceCdnAuthUser("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "string")
     */
    removeNamespaceCdnAuthUser(gameId: string, namespaceId: string, user: string, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    /**
     * Updates the CDN authentication type of the given game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.SetNamespaceCdnAuthTypeRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.setNamespaceCdnAuthType("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         authType: Rivet.cloud.CdnAuthType.None
     *     })
     */
    setNamespaceCdnAuthType(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.SetNamespaceCdnAuthTypeRequest, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    /**
     * Toggles whether or not to allow authentication based on domain for the given game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.ToggleNamespaceDomainPublicAuthRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.toggleNamespaceDomainPublicAuth("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         enabled: true
     *     })
     */
    toggleNamespaceDomainPublicAuth(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.ToggleNamespaceDomainPublicAuthRequest, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    /**
     * Adds a domain to the given game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.AddNamespaceDomainRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.addNamespaceDomain("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         domain: "string"
     *     })
     */
    addNamespaceDomain(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.AddNamespaceDomainRequest, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    /**
     * Removes a domain from the given game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {string} domain - A valid domain name (no protocol).
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.removeNamespaceDomain("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "string")
     */
    removeNamespaceDomain(gameId: string, namespaceId: string, domain: string, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    /**
     * Updates matchmaker config for the given game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.UpdateGameNamespaceMatchmakerConfigRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.updateGameNamespaceMatchmakerConfig("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         lobbyCountMax: 1,
     *         maxPlayers: 1
     *     })
     */
    updateGameNamespaceMatchmakerConfig(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.UpdateGameNamespaceMatchmakerConfigRequest, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    /**
     * Gets the version history for a given namespace.
     *
     * @param {string} gameId - A universally unique identifier.
     * @param {string} namespaceId - A universally unique identifier.
     * @param {Rivet.cloud.games.namespaces.GetGameNamespaceVersionHistoryRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.getGameNamespaceVersionHistoryList("string", "string", {
     *         anchor: "string",
     *         limit: 1
     *     })
     */
    getGameNamespaceVersionHistoryList(gameId: string, namespaceId: string, request?: Rivet.cloud.games.namespaces.GetGameNamespaceVersionHistoryRequest, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.GetGameNamespaceVersionHistoryResponse>;
    /**
     * Validates information used to update a game namespace's matchmaker config.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.ValidateGameNamespaceMatchmakerConfigRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.validateGameNamespaceMatchmakerConfig("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         lobbyCountMax: 1,
     *         maxPlayers: 1
     *     })
     */
    validateGameNamespaceMatchmakerConfig(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.ValidateGameNamespaceMatchmakerConfigRequest, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.ValidateGameNamespaceMatchmakerConfigResponse>;
    /**
     * Creates a development token for the given namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.CreateGameNamespaceTokenDevelopmentRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.createGameNamespaceTokenDevelopment("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         hostname: "string",
     *         ports: {
     *             "string": {
     *                 port: undefined,
     *                 portRange: undefined,
     *                 protocol: Rivet.cloud.version.matchmaker.PortProtocol.Http
     *             }
     *         },
     *         lobbyPorts: [{
     *                 label: "string",
     *                 targetPort: undefined,
     *                 portRange: undefined,
     *                 proxyProtocol: Rivet.cloud.version.matchmaker.PortProtocol.Http
     *             }]
     *     })
     */
    createGameNamespaceTokenDevelopment(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.CreateGameNamespaceTokenDevelopmentRequest, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.CreateGameNamespaceTokenDevelopmentResponse>;
    /**
     * Validates information used to create a new game namespace development token.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.ValidateGameNamespaceTokenDevelopmentRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.validateGameNamespaceTokenDevelopment("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         hostname: "string",
     *         lobbyPorts: [{
     *                 label: "string",
     *                 targetPort: undefined,
     *                 portRange: undefined,
     *                 proxyProtocol: Rivet.cloud.version.matchmaker.PortProtocol.Http
     *             }]
     *     })
     */
    validateGameNamespaceTokenDevelopment(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.ValidateGameNamespaceTokenDevelopmentRequest, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.ValidateGameNamespaceTokenDevelopmentResponse>;
    /**
     * Creates a public token for the given namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.createGameNamespaceTokenPublic("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32")
     */
    createGameNamespaceTokenPublic(gameId: string, namespaceId: string, requestOptions?: Namespaces.RequestOptions): Promise<Rivet.cloud.games.namespaces.CreateGameNamespaceTokenPublicResponse>;
    /**
     * Updates the version of a game namespace.
     *
     * @param {string} gameId
     * @param {string} namespaceId
     * @param {Rivet.cloud.games.namespaces.UpdateGameNamespaceVersionRequest} request
     * @param {Namespaces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.namespaces.updateGameNamespaceVersion("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         versionId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
     *     })
     */
    updateGameNamespaceVersion(gameId: string, namespaceId: string, request: Rivet.cloud.games.namespaces.UpdateGameNamespaceVersionRequest, requestOptions?: Namespaces.RequestOptions): Promise<void>;
    protected _analytics: Analytics | undefined;
    get analytics(): Analytics;
    protected _logs: Logs | undefined;
    get logs(): Logs;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}
