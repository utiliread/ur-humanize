"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("date-fns/locale/da/index");
var date_fns_1 = require("date-fns");
var locale = {
    id: 'da',
    fmtDistance: function (date, base, suffix) {
        var result = (0, date_fns_1.formatDistanceStrict)(date.toJSDate(), base.toJSDate(), { locale: index_1.default });
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
exports.default = locale;
//# sourceMappingURL=da.js.map