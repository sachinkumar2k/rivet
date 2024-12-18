/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Rivet from "../../../index";
import { Activities } from "../resources/activities/client/Client";
import { Events } from "../resources/events/client/Client";
export declare namespace Identity {
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
export declare class Identity {
    protected readonly _options: Identity.Options;
    constructor(_options?: Identity.Options);
    /**
     * Gets or creates an identity.
     * Passing an existing identity token in the body refreshes the token.
     * Temporary Accounts
     * Until the identity is linked with the Rivet Hub (see `PrepareGameLink`), this identity will be temporary but still behave like all other identities.
     * This is intended to allow users to play the game without signing up while still having the benefits of having an account. When they are ready to save their account, they should be instructed to link their account (see `PrepareGameLink`).
     * Storing Token
     * `identity_token` should be stored in some form of persistent storage. The token should be read from storage and passed to `Setup` every time the client starts.
     *
     * @param {Rivet.identity.SetupRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.setup({
     *         existingIdentityToken: "string"
     *     })
     */
    setup(request?: Rivet.identity.SetupRequest, requestOptions?: Identity.RequestOptions): Promise<Rivet.identity.SetupResponse>;
    /**
     * Fetches an identity profile.
     *
     * @param {string} identityId
     * @param {Rivet.identity.GetProfileRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.getProfile("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32", {
     *         watchIndex: "string"
     *     })
     */
    getProfile(identityId: string, request?: Rivet.identity.GetProfileRequest, requestOptions?: Identity.RequestOptions): Promise<Rivet.identity.GetProfileResponse>;
    /**
     * Fetches the current identity's profile.
     *
     * @param {Rivet.identity.GetSelfProfileRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.getSelfProfile({
     *         watchIndex: "string"
     *     })
     */
    getSelfProfile(request?: Rivet.identity.GetSelfProfileRequest, requestOptions?: Identity.RequestOptions): Promise<Rivet.identity.GetProfileResponse>;
    /**
     * Fetches a list of identity handles.
     *
     * @param {Rivet.identity.GetHandlesRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.getHandles({
     *         identityIds: "string"
     *     })
     */
    getHandles(request: Rivet.identity.GetHandlesRequest, requestOptions?: Identity.RequestOptions): Promise<Rivet.identity.GetHandlesResponse>;
    /**
     * Fetches a list of identity summaries.
     *
     * @param {Rivet.identity.GetSummariesRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.getSummaries({
     *         identityIds: "string"
     *     })
     */
    getSummaries(request: Rivet.identity.GetSummariesRequest, requestOptions?: Identity.RequestOptions): Promise<Rivet.identity.GetSummariesResponse>;
    /**
     * Updates profile of the current identity.
     *
     * @param {Rivet.identity.UpdateProfileRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.updateProfile({
     *         displayName: "string",
     *         accountNumber: 1,
     *         bio: "string"
     *     })
     */
    updateProfile(request?: Rivet.identity.UpdateProfileRequest, requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * Validate contents of identity profile. Use to provide immediate feedback on profile changes before committing them.
     *
     * @param {Rivet.identity.ValidateProfileRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.validateProfile({
     *         displayName: "string",
     *         accountNumber: 1,
     *         bio: "string"
     *     })
     */
    validateProfile(request?: Rivet.identity.ValidateProfileRequest, requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * Sets the current identity's game activity. This activity will automatically be removed when the identity goes offline.
     *
     * @param {Rivet.identity.SetGameActivityRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.setGameActivity({
     *         gameActivity: {
     *             message: "string",
     *             publicMetadata: {
     *                 "key": "value"
     *             },
     *             mutualMetadata: {
     *                 "key": "value"
     *             }
     *         }
     *     })
     */
    setGameActivity(request: Rivet.identity.SetGameActivityRequest, requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * Removes the current identity's game activity.
     *
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.removeGameActivity()
     */
    removeGameActivity(requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * Updates the current identity's status.
     *
     * @param {Rivet.identity.UpdateStatusRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.updateStatus({
     *         status: Rivet.identity.Status.Online
     *     })
     */
    updateStatus(request: Rivet.identity.UpdateStatusRequest, requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * Prepares an avatar image upload. Complete upload with `CompleteIdentityAvatarUpload`.
     *
     * @param {Rivet.identity.PrepareAvatarUploadRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.prepareAvatarUpload({
     *         path: "string",
     *         mime: "string",
     *         contentLength: 1000000
     *     })
     */
    prepareAvatarUpload(request: Rivet.identity.PrepareAvatarUploadRequest, requestOptions?: Identity.RequestOptions): Promise<Rivet.identity.PrepareAvatarUploadResponse>;
    /**
     * Completes an avatar image upload. Must be called after the file upload process completes.
     *
     * @param {string} uploadId
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.completeAvatarUpload("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32")
     */
    completeAvatarUpload(uploadId: string, requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * Completes an avatar image upload. Must be called after the file upload process completes.
     *
     * @param {Rivet.identity.SignupForBetaRequest} request
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.signupForBeta({
     *         name: "string",
     *         companyName: "string",
     *         companySize: "string",
     *         preferredTools: "string",
     *         goals: "string"
     *     })
     */
    signupForBeta(request: Rivet.identity.SignupForBetaRequest, requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.markDeletion()
     */
    markDeletion(requestOptions?: Identity.RequestOptions): Promise<void>;
    /**
     * @param {Identity.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Rivet.InternalError}
     * @throws {@link Rivet.RateLimitError}
     * @throws {@link Rivet.ForbiddenError}
     * @throws {@link Rivet.UnauthorizedError}
     * @throws {@link Rivet.NotFoundError}
     * @throws {@link Rivet.BadRequestError}
     *
     * @example
     *     await client.identity.unmarkDeletion()
     */
    unmarkDeletion(requestOptions?: Identity.RequestOptions): Promise<void>;
    protected _activities: Activities | undefined;
    get activities(): Activities;
    protected _events: Events | undefined;
    get events(): Events;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}
