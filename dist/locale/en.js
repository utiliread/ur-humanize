import { enUS } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';
const locale = {
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
    },
    fmtDifference: (earliest, earliestFormat, latest, latestFormat) => {
        return `from ${earliest.toLocaleString(earliestFormat)} to ${latest.toLocaleString(latestFormat)}`;
    }
};
export default locale;
