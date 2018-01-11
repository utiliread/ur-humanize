import { dotnet, luxon } from './format';

import { expect } from 'chai';
import { reformat } from './reformat';

describe('reformat', () => {
    it('should reformat a simple date from dotnet to luxon', () => {       
        const result = reformat('dd/MM/yyyy', dotnet, luxon);
        
        expect(result).to.equal('dd/LL/yyyy');
    });
});