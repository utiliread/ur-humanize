import { DateTime, Duration } from 'luxon';
import { compareAsc, formatDistance } from 'date-fns/esm';

import { da } from 'date-fns/esm/locale';

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
                        return 'om ' + result;
                    }
                    else {
                        return result + ' siden';
                    }
                case 'before':
                    if (comparison > 0) {
                        return result + ' efter';
                    }
                    else {
                        return result + ' før';
                    }
            }
        }

        return result;
    }
}