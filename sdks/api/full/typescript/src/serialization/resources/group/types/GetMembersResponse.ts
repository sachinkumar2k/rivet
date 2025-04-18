/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Rivet from "../../../../api/index";
import * as core from "../../../../core";
import { Member } from "../resources/common/types/Member";
import { WatchResponse } from "../../common/types/WatchResponse";

export const GetMembersResponse: core.serialization.ObjectSchema<
    serializers.group.GetMembersResponse.Raw,
    Rivet.group.GetMembersResponse
> = core.serialization.object({
    members: core.serialization.list(Member),
    anchor: core.serialization.string().optional(),
    watch: WatchResponse,
});

export declare namespace GetMembersResponse {
    export interface Raw {
        members: Member.Raw[];
        anchor?: string | null;
        watch: WatchResponse.Raw;
    }
}
