/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../../..";
import * as Rivet from "../../../../../../../../api";
import * as core from "../../../../../../../../core";
export declare const Config: core.serialization.ObjectSchema<serializers.cloud.version.cdn.Config.Raw, Rivet.cloud.version.cdn.Config>;
export declare namespace Config {
    interface Raw {
        build_command?: string | null;
        build_output?: string | null;
        build_env?: Record<string, string> | null;
        site_id?: string | null;
        routes?: serializers.cloud.version.cdn.Route.Raw[] | null;
    }
}