import { getMinMaxFromKey } from '../durationFilterUtil';

describe('durationFilterUtil', () => {
    it('returns min and max value', () => {
        expect(getMinMaxFromKey('1~6')).toStrictEqual({ "max": "6", "min": "1" });
    });

    it('returns undefined when nothing is passed', () => {
        expect(getMinMaxFromKey('')).toBe(undefined);
    });
});
