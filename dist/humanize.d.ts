/// <reference types="luxon" />
import { DateTime, Duration } from 'luxon';
import { FormatSuffix } from './format-suffix';
export declare class Humanize {
    static default(date: DateTime): string;
    static ago(date: DateTime, base?: DateTime): string;
    static relative(date: DateTime, base: DateTime): string;
    static duration(duration: Duration, suffix?: FormatSuffix): string;
    static distance(date: DateTime, base: DateTime, suffix?: FormatSuffix): string;
    static period(earliest: DateTime, latest: DateTime): string;
}
