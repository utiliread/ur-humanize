import datefnsLocale from "date-fns/locale/en-US/index";
import { formatDistanceStrict } from 'date-fns';
var locale = {
    id: 'en',
    fmtDistance: function (date, base, suffix) {
        var result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), { locale: datefnsLocale });
        switch (suffix) {
            case 'ago':
                return date < base ? "".concat(result, " ago") : "in ".concat(result);
            case 'relative':
                return date < base ? "".concat(result, " before") : "".concat(result, " after");
            default:
                return result;
        }
    },
    fmtDifference: function (earliest, earliestFormat, latest, latestFormat) {
        return "from ".concat(earliest.toLocaleString(earliestFormat), " to ").concat(latest.toLocaleString(latestFormat));
    }
};
export default locale;
//# sourceMappingURL=en.js.map