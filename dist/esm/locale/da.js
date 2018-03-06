import { da } from 'date-fns/esm/locale';
import { formatDistanceStrict } from 'date-fns/esm';
var locale = {
    id: 'da',
    fmtDistance: function (date, base, suffix) {
        var result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: da });
        switch (suffix) {
            case 'ago':
                if (date < base) {
                    return result + " siden";
                }
                else {
                    return "om " + result;
                }
            case 'relative':
                if (date < base) {
                    return result + " f\u00F8r";
                }
                else {
                    return result + " efter";
                }
            default:
                return result;
        }
    },
    fmtDifference: function (earliest, earliestFormat, latest, latestFormat) {
        return "fra " + earliest.toLocaleString(earliestFormat) + " til " + latest.toLocaleString(latestFormat);
    }
};
export default locale;
//# sourceMappingURL=da.js.map