/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../..";
import * as Rivet from "../../../../../../../../api";
import * as core from "../../../../../../../../core";

export const ExportLobbyLogsResponse: core.serialization.ObjectSchema<
    serializers.cloud.games.ExportLobbyLogsResponse.Raw,
    Rivet.cloud.games.ExportLobbyLogsResponse
> = core.serialization.object({
    url: core.serialization.string(),
});

export declare namespace ExportLobbyLogsResponse {
    interface Raw {
        url: string;
    }
}