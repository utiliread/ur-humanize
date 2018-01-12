import { DateTime, Duration, Settings } from 'luxon';
import { durationSpan, exactPeriod, exactTime, relativeTime, relaxedTime, timeAgo, timeSpan } from './humanize';

import { expect } from 'chai';
import { loadLocale } from './locale-cache';

before('set default locale', async () => {
    Settings.defaultLocale = 'da';

    await loadLocale();
});

describe('timeAgo', () => {
    it('should return 1 minut siden', () => {
        const aMinuteAgo = DateTime.local().minus({ minutes: 1 });
        const result = timeAgo(aMinuteAgo);
        
        expect(result).to.equal('1 minut siden');
    });

    it('should return 1 minut siden', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteBefore = base.minus({ minutes: 1 });
        const result = timeAgo(aMinuteBefore, base);
        
        expect(result).to.equal('1 minut siden');
    });

    it('should return om 1 minut', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteAfter = base.plus({ minutes: 1 });
        const result = timeAgo(aMinuteAfter, base);
        
        expect(result).to.equal('om 1 minut');
    });
});

describe('relativeTime', () => {
    it('should return 1 minut før', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteBefore = base.minus({ minutes: 1 });
        const result = relativeTime(aMinuteBefore, base);
        
        expect(result).to.equal('1 minut før');
    });

    it('should return 1 minut efter', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteAfter = base.plus({ minutes: 1 });
        const result = relativeTime(aMinuteAfter, base);
        
        expect(result).to.equal('1 minut efter');
    });
});

describe('timeSpan', () => {
    it('should return 1 minut', () => {
        const earliest = DateTime.local(2018, 1, 1);
        const latest = earliest.plus({ minutes: 1 });
        const result = timeSpan(earliest, latest);
        
        expect(result).to.equal('1 minut');
    });
});

describe('durationSpan', () => {
    it('should return 1 minut when positive', () => {
        const duration = Duration.fromObject({minutes: 1});
        const result = durationSpan(duration);
        
        expect(result).to.equal('1 minut');
    });

    it('should return 1 minut when negative', () => {
        const duration = Duration.fromObject({minutes: -1});
        const result = durationSpan(duration);
        
        expect(result).to.equal('1 minut');
    });
});

describe('relaxedTime', () => {
    let now = DateTime.local(2018, 1, 1, 8, 0, 0);
    
    before('set now', () => {
        Settings.now = () => now.valueOf();
    });

    it('should return X minutter siden when within an hour', () => {       
        const minutesBefore = now.minus({ minutes: 30 });
        const result = relaxedTime(minutesBefore);
        
        expect(result).to.equal('30 minutter siden');
    });

    it('should return a time when within same day', () => {
        const hoursBefore = now.minus({ hours: 3 });
        const result = relaxedTime(hoursBefore);
        
        expect(result).to.equal('05.00');
    });

    it('should return X dage siden when within 7 days', () => {
        const fewDaysBefore = now.minus({ days: 3 });
        const result = relaxedTime(fewDaysBefore);
        
        expect(result).to.equal('3 dage siden');
    });

    it('should return a date otherwise', () => {
        const manyDaysBefore = now.minus({ days: 8 });
        const result = relaxedTime(manyDaysBefore);
        
        expect(result).to.equal('24. dec. 2017');
    });
});

describe('exactTime', () => {
    let now = DateTime.local(2018, 1, 1, 8, 0, 0);

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
    let now = DateTime.local(2018, 1, 1, 8, 0, 0);

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