import { enUS } from 'date-fns/esm/locale';
import { formatDistanceStrict } from 'date-fns/esm';
var locale = {
    id: 'en',
    fmtDistance: function (date, base, suffix) {
        var result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: enUS });
        switch (suffix) {
            case 'ago':
                if (date < base) {
                    return result + " ago";
                }
                else {
                    return "in " + result;
                }
            case 'relative':
                if (date < base) {
                    return result + " before";
                }
                else {
                    return result + " after";
                }
            default:
                return result;
        }
    },
    fmtDifference: function (earliest, earliestFormat, latest, latestFormat) {
        return "from " + earliest.toLocaleString(earliestFormat) + " to " + latest.toLocaleString(latestFormat);
    }
};
export default locale;
//# sourceMappingURL=en.js.map