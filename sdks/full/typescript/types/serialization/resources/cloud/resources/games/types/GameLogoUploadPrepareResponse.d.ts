/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { upload } from "../../../../index";
export declare const GameLogoUploadPrepareResponse: core.serialization.ObjectSchema<serializers.cloud.games.GameLogoUploadPrepareResponse.Raw, Rivet.cloud.games.GameLogoUploadPrepareResponse>;
export declare namespace GameLogoUploadPrepareResponse {
    interface Raw {
        upload_id: string;
        presigned_request: upload.PresignedRequest.Raw;
    }
}
