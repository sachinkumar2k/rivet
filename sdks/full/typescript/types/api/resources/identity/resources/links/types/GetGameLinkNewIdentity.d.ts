/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as Rivet from "../../../../../index";
export interface GetGameLinkNewIdentity {
    identityToken: Rivet.Jwt;
    identityTokenExpireTs: Rivet.Timestamp;
    identity: Rivet.identity.Profile;
}