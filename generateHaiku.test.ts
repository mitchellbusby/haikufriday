import {getSingleHaikuLine} from './generateHaiku';
import syllable from 'syllable';

describe('getSingleHaikuLine', () => {
    it('should generate a correctly syllabled Haiku', () => {
        const haiku = getSingleHaikuLine(5);

        const result = haiku.reduce((prev, next) => {
            return prev + syllable(next);
        }, 0);

        expect(result).toEqual(5);
    });
});