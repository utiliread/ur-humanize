import { DateTime, Duration } from 'luxon';
import { compareAsc, formatDistance } from 'date-fns/esm';

import { da } from 'date-fns/esm/locale';

let DATETIME_MED_WITHOUT_YEAR = JSON.parse(JSON.stringify(DateTime.DATETIME_MED));
delete DATETIME_MED_WITHOUT_YEAR.year;

let DATE_MED_WITHOUT_NOYEAR = JSON.parse(JSON.stringify(DateTime.DATE_MED));
delete DATE_MED_WITHOUT_NOYEAR.year;

export class Humanize {
    static default(date: DateTime) {
        let diff = date.diffNow();

        if (Math.abs(diff.as('hours')) < 1) {
            // Within an hour
            return Humanize.ago(date);
        }
        else if (DateTime.local().hasSame(date, 'day')) {
            // Within present day: time only
            return date.toLocaleString(DateTime.TIME_SIMPLE);
        }
        else if (Math.abs(diff.as('days')) < 7) {
            // Within +- 7 days
            return Humanize.ago(date);
        }
        else {
            // Else: date only
            return date.toLocaleString(DateTime.DATE_MED);
        }
    }

    static ago(date: DateTime, base?: DateTime) {
        return Humanize.distance(date, base || DateTime.utc(), 'ago');
    }

    static before(date: DateTime, base: DateTime) {
        return Humanize.distance(date, base || DateTime.utc(), 'before');
    }

    static distance(date: DateTime, base: DateTime, suffix?: 'ago' | 'before') {
        return Humanize.duration(date.diff(base), suffix);
    }

    static duration(duration: Duration, suffix?: 'ago' | 'before') {
        let now = DateTime.utc();
        let date = now.plus(duration).toJSDate();
        let base = now.toJSDate();

        let result = formatDistance(date, base, { includeSeconds: true, locale: da });

        if (suffix) {
            let comparison = compareAsc(date, base);

            switch (suffix) {
                case 'ago':
                    if (comparison > 0) {
                        return `om ${result}`;
                    }
                    else {
                        return `${result} siden`;
                    }
                case 'before':
                    if (comparison > 0) {
                        return `${result} efter`;
                    }
                    else {
                        return `${result} før`;
                    }
            }
        }

        return result;
    }

    static period(earliest: DateTime, latest: DateTime) {
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

        return `fra ${earliest.toLocaleString(earliestFormat)} til ${latest.toLocaleString(latestFormat)}`;
    }
}