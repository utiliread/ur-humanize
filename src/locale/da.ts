import { DateTime } from 'luxon';
import { Locale } from '../locale';
import { da } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';

const locale: Locale = {
    fmtDistance: (date: DateTime, base: DateTime, suffix?: 'ago' | 'relative') => {
        let result = formatDistance(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: da });

        switch (suffix) {
            case 'ago':
                if (date < base) {
                    return `${result} siden`;
                }
                else {
                    return `om ${result}`;
                }
            case 'relative':
                if (date < base)
                {
                    return `${result} før`;
                }
                else {
                    return `${result} efter`;
                }
            default:
                return result;
        }
    },
    fmtDifference: (earliest: DateTime, earliestFormat: Intl.DateTimeFormatOptions, latest: DateTime, latestFormat: Intl.DateTimeFormatOptions) => {
        return `fra ${earliest.toLocaleString(earliestFormat)} til ${latest.toLocaleString(latestFormat)}`;
    }
};

export default locale;