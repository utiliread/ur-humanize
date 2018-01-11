import { DateTime, Settings } from 'luxon';

import { Humanize } from './humanize';
import { expect } from 'chai';

describe('default', () => {
    let now = DateTime.local(2018, 1, 1, 8, 0, 0);
    
    before('set now', () => {
        Settings.now = () => now.valueOf();
    });

    it('should return X minutter siden when within an hour', () => {       
        const minutesBefore = now.minus({ minutes: 30 });
        const result = Humanize.default(minutesBefore);
        
        expect(result).to.equal('30 minutter siden');
    });

    it('should return a time when within same day', () => {
        const hoursBefore = now.minus({ hours: 3 });
        const result = Humanize.default(hoursBefore);
        
        expect(result).to.equal('05.00');
    });

    it('should return X dage siden when within 7 days', () => {
        const fewDaysBefore = now.minus({ days: 3 });
        const result = Humanize.default(fewDaysBefore);
        
        expect(result).to.equal('3 dage siden');
    });

    it('should return a date otherwise', () => {
        const manyDaysBefore = now.minus({ days: 8 });
        const result = Humanize.default(manyDaysBefore);
        
        expect(result).to.equal('24. dec. 2017');
    });
});

describe('ago', () => {
    it('should return 1 minut siden', () => {
        const aMinuteAgo = DateTime.local().minus({ minutes: 1 });
        const result = Humanize.ago(aMinuteAgo);
        
        expect(result).to.equal('1 minut siden');
    });

    it('should return 1 minut siden', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteBefore = base.minus({ minutes: 1 });
        const result = Humanize.ago(aMinuteBefore, base);
        
        expect(result).to.equal('1 minut siden');
    });

    it('should return om 1 minut', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteAfter = base.plus({ minutes: 1 });
        const result = Humanize.ago(aMinuteAfter, base);
        
        expect(result).to.equal('om 1 minut');
    });
});

describe('relative', () => {
    it('should return 1 minut før', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteBefore = base.minus({ minutes: 1 });
        const result = Humanize.relative(aMinuteBefore, base);
        
        expect(result).to.equal('1 minut før');
    });

    it('should return 1 minut efter', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteAfter = base.plus({ minutes: 1 });
        const result = Humanize.relative(aMinuteAfter, base);
        
        expect(result).to.equal('1 minut efter');
    });
});

describe('duration', () => {
    it('should return "siden" when diffNow() is used', () => {
        const past = DateTime.local(2000, 1, 1);
        const result = Humanize.duration(past.diffNow(), 'ago');
        
        expect(result).to.contain('siden');
    });
});

describe('period', () => {
    let now = DateTime.local(2018, 1, 1, 8, 0, 0);

    before('set now', () => {
        Settings.now = () => now.valueOf();
    });

    it('should return different times today', () => {
        const earliest = DateTime.local(2018, 1, 1, 3, 0, 0);
        const latest = DateTime.local(2018, 1, 1, 14, 0, 0);
        const result = Humanize.period(earliest, latest);
        
        expect(result).to.be.equal('fra 03.00 til 14.00');
    });

    it('should return different times on same day but not today', () => {
        const earliest = DateTime.local(2018, 1, 2, 3, 0, 0);
        const latest = DateTime.local(2018, 1, 2, 14, 0, 0);
        const result = Humanize.period(earliest, latest);
        
        expect(result).to.be.equal('fra 2. jan. 2018 03.00 til 14.00');
    });

    it('should return different times in same year', () => {
        const earliest = DateTime.local(2018, 1, 1, 3, 0, 0);
        const latest = DateTime.local(2018, 1, 2, 14, 0, 0);
        const result = Humanize.period(earliest, latest);
        
        expect(result).to.be.equal('fra 1. jan. 2018 03.00 til 2. jan. 14.00');
    });

    it('should return different dates in same year', () => {
        const earliest = DateTime.local(2018, 1, 1, 0, 0, 0);
        const latest = DateTime.local(2018, 1, 2, 0, 0, 0);
        const result = Humanize.period(earliest, latest);
        
        expect(result).to.be.equal('fra 1. jan. 2018 til 2. jan.');
    });

    it('should return different times in different years', () => {
        const earliest = DateTime.local(2018, 1, 1, 0, 0, 0);
        const latest = DateTime.local(2019, 1, 1, 1, 0, 0);
        const result = Humanize.period(earliest, latest);
        
        expect(result).to.be.equal('fra 1. jan. 2018 00.00 til 1. jan. 2019 01.00');
    });

    it('should return different dates in different years', () => {
        const earliest = DateTime.local(2018, 1, 1, 0, 0, 0);
        const latest = DateTime.local(2019, 1, 1, 0, 0, 0);
        const result = Humanize.period(earliest, latest);
        
        expect(result).to.be.equal('fra 1. jan. 2018 til 1. jan. 2019');
    });
});