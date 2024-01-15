/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Rivet from "../../../../..";

/**
 * A game statistic config.
 */
export interface StatConfig {
    recordId: string;
    iconId: string;
    format: Rivet.game.StatFormatMethod;
    aggregation: Rivet.game.StatAggregationMethod;
    sorting: Rivet.game.StatSortingMethod;
    priority: number;
    displayName: Rivet.DisplayName;
    /** A string appended to the end of a singular game statistic's value. Example: 1 **dollar**. */
    postfixSingular?: string;
    /** A string appended to the end of a game statistic's value that is not exactly 1. Example: 45 **dollars**. */
    postfixPlural?: string;
    /** A string appended to the beginning of a singular game statistic's value. Example: **value** 1. */
    prefixSingular?: string;
    /** A string prepended to the beginning of a game statistic's value that is not exactly 1. Example: **values** 45. */
    prefixPlural?: string;
}