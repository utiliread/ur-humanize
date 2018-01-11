import { DateTime } from 'luxon';
import { FormatSuffix } from './../format-suffix';
import { HumanizeLocale } from './humanize-locale';
import { da } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';

const locale: HumanizeLocale = {
    fmtPeriod: (earliest: DateTime, earliestFormat: Intl.DateTimeFormatOptions, latest: DateTime, latestFormat: Intl.DateTimeFormatOptions) => `fra ${earliest.toLocaleString(earliestFormat)} til ${latest.toLocaleString(latestFormat)}`,
    fmtDistance: (date: DateTime, base: DateTime, suffix?: FormatSuffix) => {
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
    }
};

export default locale;