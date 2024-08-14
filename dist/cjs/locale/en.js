"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_US_1 = require("date-fns/locale/en-US");
const date_fns_1 = require("date-fns");
const locale = {
    id: "en",
    fmtDistance: (date, base, suffix) => {
        const result = (0, date_fns_1.formatDistanceStrict)(date.toJSDate(), base.toJSDate(), {
            locale: en_US_1.enUS,
        });
        switch (suffix) {
            case "ago":
                return date < base ? `${result} ago` : `in ${result}`;
            case "relative":
                return date < base ? `${result} before` : `${result} after`;
            default:
                return result;
        }
    },
    fmtDifference: (earliest, earliestFormat, latest, latestFormat) => {
        return `from ${earliest.toLocaleString(earliestFormat)} to ${latest.toLocaleString(latestFormat)}`;
    },
};
exports.default = locale;
//# sourceMappingURL=en.js.map