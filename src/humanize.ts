import { DateTime, Duration } from 'luxon';

import compareAsc from 'date-fns/esm/compareAsc';
import da from 'date-fns/esm/locale/da';
import formatDistance from 'date-fns/esm/formatDistance';

export class Humanize {
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