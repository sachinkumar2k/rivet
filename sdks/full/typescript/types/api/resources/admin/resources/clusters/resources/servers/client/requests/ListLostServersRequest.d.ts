/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as Rivet from "../../../../../../../../index";
/**
 * @example
 *     {
 *         serverId: "string",
 *         datacenter: "string",
 *         pool: Rivet.admin.clusters.PoolType.Job,
 *         publicIp: "string"
 *     }
 */
export interface ListLostServersRequest {
    serverId?: string;
    datacenter?: string;
    pool?: Rivet.admin.clusters.PoolType;
    publicIp?: string;
}
