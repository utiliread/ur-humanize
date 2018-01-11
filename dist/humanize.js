import { DateTime } from 'luxon';
import compareAsc from 'date-fns/esm/compareAsc';
import da from 'date-fns/esm/locale/da';
import formatDistance from 'date-fns/esm/formatDistance';
export class Humanize {
    static ago(date, base) {
        return Humanize.distance(date, base || DateTime.utc(), 'ago');
    }
    static before(date, base) {
        return Humanize.distance(date, base || DateTime.utc(), 'before');
    }
    static distance(date, base, suffix) {
        return Humanize.duration(date.diff(base), suffix);
    }
    static duration(duration, suffix) {
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
