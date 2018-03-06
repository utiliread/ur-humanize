"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var locale_1 = require("date-fns/esm/locale");
var esm_1 = require("date-fns/esm");
var locale = {
    id: 'da',
    fmtDistance: function (date, base, suffix) {
        var result = esm_1.formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: locale_1.da });
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
exports.default = locale;
//# sourceMappingURL=da.js.map