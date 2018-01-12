import { DateTime, Duration } from 'luxon';

import { getLocale } from './locale';

let DATETIME_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(DateTime.DATETIME_MED));
delete DATETIME_MED_WITHOUT_YEAR.year;

let DATE_MED_WITHOUT_NOYEAR = JSON.parse(JSON.stringify(DateTime.DATE_MED));
delete DATE_MED_WITHOUT_NOYEAR.year;

export function relevantTime(instant: DateTime) {
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

export function timeAgo(instant: DateTime, base?: DateTime) {
    let locale = getLocale(instant);

    return locale.fmtDistance(instant, base || DateTime.utc(), 'ago');
}

export function relativeTime(instant: DateTime, base: DateTime) {
    let locale = getLocale(instant);

    return locale.fmtDistance(instant, base || DateTime.utc(), 'relative');
}

export function timeDifference(earliest: DateTime, latest: DateTime) {
    let earliestStartOfDay = earliest.toLocal().startOf('day');
    let latestStartOfDay = latest.toLocal().startOf('day');

    let hourComponentExists = !earliest.equals(earliestStartOfDay) || !latest.equals(latestStartOfDay);

    let earliestFormat: Intl.DateTimeFormatOptions;
    let latestFormat: Intl.DateTimeFormatOptions;

    if (earliest.hasSame(latest, 'day')) {
        if (earliest.hasSame(DateTime.utc(), 'day')) {
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
        if (hourComponentExists) {
            // Different times in same year
            earliestFormat = DateTime.DATETIME_MED;
            latestFormat = DATETIME_MED_WITHOUT_YEAR;
        }
        else {
            // Different dates in same year
            earliestFormat = DateTime.DATE_MED;
            latestFormat = DATE_MED_WITHOUT_NOYEAR;
        }
    }
    else {
        if (hourComponentExists) {
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