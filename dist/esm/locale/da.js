import datefnsLocale from "date-fns/locale/da/index";
import { formatDistanceStrict } from 'date-fns';
var locale = {
    id: 'da',
    fmtDistance: function (date, base, suffix) {
        var result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), { locale: datefnsLocale });
        switch (suffix) {
            case 'ago':
                return date < base ? "".concat(result, " siden") : "om ".concat(result);
            case 'relative':
                return date < base ? "".concat(result, " f\u00F8r") : "".concat(result, " efter");
            default:
                return result;
        }
    },
    fmtDifference: function (earliest, earliestFormat, latest, latestFormat) {
        return "fra ".concat(earliest.toLocaleString(earliestFormat), " til ").concat(latest.toLocaleString(latestFormat));
    }
};
export default locale;
//# sourceMappingURL=da.js.map