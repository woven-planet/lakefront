import { COLORS, InvalidButtonColorError, shouldUseMappedIcon } from '../buttonUtil';

describe('InvalidButtonColorError', () => {
    it('throws the correct error', () => {
        const color = 'black';

        expect(() => { throw new InvalidButtonColorError(color) }).toThrowError(
            `Invalid color '${color}' was provided. Valid colors are: ${Object.values(COLORS).join(', ')}.`
        );
    });
});
describe('shouldUseMappedIcon', () => {
    const iconName = 'add';

    it('returns true if icon is truthy and iconName does not exist', () => {
        expect(shouldUseMappedIcon({ icon: true })).toBeTruthy();
    });

    it('returns false if icon is truthy and iconName exists', () => {
        expect(shouldUseMappedIcon({ iconName, icon: true })).toBeFalsy();
    });

    it('returns false if icon is falsy', () => {
        expect(shouldUseMappedIcon({ iconName, icon: false })).toBeFalsy();
        expect(shouldUseMappedIcon({ iconName })).toBeFalsy();
        expect(shouldUseMappedIcon({ icon: false })).toBeFalsy();
    });
});
