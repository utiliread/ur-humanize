"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locale_1 = require("date-fns/esm/locale");
const esm_1 = require("date-fns/esm");
const locale = {
    id: 'da',
    fmtDistance: (date, base, suffix) => {
        let result = esm_1.formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: locale_1.da });
        switch (suffix) {
            case 'ago':
                if (date < base) {
                    return `${result} siden`;
                }
                else {
                    return `om ${result}`;
                }
            case 'relative':
                if (date < base) {
                    return `${result} før`;
                }
                else {
                    return `${result} efter`;
                }
            default:
                return result;
        }
    },
    fmtDifference: (earliest, earliestFormat, latest, latestFormat) => {
        return `fra ${earliest.toLocaleString(earliestFormat)} til ${latest.toLocaleString(latestFormat)}`;
    }
};
exports.default = locale;
//# sourceMappingURL=da.js.map