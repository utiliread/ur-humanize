import { enUS } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';
const locale = {
    fmtPeriod: (earliest, earliestFormat, latest, latestFormat) => `from ${earliest.toLocaleString(earliestFormat)} to ${latest.toLocaleString(latestFormat)}`,
    fmtDistance: (date, base, suffix) => {
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
                if (date < base) {
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
