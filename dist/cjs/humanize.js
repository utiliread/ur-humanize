"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var locale_cache_1 = require("./locale-cache");
var DATETIME_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(luxon_1.DateTime.DATETIME_MED));
delete DATETIME_MED_WITHOUT_YEAR.year;
var DATE_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(luxon_1.DateTime.DATE_MED));
delete DATE_MED_WITHOUT_YEAR.year;
/**
 * Format a text that looks like '1 minute ago'
 * @param instant The instant
 * @param base The base time
 */
function casualTimeAgo(instant, base) {
    var locale = locale_cache_1.getLocale(instant.locale);
    return locale.fmtDistance(instant.toLocal(), base || luxon_1.DateTime.local(), 'ago');
}
exports.casualTimeAgo = casualTimeAgo;
/**
 * Format a text that looks like '1 minute before'
 * @param instant The instant
 * @param base The base time
 */
function casualRelativeTime(instant, base) {
    var locale = locale_cache_1.getLocale(instant.locale);
    return locale.fmtDistance(instant.toLocal(), base.toLocal(), 'relative');
}
exports.casualRelativeTime = casualRelativeTime;
/**
 * Format a text that looks like '1 minute'
 * @param duration The duration
 */
function casualDuration(duration) {
    var locale = locale_cache_1.getLocale(duration.locale);
    var base = luxon_1.DateTime.local();
    return locale.fmtDistance(base, base.plus(duration));
}
exports.casualDuration = casualDuration;
/**
 * Format a text that looses precision dependening on the time from now
 * @param instant The instant
 */
function casualTime(instant) {
    instant = instant.toLocal();
    var diff = instant.diffNow();
    if (Math.abs(diff.as('hours')) < 1) {
        // Within an hour
        return casualTimeAgo(instant);
    }
    else if (luxon_1.DateTime.local().hasSame(instant, 'day')) {
        // Within present day: time only
        return instant.toLocaleString(luxon_1.DateTime.TIME_SIMPLE);
    }
    else if (Math.abs(diff.as('days')) < 7) {
        // Within +- 7 days
        return casualTimeAgo(instant);
    }
    else {
        // Else: date only
        return instant.toLocaleString(luxon_1.DateTime.DATE_MED);
    }
}
exports.casualTime = casualTime;
/**
 * Format the shortest exact text describing an instant
 * @param instant The instant
 */
function exactTime(instant, includeSeconds) {
    instant = instant.toLocal();
    var now = luxon_1.DateTime.local();
    var hasHourComponent = +instant !== +instant.startOf('day');
    var format;
    if (instant.hasSame(now, 'day')) {
        // Time today
        format = includeSeconds ? luxon_1.DateTime.TIME_WITH_SECONDS : luxon_1.DateTime.TIME_SIMPLE;
    }
    else if (instant.hasSame(now, 'year')) {
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
            format = luxon_1.DateTime.DATETIME_MED;
        }
        else {
            // Date in other year
            format = luxon_1.DateTime.DATE_MED;
        }
    }
    return instant.toLocaleString(format);
}
exports.exactTime = exactTime;
/**
 * Format the shortest exact text describing a period
 * @param earliest The earliest instant
 * @param latest The latest instant
 */
function exactPeriod(earliest, latest) {
    earliest = earliest.toLocal();
    latest = latest.toLocal();
    var now = luxon_1.DateTime.utc();
    var hasHourComponent = +earliest !== +earliest.startOf('day') || +latest !== +latest.startOf('day');
    var earliestFormat;
    var latestFormat;
    if (earliest.hasSame(latest, 'day')) {
        if (earliest.hasSame(now, 'day')) {
            // Different times today
            earliestFormat = luxon_1.DateTime.TIME_SIMPLE;
            latestFormat = luxon_1.DateTime.TIME_SIMPLE;
        }
        else {
            // Different times on same day but not today
            earliestFormat = luxon_1.DateTime.DATETIME_MED;
            latestFormat = luxon_1.DateTime.TIME_SIMPLE;
        }
    }
    else if (earliest.hasSame(latest, 'year')) {
        if (earliest.hasSame(now, 'year')) {
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
                earliestFormat = luxon_1.DateTime.DATETIME_MED;
                latestFormat = DATETIME_MED_WITHOUT_YEAR;
            }
            else {
                // Different dates in same but not present year
                earliestFormat = luxon_1.DateTime.DATE_MED;
                latestFormat = DATE_MED_WITHOUT_YEAR;
            }
        }
    }
    else {
        if (hasHourComponent) {
            // Different times in different years
            earliestFormat = luxon_1.DateTime.DATETIME_MED;
            latestFormat = luxon_1.DateTime.DATETIME_MED;
        }
        else {
            // Different dates in different years
            earliestFormat = luxon_1.DateTime.DATE_MED;
            latestFormat = luxon_1.DateTime.DATE_MED;
        }
    }
    var locale = locale_cache_1.getLocale(earliest.locale);
    return locale.fmtDifference(earliest, earliestFormat, latest, latestFormat);
}
exports.exactPeriod = exactPeriod;
//# sourceMappingURL=humanize.js.map