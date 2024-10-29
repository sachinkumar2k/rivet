/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as Rivet from "../../../../../index";
import { Namespaces } from "../resources/namespaces/client/Client";
import { Avatars } from "../resources/avatars/client/Client";
import { Builds } from "../resources/builds/client/Client";
import { Cdn } from "../resources/cdn/client/Client";
import { Matchmaker } from "../resources/matchmaker/client/Client";
import { Tokens } from "../resources/tokens/client/Client";
import { Versions } from "../resources/versions/client/Client";
export declare namespace Games {
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
export declare class Games {
    protected readonly _options: Games.Options;
    constructor(_options?: Games.Options);
    /**
     * Returns a list of games in which the current identity is a group member of its development team.
     *
     * @param {Rivet.cloud.games.GetGamesRequest} request
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.getGames({
     *         watchIndex: "string"
     *     })
     */
    getGames(request?: Rivet.cloud.games.GetGamesRequest, requestOptions?: Games.RequestOptions): Promise<Rivet.cloud.games.GetGamesResponse>;
    /**
     * Creates a new game.
     *
     * @param {Rivet.cloud.games.CreateGameRequest} request
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.createGame({
     *         nameId: "string",
     *         displayName: "string",
     *         developerGroupId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
     *     })
     */
    createGame(request: Rivet.cloud.games.CreateGameRequest, requestOptions?: Games.RequestOptions): Promise<Rivet.cloud.games.CreateGameResponse>;
    /**
     * Validates information used to create a new game.
     *
     * @param {Rivet.cloud.games.ValidateGameRequest} request
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.validateGame({
     *         displayName: "string",
     *         nameId: "string"
     *     })
     */
    validateGame(request: Rivet.cloud.games.ValidateGameRequest, requestOptions?: Games.RequestOptions): Promise<Rivet.cloud.games.ValidateGameResponse>;
    /**
     * Returns a game by its game id.
     *
     * @param {string} gameId
     * @param {Rivet.cloud.games.GetGameByIdRequest} request
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.getGameById("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         watchIndex: "string"
     *     })
     */
    getGameById(gameId: string, request?: Rivet.cloud.games.GetGameByIdRequest, requestOptions?: Games.RequestOptions): Promise<Rivet.cloud.games.GetGameByIdResponse>;
    /**
     * Prepares a game banner image upload.
     *
     * @param {string} gameId
     * @param {Rivet.cloud.games.GameBannerUploadPrepareRequest} request
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.gameBannerUploadPrepare("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         path: "string",
     *         mime: "string",
     *         contentLength: 1000000
     *     })
     */
    gameBannerUploadPrepare(gameId: string, request: Rivet.cloud.games.GameBannerUploadPrepareRequest, requestOptions?: Games.RequestOptions): Promise<Rivet.cloud.games.GameBannerUploadPrepareResponse>;
    /**
     * Completes an game banner image upload. Must be called after the file upload process completes.
     *
     * @param {string} gameId
     * @param {string} uploadId
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.gameBannerUploadComplete("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32")
     */
    gameBannerUploadComplete(gameId: string, uploadId: string, requestOptions?: Games.RequestOptions): Promise<void>;
    /**
     * Prepares a game logo image upload.
     *
     * @param {string} gameId
     * @param {Rivet.cloud.games.GameLogoUploadPrepareRequest} request
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.gameLogoUploadPrepare("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         path: "string",
     *         mime: "string",
     *         contentLength: 1000000
     *     })
     */
    gameLogoUploadPrepare(gameId: string, request: Rivet.cloud.games.GameLogoUploadPrepareRequest, requestOptions?: Games.RequestOptions): Promise<Rivet.cloud.games.GameLogoUploadPrepareResponse>;
    /**
     * Completes a game logo image upload. Must be called after the file upload process completes.
     *
     * @param {string} gameId
     * @param {string} uploadId
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.gameLogoUploadComplete("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32")
     */
    gameLogoUploadComplete(gameId: string, uploadId: string, requestOptions?: Games.RequestOptions): Promise<void>;
    protected _namespaces: Namespaces | undefined;
    get namespaces(): Namespaces;
    protected _avatars: Avatars | undefined;
    get avatars(): Avatars;
    protected _builds: Builds | undefined;
    get builds(): Builds;
    protected _cdn: Cdn | undefined;
    get cdn(): Cdn;
    protected _matchmaker: Matchmaker | undefined;
    get matchmaker(): Matchmaker;
    protected _tokens: Tokens | undefined;
    get tokens(): Tokens;
    protected _versions: Versions | undefined;
    get versions(): Versions;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}