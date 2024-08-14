import { enUS as datefnsLocale } from "date-fns/locale/en-US";
import { formatDistanceStrict } from "date-fns";
const locale = {
    id: "en",
    fmtDistance: (date, base, suffix) => {
        const result = formatDistanceStrict(date.toJSDate(), base.toJSDate(), {
            locale: datefnsLocale,
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
export default locale;
//# sourceMappingURL=en.js.map