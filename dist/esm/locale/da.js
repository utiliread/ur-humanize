import * as datefnsLocale from "date-fns/locale/da/index";
import { formatDistanceStrict } from 'date-fns';
var locale = {
    id: 'da',
    fmtDistance: function (date, base, suffix) {
        var result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: datefnsLocale });
        switch (suffix) {
            case 'ago':
                return date < base ? result + " siden" : "om " + result;
            case 'relative':
                return date < base ? result + " f\u00F8r" : result + " efter";
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