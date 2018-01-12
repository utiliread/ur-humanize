import { DateTime, Duration } from 'luxon';

import { getLocale } from './locale';

let DATETIME_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(DateTime.DATETIME_MED));
delete DATETIME_MED_WITHOUT_YEAR.year;

let DATE_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(DateTime.DATE_MED));
delete DATE_MED_WITHOUT_YEAR.year;

export function timeAgo(instant: DateTime, base?: DateTime) {
    let locale = getLocale(instant);

    return locale.fmtDistance(instant, base || DateTime.utc(), 'ago');
}

export function relativeTime(instant: DateTime, base: DateTime) {
    let locale = getLocale(instant);

    return locale.fmtDistance(instant, base || DateTime.utc(), 'relative');
}

export function relaxedTime(instant: DateTime) {
    let diff = instant.diffNow();

    if (Math.abs(diff.as('hours')) < 1) {
        // Within an hour
        return timeAgo(instant);
    }
    else if (DateTime.local().hasSame(instant, 'day')) {
        // Within present day: time only
        return instant.toLocaleString(DateTime.TIME_SIMPLE);
    }
    else if (Math.abs(diff.as('days')) < 7) {
        // Within +- 7 days
        return timeAgo(instant);
    }
    else {
        // Else: date only
        return instant.toLocaleString(DateTime.DATE_MED);
    }
}

export function exactTime(instant: DateTime) {
    let startOfDay = instant.toLocal().startOf('day');

    let hasHourComponent = +instant !== +startOfDay;

    let now = DateTime.utc();
    let format: Intl.DateTimeFormatOptions;

    if (instant.hasSame(now, 'day')) {
        // Time today
        format = DateTime.TIME_SIMPLE;
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
            format = DateTime.DATETIME_MED;
        }
        else {
            // Date in other year
            format = DateTime.DATE_MED;
        }
    }

    return instant.toLocaleString(format);
}

export function exactPeriod(earliest: DateTime, latest: DateTime) {
    let earliestStartOfDay = earliest.toLocal().startOf('day');
    let latestStartOfDay = latest.toLocal().startOf('day');

    let hasHourComponent = +earliest !== +earliestStartOfDay || +latest !== +latestStartOfDay;

    let now = DateTime.utc();
    let earliestFormat: Intl.DateTimeFormatOptions;
    let latestFormat: Intl.DateTimeFormatOptions;

    if (earliest.hasSame(latest, 'day')) {
        if (earliest.hasSame(now, 'day')) {
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

    let locale = getLocale(earliest);

    return locale.fmtDifference(earliest, earliestFormat, latest, latestFormat);
}