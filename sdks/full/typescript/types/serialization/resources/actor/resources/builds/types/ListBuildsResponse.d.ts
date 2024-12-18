/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { actor } from "../../../../index";
export declare const ListBuildsResponse: core.serialization.ObjectSchema<serializers.actor.ListBuildsResponse.Raw, Rivet.actor.ListBuildsResponse>;
export declare namespace ListBuildsResponse {
    interface Raw {
        builds: actor.Build.Raw[];
    }
}
