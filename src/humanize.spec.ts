import { DateTime } from 'luxon';
import { Humanize } from './humanize';
import { expect } from 'chai';

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