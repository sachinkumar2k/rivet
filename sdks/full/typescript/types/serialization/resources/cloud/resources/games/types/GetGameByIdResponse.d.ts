/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { cloud, common } from "../../../../index";
export declare const GetGameByIdResponse: core.serialization.ObjectSchema<serializers.cloud.games.GetGameByIdResponse.Raw, Rivet.cloud.games.GetGameByIdResponse>;
export declare namespace GetGameByIdResponse {
    interface Raw {
        game: cloud.GameFull.Raw;
        watch: common.WatchResponse.Raw;
    }
}
