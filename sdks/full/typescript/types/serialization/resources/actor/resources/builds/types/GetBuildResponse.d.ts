/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { actor } from "../../../../index";
export declare const GetBuildResponse: core.serialization.ObjectSchema<serializers.actor.GetBuildResponse.Raw, Rivet.actor.GetBuildResponse>;
export declare namespace GetBuildResponse {
    interface Raw {
        build: actor.Build.Raw;
    }
}
