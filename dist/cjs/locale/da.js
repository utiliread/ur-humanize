"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const da_1 = require("date-fns/locale/da");
const date_fns_1 = require("date-fns");
const locale = {
    id: "da",
    fmtDistance: (date, base, suffix) => {
        const result = (0, date_fns_1.formatDistanceStrict)(date.toJSDate(), base.toJSDate(), {
            locale: da_1.da,
        });
        switch (suffix) {
            case "ago":
                return date < base ? `${result} siden` : `om ${result}`;
            case "relative":
                return date < base ? `${result} før` : `${result} efter`;
            default:
                return result;
        }
    },
    fmtDifference: (earliest, earliestFormat, latest, latestFormat) => {
        return `fra ${earliest.toLocaleString(earliestFormat)} til ${latest.toLocaleString(latestFormat)}`;
    },
};
exports.default = locale;
//# sourceMappingURL=da.js.map