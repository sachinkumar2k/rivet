/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as Rivet from "../../../../../index";
export interface Port {
    protocol: Rivet.actor.PortProtocol;
    internalPort?: number;
    publicHostname?: string;
    publicPort?: number;
    routing: Rivet.actor.PortRouting;
}
