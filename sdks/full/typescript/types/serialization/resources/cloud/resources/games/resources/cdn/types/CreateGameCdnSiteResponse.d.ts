/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../../../index";
import * as Rivet from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { upload } from "../../../../../../index";
export declare const CreateGameCdnSiteResponse: core.serialization.ObjectSchema<serializers.cloud.games.CreateGameCdnSiteResponse.Raw, Rivet.cloud.games.CreateGameCdnSiteResponse>;
export declare namespace CreateGameCdnSiteResponse {
    interface Raw {
        site_id: string;
        upload_id: string;
        presigned_requests: upload.PresignedRequest.Raw[];
    }
}