/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as Rivet from "../../../../index";
/**
 * @example
 *     {
 *         key: "string",
 *         watchIndex: "string",
 *         namespaceId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"
 *     }
 */
export interface GetOperationRequest {
    key: Rivet.kv.Key;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
    namespaceId?: string;
}