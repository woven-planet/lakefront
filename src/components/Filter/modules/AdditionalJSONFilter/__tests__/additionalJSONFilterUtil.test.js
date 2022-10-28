import { isActualValue } from '../additionalJSONFilterUtil';

describe('isActualValue', () => {
    it('returns false when value is falsy', () => {
        expect(isActualValue('')).toBe(false);
        expect(isActualValue(0)).toBe(false);
        expect(isActualValue(null)).toBe(false);
        expect(isActualValue()).toBe(false);
    });

    it('returns false if the value (object) has no keys', () => {
        expect(isActualValue(1)).toBe(false);
        expect(isActualValue({})).toBe(false);
        expect(isActualValue([])).toBe(false);
    });

    it('returns true if the value (object) has keys', () => {
        expect(isActualValue('a')).toBe(true);
        expect(isActualValue([1])).toBe(true);
        expect(isActualValue({ a: 1 })).toBe(true);
    });
});
