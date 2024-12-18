/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Rivet from "../../../../api/index";
import * as core from "../../../../core";
import { Actor as actor_common$$actor } from "../resources/common/types/Actor";
import { actor } from "../../index";

export const CreateActorResponse: core.serialization.ObjectSchema<
    serializers.actor.CreateActorResponse.Raw,
    Rivet.actor.CreateActorResponse
> = core.serialization.object({
    actor: actor_common$$actor,
});

export declare namespace CreateActorResponse {
    interface Raw {
        actor: actor.Actor.Raw;
    }
}
