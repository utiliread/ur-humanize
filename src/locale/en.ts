import { DateTime } from 'luxon';
import { Locale } from '../locale';
import { enUS } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';

const locale: Locale = {
    fmtDistance: (date: DateTime, base: DateTime, suffix?: 'ago' | 'relative') => {
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
    },
    fmtDifference: (earliest: DateTime, earliestFormat: Intl.DateTimeFormatOptions, latest: DateTime, latestFormat: Intl.DateTimeFormatOptions) => {
        return `from ${earliest.toLocaleString(earliestFormat)} to ${latest.toLocaleString(latestFormat)}`;
    }
};

export default locale;