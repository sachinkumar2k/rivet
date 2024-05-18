/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Rivet from "../../../../../../api";
import * as core from "../../../../../../core";

export const CancelGameLinkRequest: core.serialization.ObjectSchema<
    serializers.identity.CancelGameLinkRequest.Raw,
    Rivet.identity.CancelGameLinkRequest
> = core.serialization.object({
    identityLinkToken: core.serialization.property(
        "identity_link_token",
        core.serialization.lazy(async () => (await import("../../../../..")).Jwt)
    ),
});

export declare namespace CancelGameLinkRequest {
    interface Raw {
        identity_link_token: serializers.Jwt.Raw;
    }
}