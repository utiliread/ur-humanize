"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var locale_1 = require("date-fns/esm/locale");
var esm_1 = require("date-fns/esm");
var locale = {
    id: 'en',
    fmtDistance: function (date, base, suffix) {
        var result = esm_1.formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: locale_1.enUS });
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
exports.default = locale;
//# sourceMappingURL=en.js.map