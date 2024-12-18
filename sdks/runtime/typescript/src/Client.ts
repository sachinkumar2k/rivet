/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import { Matchmaker } from "./api/resources/matchmaker/client/Client";

export declare namespace RivetClient {
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

export class RivetClient {
    constructor(protected readonly _options: RivetClient.Options) {}

    protected _matchmaker: Matchmaker | undefined;

    public get matchmaker(): Matchmaker {
        return (this._matchmaker ??= new Matchmaker(this._options));
    }
}
