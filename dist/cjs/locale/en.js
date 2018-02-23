"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locale_1 = require("date-fns/esm/locale");
const esm_1 = require("date-fns/esm");
const locale = {
    id: 'en',
    fmtDistance: (date, base, suffix) => {
        let result = esm_1.formatDistanceStrict(date.toJSDate(), base.toJSDate(), { includeSeconds: true, locale: locale_1.enUS });
        switch (suffix) {
            case 'ago':
                if (date < base) {
                    return `${result} ago`;
                }
                else {
                    return `in ${result}`;
                }
            case 'relative':
                if (date < base) {
                    return `${result} before`;
                }
                else {
                    return `${result} after`;
                }
            default:
                return result;
        }
    },
    fmtDifference: (earliest, earliestFormat, latest, latestFormat) => {
        return `from ${earliest.toLocaleString(earliestFormat)} to ${latest.toLocaleString(latestFormat)}`;
    }
};
exports.default = locale;
//# sourceMappingURL=en.js.map