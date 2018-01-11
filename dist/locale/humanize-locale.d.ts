/// <reference types="luxon" />
import { DateTime } from 'luxon';
import { FormatSuffix } from '../format-suffix';
export interface HumanizeLocale {
    fmtPeriod: (earliest: DateTime, earliestFormat: Intl.DateTimeFormatOptions, latest: DateTime, latestFormat: Intl.DateTimeFormatOptions) => string;
    fmtDistance: (date: DateTime, base: DateTime, suffix?: FormatSuffix) => string;
}
