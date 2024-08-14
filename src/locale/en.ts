import { DateTime } from "luxon";
import { Locale } from "../locale";
import { enUS as datefnsLocale } from "date-fns/locale/en-US";
import { formatDistanceStrict } from "date-fns";

const locale: Locale = {
  id: "en",
  fmtDistance: (
    date: DateTime,
    base: DateTime,
    suffix?: "ago" | "relative",
  ) => {
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
  fmtDifference: (
    earliest: DateTime,
    earliestFormat: Intl.DateTimeFormatOptions,
    latest: DateTime,
    latestFormat: Intl.DateTimeFormatOptions,
  ) => {
    return `from ${earliest.toLocaleString(earliestFormat)} to ${latest.toLocaleString(latestFormat)}`;
  },
};

export default locale;
