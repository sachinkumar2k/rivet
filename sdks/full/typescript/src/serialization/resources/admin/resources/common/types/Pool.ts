/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Rivet from "../../../../../../api";
import * as core from "../../../../../../core";

export const Pool: core.serialization.ObjectSchema<serializers.admin.Pool.Raw, Rivet.admin.Pool> =
    core.serialization.object({
        poolType: core.serialization.property(
            "pool_type",
            core.serialization.lazy(async () => (await import("../../../../..")).admin.PoolType)
        ),
        hardware: core.serialization.list(
            core.serialization.lazyObject(async () => (await import("../../../../..")).admin.Hardware)
        ),
        desiredCount: core.serialization.property("desired_count", core.serialization.number()),
        maxCount: core.serialization.property("max_count", core.serialization.number()),
        drainTimeout: core.serialization.property("drain_timeout", core.serialization.number()),
    });

export declare namespace Pool {
    interface Raw {
        pool_type: serializers.admin.PoolType.Raw;
        hardware: serializers.admin.Hardware.Raw[];
        desired_count: number;
        max_count: number;
        drain_timeout: number;
    }
}