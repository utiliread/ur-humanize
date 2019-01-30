import * as datefnsLocale from "date-fns/locale/en-US/index";
import { formatDistanceStrict } from 'date-fns';
var locale = {
    id: 'en',
    fmtDistance: function (date, base, suffix) {
        var result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: datefnsLocale });
        switch (suffix) {
            case 'ago':
                return date < base ? result + " ago" : "in " + result;
            case 'relative':
                return date < base ? result + " before" : result + " after";
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