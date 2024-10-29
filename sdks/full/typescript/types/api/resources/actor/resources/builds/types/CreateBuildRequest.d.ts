/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as Rivet from "../../../../../index";
export interface CreateBuildRequest {
    name: string;
    /** A tag given to the game build. */
    imageTag: string;
    imageFile: Rivet.upload.PrepareFile;
    multipartUpload?: boolean;
    kind?: Rivet.actor.BuildKind;
    compression?: Rivet.actor.BuildCompression;
    prewarmDatacenters?: string[];
}