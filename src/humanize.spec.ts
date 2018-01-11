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
        
        expect(result).to.equal('05:00');
    });

    it('should return X dage siden when within 7 days', () => {
        const fewDaysBefore = now.minus({ days: 3 });
        const result = Humanize.default(fewDaysBefore);
        
        expect(result).to.equal('3 dage siden');
    });

    it('should return a date otherwise', () => {
        const manyDaysBefore = now.minus({ days: 8 });
        const result = Humanize.default(manyDaysBefore);
        
        expect(result).to.equal('24/12/2017');
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

describe('before', () => {
    it('should return 1 minut før', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteBefore = base.minus({ minutes: 1 });
        const result = Humanize.before(aMinuteBefore, base);
        
        expect(result).to.equal('1 minut før');
    });

    it('should return 1 minut efter', () => {
        const base = DateTime.local(2018, 1, 1);
        const aMinuteAfter = base.plus({ minutes: 1 });
        const result = Humanize.before(aMinuteAfter, base);
        
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