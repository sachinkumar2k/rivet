/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as environments from "../../../../../../../../environments";
import * as core from "../../../../../../../../core";
import * as Rivet from "../../../../../../../index";
export declare namespace Builds {
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
export declare class Builds {
    protected readonly _options: Builds.Options;
    constructor(_options?: Builds.Options);
    /**
     * Lists game builds for the given game.
     *
     * @param {string} gameId
     * @param {Builds.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.builds.listGameBuilds("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32")
     */
    listGameBuilds(gameId: string, requestOptions?: Builds.RequestOptions): Promise<Rivet.cloud.games.ListGameBuildsResponse>;
    /**
     * Creates a new game build for the given game.
     *
     * @param {string} gameId
     * @param {Rivet.cloud.games.CreateGameBuildRequest} request
     * @param {Builds.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.cloud.games.builds.createGameBuild("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         displayName: "string",
     *         imageTag: "string",
     *         imageFile: {
     *             path: "string",
     *             contentType: "string",
     *             contentLength: 1000000
     *         },
     *         multipartUpload: true,
     *         kind: Rivet.cloud.games.BuildKind.DockerImage,
     *         compression: Rivet.cloud.games.BuildCompression.None
     *     })
     */
    createGameBuild(gameId: string, request: Rivet.cloud.games.CreateGameBuildRequest, requestOptions?: Builds.RequestOptions): Promise<Rivet.cloud.games.CreateGameBuildResponse>;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}
