import { DateTime, Duration } from "luxon";
/**
 * Format a text that looks like '1 minute ago'
 * @param instant The instant
 * @param base The base time
 */
export declare function casualTimeAgo(instant: DateTime<true>, base?: DateTime): string;
/**
 * Format a text that looks like '1 minute before'
 * @param instant The instant
 * @param base The base time
 */
export declare function casualRelativeTime(instant: DateTime<true>, base: DateTime<true>): string;
/**
 * Format a text that looks like '1 minute'
 * @param duration The duration
 */
export declare function casualDuration(duration: Duration<true>): string;
/**
 * Format a text that looses precision dependening on the time from now
 * @param instant The instant
 */
export declare function casualTime(instant: DateTime): string;
/**
 * Format the shortest exact text describing an instant
 * @param instant The instant
 */
export declare function exactTime(instant: DateTime, includeSeconds?: boolean): string;
/**
 * Format the shortest exact text describing a period
 * @param earliest The earliest instant
 * @param latest The latest instant
 */
export declare function exactPeriod(earliest: DateTime<true>, latest: DateTime<true>): string;
