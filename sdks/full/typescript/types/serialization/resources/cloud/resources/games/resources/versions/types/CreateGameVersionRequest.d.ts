/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../../../index";
import * as Rivet from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { common, cloud } from "../../../../../../index";
export declare const CreateGameVersionRequest: core.serialization.ObjectSchema<serializers.cloud.games.CreateGameVersionRequest.Raw, Rivet.cloud.games.CreateGameVersionRequest>;
export declare namespace CreateGameVersionRequest {
    interface Raw {
        display_name: common.DisplayName.Raw;
        config: cloud.version.Config.Raw;
    }
}