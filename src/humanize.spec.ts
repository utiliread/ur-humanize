import { DateTime, Duration, Settings } from 'luxon';
import { casualDuration, casualRelativeTime, casualTime, casualTimeAgo, exactPeriod, exactTime } from './humanize';

import { expect } from 'chai';
import { loadLocale } from './locale-cache';
import { default as da } from "./locale/da";

import * as datefnsLocale from "date-fns/locale/sv/index";
import { formatDistanceStrict } from 'date-fns/esm';

Settings.defaultLocale = 'da';

before('loadLocale', async () => {
    await loadLocale(da);
});

describe('date-fns', () => {
    it('should tranlate', () => {
        const now = DateTime.local();
        const aMinuteAgo = now.minus({ minutes: 1 });
        console.log(datefnsLocale);
        console.log(formatDistanceStrict(aMinuteAgo.toJSDate(), now.toJSDate(), {
            locale: <any>datefnsLocale
        }));
    });
})

describe('casualTimeAgo', () => {
    it('should return 1 minut siden', () => {
        const aMinuteAgo = DateTime.local().minus({ minutes: 1 });
        const result = casualTimeAgo(aMinuteAgo);

        expect(result).to.equal('1 minut siden');
    });

    it('should return 1 minut siden', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteBefore = base.minus({ minutes: 1 });
        const result = casualTimeAgo(aMinuteBefore, base);

        expect(result).to.equal('1 minut siden');
    });

    it('should return om 1 minut', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteAfter = base.plus({ minutes: 1 });
        const result = casualTimeAgo(aMinuteAfter, base);

        expect(result).to.equal('om 1 minut');
    });
});

describe('casualRelativeTime', () => {
    it('should return 1 minut før', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteBefore = base.minus({ minutes: 1 });
        const result = casualRelativeTime(aMinuteBefore, base);

        expect(result).to.equal('1 minut før');
    });

    it('should return 1 minut efter', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteAfter = base.plus({ minutes: 1 });
        const result = casualRelativeTime(aMinuteAfter, base);

        expect(result).to.equal('1 minut efter');
    });
});

describe('casualDuration', () => {
    it('should return 1 minut when positive', () => {
        const duration = Duration.fromObject({ minutes: 1 });
        const result = casualDuration(duration);

        expect(result).to.equal('1 minut');
    });

    it('should return 1 minut when negative', () => {
        const duration = Duration.fromObject({ minutes: -1 });
        const result = casualDuration(duration);

        expect(result).to.equal('1 minut');
    });
});

describe('casualTime', () => {
    const now = DateTime.local(2018, 1, 1, 8, 0, 0);

    before('set now', () => {
        Settings.now = () => now.valueOf();
    });

    it('should return X minutter siden when within an hour', () => {
        const minutesBefore = now.minus({ minutes: 30 });
        const result = casualTime(minutesBefore);

        expect(result).to.equal('30 minutter siden');
    });

    it('should return a time when within same day', () => {
        const hoursBefore = now.minus({ hours: 3 });
        const result = casualTime(hoursBefore);

        expect(result).to.equal('05.00');
    });

    it('should return X dage siden when within 7 days', () => {
        const fewDaysBefore = now.minus({ days: 3 });
        const result = casualTime(fewDaysBefore);

        expect(result).to.equal('3 dage siden');
    });

    it('should return a date otherwise', () => {
        const manyDaysBefore = now.minus({ days: 8 });
        const result = casualTime(manyDaysBefore);

        expect(result).to.equal('24. dec. 2017');
    });
});

describe('exactTime', () => {
    const now = DateTime.local(2018, 1, 1, 8, 0, 0);

    before('set now', () => {
        Settings.now = () => now.valueOf();
    });

    it('should return time today', () => {
        const instant = DateTime.local(2018, 1, 1, 3, 0, 0);
        const result = exactTime(instant);

        expect(result).to.be.equal('03.00');
    });

    it('should return time in present year', () => {
        const instant = DateTime.local(2018, 1, 2, 3, 0, 0);
        const result = exactTime(instant);

        expect(result).to.be.equal('2. jan. 03.00');
    });

    it('should return date in present year', () => {
        const instant = DateTime.local(2018, 1, 2, 0, 0, 0);
        const result = exactTime(instant);

        expect(result).to.be.equal('2. jan.');
    });

    it('should return time in other year', () => {
        const instant = DateTime.local(2019, 1, 1, 3, 0, 0);
        const result = exactTime(instant);

        expect(result).to.be.equal('1. jan. 2019 03.00');
    });

    it('should return date in other year', () => {
        const instant = DateTime.local(2019, 1, 1, 0, 0, 0);
        const result = exactTime(instant);

        expect(result).to.be.equal('1. jan. 2019');
    });
});

describe('exactPeriod', () => {
    const now = DateTime.local(2018, 1, 1, 8, 0, 0);

    before('set now', () => {
        Settings.now = () => now.valueOf();
    });

    it('should return different times today', () => {
        const earliest = DateTime.local(2018, 1, 1, 3, 0, 0);
        const latest = DateTime.local(2018, 1, 1, 14, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 03.00 til 14.00');
    });

    it('should return different times on same day but not today', () => {
        const earliest = DateTime.local(2018, 1, 2, 3, 0, 0);
        const latest = DateTime.local(2018, 1, 2, 14, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 2. jan. 2018 03.00 til 14.00');
    });

    it('should return different times in present year', () => {
        const earliest = DateTime.local(2018, 1, 1, 3, 0, 0);
        const latest = DateTime.local(2018, 1, 2, 14, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 1. jan. 03.00 til 2. jan. 14.00');
    });

    it('should return different dates in present year', () => {
        const earliest = DateTime.local(2018, 1, 1, 0, 0, 0);
        const latest = DateTime.local(2018, 1, 2, 0, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 1. jan. til 2. jan.');
    });

    it('should return different times in same but not present year', () => {
        const earliest = DateTime.local(2019, 1, 1, 3, 0, 0);
        const latest = DateTime.local(2019, 1, 2, 14, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 1. jan. 2019 03.00 til 2. jan. 14.00');
    });

    it('should return different dates in same but not present year', () => {
        const earliest = DateTime.local(2019, 1, 1, 0, 0, 0);
        const latest = DateTime.local(2019, 1, 2, 0, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 1. jan. 2019 til 2. jan.');
    });

    it('should return different times in different years', () => {
        const earliest = DateTime.local(2018, 1, 1, 0, 0, 0);
        const latest = DateTime.local(2019, 1, 1, 1, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 1. jan. 2018 00.00 til 1. jan. 2019 01.00');
    });

    it('should return different dates in different years', () => {
        const earliest = DateTime.local(2018, 1, 1, 0, 0, 0);
        const latest = DateTime.local(2019, 1, 1, 0, 0, 0);
        const result = exactPeriod(earliest, latest);

        expect(result).to.be.equal('fra 1. jan. 2018 til 1. jan. 2019');
    });
});