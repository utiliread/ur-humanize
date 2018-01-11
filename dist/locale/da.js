import { da } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';
const locale = {
    fmtPeriod: (earliest, earliestFormat, latest, latestFormat) => `fra ${earliest.toLocaleString(earliestFormat)} til ${latest.toLocaleString(latestFormat)}`,
    fmtDistance: (date, base, suffix) => {
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
                if (date < base) {
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
