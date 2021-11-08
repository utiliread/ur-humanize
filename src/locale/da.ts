import { DateTime } from 'luxon';
import { Locale } from '../locale';
import datefnsLocale from "date-fns/locale/da/index";
import { formatDistanceStrict } from 'date-fns';

const locale: Locale = {
    id: 'da',
    fmtDistance: (date: DateTime, base: DateTime, suffix?: 'ago' | 'relative') => {
        const result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), { locale: datefnsLocale });

        switch (suffix) {
            case 'ago':
                return date < base ? `${result} siden` : `om ${result}`;
            case 'relative':
                return date < base ? `${result} før` : `${result} efter`;
            default:
                return result;
        }
    },
    fmtDifference: (earliest: DateTime, earliestFormat: Intl.DateTimeFormatOptions, latest: DateTime, latestFormat: Intl.DateTimeFormatOptions) => {
        return `fra ${earliest.toLocaleString(earliestFormat)} til ${latest.toLocaleString(latestFormat)}`;
    }
};

export default locale;