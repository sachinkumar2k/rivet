/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as Rivet from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";

export const Cluster: core.serialization.ObjectSchema<
    serializers.admin.clusters.Cluster.Raw,
    Rivet.admin.clusters.Cluster
> = core.serialization.object({
    clusterId: core.serialization.property("cluster_id", core.serialization.string()),
    nameId: core.serialization.property("name_id", core.serialization.string()),
    createTs: core.serialization.property("create_ts", core.serialization.number()),
    ownerTeamId: core.serialization.property("owner_team_id", core.serialization.string().optional()),
});

export declare namespace Cluster {
    interface Raw {
        cluster_id: string;
        name_id: string;
        create_ts: number;
        owner_team_id?: string | null;
    }
}