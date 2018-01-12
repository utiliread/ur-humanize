/// <reference types="luxon" />
import { DateTime } from 'luxon';
export declare function timeAgo(instant: DateTime, base?: DateTime): string;
export declare function relativeTime(instant: DateTime, base: DateTime): string;
export declare function timeSpan(earliest: DateTime, latest: DateTime): string;
export declare function relaxedTime(instant: DateTime): string;
export declare function exactTime(instant: DateTime): string;
export declare function exactPeriod(earliest: DateTime, latest: DateTime): string;
