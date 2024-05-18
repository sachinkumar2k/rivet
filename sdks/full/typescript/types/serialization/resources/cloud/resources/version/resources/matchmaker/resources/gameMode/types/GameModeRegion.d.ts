/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../../../../..";
import * as Rivet from "../../../../../../../../../../api";
import * as core from "../../../../../../../../../../core";
export declare const GameModeRegion: core.serialization.ObjectSchema<serializers.cloud.version.matchmaker.GameModeRegion.Raw, Rivet.cloud.version.matchmaker.GameModeRegion>;
export declare namespace GameModeRegion {
    interface Raw {
        tier?: string | null;
        idle_lobbies?: serializers.cloud.version.matchmaker.GameModeIdleLobbiesConfig.Raw | null;
    }
}