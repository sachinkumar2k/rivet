/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { common } from "../../../../index";
export declare const Build: core.serialization.ObjectSchema<serializers.actor.Build.Raw, Rivet.actor.Build>;
export declare namespace Build {
    interface Raw {
        id: string;
        name: string;
        created_at: common.Timestamp.Raw;
        content_length: number;
        tags: Record<string, string>;
    }
}
