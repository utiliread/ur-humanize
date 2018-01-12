import { DateTime } from 'luxon';

export interface HumanizeLocale {
    fmtDistance: (date: DateTime, base: DateTime, suffix?: 'ago' | 'relative') => string;
    fmtDifference: (earliest: DateTime, earliestFormat: Intl.DateTimeFormatOptions, latest: DateTime, latestFormat: Intl.DateTimeFormatOptions) => string;
}