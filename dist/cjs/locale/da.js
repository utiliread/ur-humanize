"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datefnsLocale = require("date-fns/locale/da/index");
var date_fns_1 = require("date-fns");
var locale = {
    id: 'da',
    fmtDistance: function (date, base, suffix) {
        var result = date_fns_1.formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: datefnsLocale });
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
exports.default = locale;
//# sourceMappingURL=da.js.map