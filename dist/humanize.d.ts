/// <reference types="luxon" />
import { DateTime, Duration } from 'luxon';
export declare class Humanize {
    static default(date: DateTime, includeTime?: boolean): string;
    static ago(date: DateTime, base?: DateTime): string;
    static before(date: DateTime, base: DateTime): string;
    static distance(date: DateTime, base: DateTime, suffix?: 'ago' | 'before'): string;
    static duration(duration: Duration, suffix?: 'ago' | 'before'): string;
    static period(earliest: DateTime, latest: DateTime): string;
}
