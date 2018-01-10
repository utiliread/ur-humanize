import 'date-fns/esm/locale/da';
import { DateTime } from 'luxon';
import { compareAsc, formatDistance } from 'date-fns/esm';
import { da } from 'date-fns/esm/locale';
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
        if (suffix === 'before') {
            result = result.replace('siden', 'før').replace('om', 'efter');
        }
        return result;
    }
}
