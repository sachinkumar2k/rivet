/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../../..";
import * as Rivet from "../../../../../../../../../../api";
import * as core from "../../../../../../../../../../core";

export const GameModeIdleLobbiesConfig: core.serialization.ObjectSchema<
    serializers.cloud.version.matchmaker.GameModeIdleLobbiesConfig.Raw,
    Rivet.cloud.version.matchmaker.GameModeIdleLobbiesConfig
> = core.serialization.object({
    min: core.serialization.number(),
    max: core.serialization.number(),
});

export declare namespace GameModeIdleLobbiesConfig {
    interface Raw {
        min: number;
        max: number;
    }
}