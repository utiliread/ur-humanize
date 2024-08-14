import { da as datefnsLocale } from "date-fns/locale/da";
import { formatDistanceStrict } from "date-fns";
const locale = {
    id: "da",
    fmtDistance: (date, base, suffix) => {
        const result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), {
            locale: datefnsLocale,
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
export default locale;
//# sourceMappingURL=da.js.map