/// <reference types="luxon" />
import { DateTime, Duration } from 'luxon';
/**
 * Format a text that looks like '1 minute ago'
 * @param instant The instant
 * @param base The base time
 */
export declare function timeAgo(instant: DateTime, base?: DateTime): string;
/**
 * Format a text that looks like '1 minute before'
 * @param instant The instant
 * @param base The base time
 */
export declare function relativeTime(instant: DateTime, base: DateTime): string;
/**
 * Format a text that looks like '1 minute'
 * @param instant1 One instant
 * @param instant2 Another instant
 */
export declare function timeSpan(instant1: DateTime, instant2: DateTime): string;
/**
 * Format a text that looks like '1 minute'
 * @param duration The duration
 */
export declare function durationSpan(duration: Duration): string;
/**
 * Format a text that looses precision dependening on the time from now
 * @param instant The instant
 */
export declare function relaxedTime(instant: DateTime): string;
/**
 * Format the shortest exact text describing an instant
 * @param instant The instant
 */
export declare function exactTime(instant: DateTime): string;
/**
 * Format the shortest exact text describing a period
 * @param earliest The earliest instant
 * @param latest The latest instant
 */
export declare function exactPeriod(earliest: DateTime, latest: DateTime): string;
