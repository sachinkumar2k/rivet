/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { common } from "../../../../index";
export declare const CreateGameRequest: core.serialization.ObjectSchema<serializers.cloud.games.CreateGameRequest.Raw, Rivet.cloud.games.CreateGameRequest>;
export declare namespace CreateGameRequest {
    interface Raw {
        name_id?: common.Identifier.Raw | null;
        display_name: common.DisplayName.Raw;
        developer_group_id: string;
    }
}