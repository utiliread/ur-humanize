import { DateTime } from "luxon";
import { getLocale } from "./locale-cache";
let DATETIME_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(DateTime.DATETIME_MED));
delete DATETIME_MED_WITHOUT_YEAR.year;
let DATE_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(DateTime.DATE_MED));
delete DATE_MED_WITHOUT_YEAR.year;
/**
 * Format a text that looks like '1 minute ago'
 * @param instant The instant
 * @param base The base time
 */
export function casualTimeAgo(instant, base) {
    const locale = getLocale(instant.locale);
    return locale.fmtDistance(instant.toLocal(), base || DateTime.local(), "ago");
}
/**
 * Format a text that looks like '1 minute before'
 * @param instant The instant
 * @param base The base time
 */
export function casualRelativeTime(instant, base) {
    const locale = getLocale(instant.locale);
    return locale.fmtDistance(instant.toLocal(), base.toLocal(), "relative");
}
/**
 * Format a text that looks like '1 minute'
 * @param duration The duration
 */
export function casualDuration(duration) {
    const locale = getLocale(duration.locale);
    const base = DateTime.local();
    return locale.fmtDistance(base, base.plus(duration));
}
/**
 * Format a text that looses precision dependening on the time from now
 * @param instant The instant
 */
export function casualTime(instant) {
    instant = instant.toLocal();
    const diff = instant.diffNow();
    if (Math.abs(diff.as("hours")) < 1) {
        // Within an hour
        return casualTimeAgo(instant);
    }
    else if (DateTime.local().hasSame(instant, "day")) {
        // Within present day: time only
        return instant.toLocaleString(DateTime.TIME_SIMPLE);
    }
    else if (Math.abs(diff.as("days")) < 7) {
        // Within +- 7 days
        return casualTimeAgo(instant);
    }
    else {
        // Else: date only
        return instant.toLocaleString(DateTime.DATE_MED);
    }
}
/**
 * Format the shortest exact text describing an instant
 * @param instant The instant
 */
export function exactTime(instant, includeSeconds) {
    instant = instant.toLocal();
    const now = DateTime.local();
    const hasHourComponent = +instant !== +instant.startOf("day");
    let format;
    if (instant.hasSame(now, "day")) {
        // Time today
        format = includeSeconds ? DateTime.TIME_WITH_SECONDS : DateTime.TIME_SIMPLE;
    }
    else if (instant.hasSame(now, "year")) {
        // Present year
        if (hasHourComponent) {
            // Time in present year
            format = DATETIME_MED_WITHOUT_YEAR;
        }
        else {
            // Date in present year
            format = DATE_MED_WITHOUT_YEAR;
        }
    }
    else {
        // Other year
        if (hasHourComponent) {
            // Time in other year
            format = DateTime.DATETIME_MED;
        }
        else {
            // Date in other year
            format = DateTime.DATE_MED;
        }
    }
    return instant.toLocaleString(format);
}
/**
 * Format the shortest exact text describing a period
 * @param earliest The earliest instant
 * @param latest The latest instant
 */
export function exactPeriod(earliest, latest) {
    earliest = earliest.toLocal();
    latest = latest.toLocal();
    const now = DateTime.utc();
    const hasHourComponent = +earliest !== +earliest.startOf("day") ||
        +latest !== +latest.startOf("day");
    let earliestFormat;
    let latestFormat;
    if (earliest.hasSame(latest, "day")) {
        if (earliest.hasSame(now, "day")) {
            // Different times today
            earliestFormat = DateTime.TIME_SIMPLE;
            latestFormat = DateTime.TIME_SIMPLE;
        }
        else {
            // Different times on same day but not today
            earliestFormat = DateTime.DATETIME_MED;
            latestFormat = DateTime.TIME_SIMPLE;
        }
    }
    else if (earliest.hasSame(latest, "year")) {
        if (earliest.hasSame(now, "year")) {
            // Present year
            if (hasHourComponent) {
                // Different times in present year
                earliestFormat = DATETIME_MED_WITHOUT_YEAR;
                latestFormat = DATETIME_MED_WITHOUT_YEAR;
            }
            else {
                // Different dates in present year
                earliestFormat = DATE_MED_WITHOUT_YEAR;
                latestFormat = DATE_MED_WITHOUT_YEAR;
            }
        }
        else {
            // Other year
            if (hasHourComponent) {
                // Different times in same but not present year
                earliestFormat = DateTime.DATETIME_MED;
                latestFormat = DATETIME_MED_WITHOUT_YEAR;
            }
            else {
                // Different dates in same but not present year
                earliestFormat = DateTime.DATE_MED;
                latestFormat = DATE_MED_WITHOUT_YEAR;
            }
        }
    }
    else {
        if (hasHourComponent) {
            // Different times in different years
            earliestFormat = DateTime.DATETIME_MED;
            latestFormat = DateTime.DATETIME_MED;
        }
        else {
            // Different dates in different years
            earliestFormat = DateTime.DATE_MED;
            latestFormat = DateTime.DATE_MED;
        }
    }
    const locale = getLocale(earliest.locale);
    return locale.fmtDifference(earliest, earliestFormat, latest, latestFormat);
}
//# sourceMappingURL=humanize.js.map