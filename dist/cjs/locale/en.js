"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("date-fns/locale/en-US/index");
var date_fns_1 = require("date-fns");
var locale = {
    id: 'en',
    fmtDistance: function (date, base, suffix) {
        var result = (0, date_fns_1.formatDistanceStrict)(date.toJSDate(), base.toJSDate(), { locale: index_1.default });
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
exports.default = locale;
//# sourceMappingURL=en.js.map