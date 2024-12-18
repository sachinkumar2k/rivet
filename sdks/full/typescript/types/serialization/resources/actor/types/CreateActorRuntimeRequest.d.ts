/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as Rivet from "../../../../api/index";
import * as core from "../../../../core";
export declare const CreateActorRuntimeRequest: core.serialization.ObjectSchema<serializers.actor.CreateActorRuntimeRequest.Raw, Rivet.actor.CreateActorRuntimeRequest>;
export declare namespace CreateActorRuntimeRequest {
    interface Raw {
        build: string;
        arguments?: string[] | null;
        environment?: Record<string, string> | null;
    }
}
