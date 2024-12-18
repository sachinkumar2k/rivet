/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Rivet from "../../../index";
export declare namespace Kv {
    interface Options {
        environment?: core.Supplier<environments.RivetEnvironment | string>;
        token: core.Supplier<core.BearerToken>;
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
export declare class Kv {
    protected readonly _options: Kv.Options;
    constructor(_options: Kv.Options);
    /**
     * Returns a specific key-value entry by key.
     *
     * @param {Rivet.kv.GetOperationRequest} request
     * @param {Kv.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.kv.get({
     *         key: "string",
     *         watchIndex: "string",
     *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
     *     })
     */
    get(request: Rivet.kv.GetOperationRequest, requestOptions?: Kv.RequestOptions): Promise<Rivet.kv.GetResponse>;
    /**
     * Puts (sets or overwrites) a key-value entry by key.
     *
     * @param {Rivet.kv.PutRequest} request
     * @param {Kv.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.kv.put({
     *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
     *         key: "string",
     *         value: {
     *             "key": "value"
     *         }
     *     })
     */
    put(request: Rivet.kv.PutRequest, requestOptions?: Kv.RequestOptions): Promise<void>;
    /**
     * Deletes a key-value entry by key.
     *
     * @param {Rivet.kv.DeleteOperationRequest} request
     * @param {Kv.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.kv.delete({
     *         key: "string",
     *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
     *     })
     */
    delete(request: Rivet.kv.DeleteOperationRequest, requestOptions?: Kv.RequestOptions): Promise<void>;
    /**
     * Lists all keys in a directory.
     *
     * @param {Rivet.kv.ListOperationRequest} request
     * @param {Kv.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.kv.list({
     *         directory: "string",
     *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
     *     })
     */
    list(request: Rivet.kv.ListOperationRequest, requestOptions?: Kv.RequestOptions): Promise<Rivet.kv.ListResponse>;
    /**
     * Gets multiple key-value entries by key(s).
     *
     * @param {Rivet.kv.GetBatchRequest} request
     * @param {Kv.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.kv.getBatch({
     *         keys: "string",
     *         watchIndex: "string",
     *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
     *     })
     */
    getBatch(request: Rivet.kv.GetBatchRequest, requestOptions?: Kv.RequestOptions): Promise<Rivet.kv.GetBatchResponse>;
    /**
     * Puts (sets or overwrites) multiple key-value entries by key(s).
     *
     * @param {Rivet.kv.PutBatchRequest} request
     * @param {Kv.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.kv.putBatch({
     *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
     *         entries: [{}]
     *     })
     */
    putBatch(request: Rivet.kv.PutBatchRequest, requestOptions?: Kv.RequestOptions): Promise<void>;
    /**
     * Deletes multiple key-value entries by key(s).
     *
     * @param {Rivet.kv.DeleteBatchRequest} request
     * @param {Kv.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.kv.deleteBatch({
     *         keys: "string",
     *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
     *     })
     */
    deleteBatch(request: Rivet.kv.DeleteBatchRequest, requestOptions?: Kv.RequestOptions): Promise<void>;
    protected _getAuthorizationHeader(): Promise<string>;
}
