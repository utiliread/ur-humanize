import { DateTime } from 'luxon';
import { FormatSuffix } from './../format-suffix';
import { HumanizeLocale } from './humanize-locale';
import { enUS } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';

const locale: HumanizeLocale = {
    fmtPeriod: (earliest: DateTime, earliestFormat: Intl.DateTimeFormatOptions, latest: DateTime, latestFormat: Intl.DateTimeFormatOptions) => `from ${earliest.toLocaleString(earliestFormat)} to ${latest.toLocaleString(latestFormat)}`,
    fmtDistance: (date: DateTime, base: DateTime, suffix?: FormatSuffix) => {
        let result = formatDistance(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: enUS });

        switch (suffix) {
            case 'ago':
                if (date < base) {
                    return `${result} ago`;
                }
                else {
                    return `in ${result}`;
                }
            case 'relative':
                if (date < base)
                {
                    return `${result} before`;
                }
                else {
                    return `${result} after`;
                }
            default:
                return result;
        }
    }
};

export default locale;