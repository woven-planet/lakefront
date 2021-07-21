import { render } from '@testing-library/react';
import { createChips, getFilterCount } from '../filterSectionHeaderUtil';

describe('createChips', () => {
    it('returns null if value is array with no length', () => {
        expect(createChips([])).toBeNull();
    });

    it('renders null for empty array values', () => {
        const { getByText } = render(
            <div>
                chips
                {createChips([''])}
            </div>
        );

        expect(getByText('chips').querySelectorAll('div')).toHaveLength(0);
    });

    it('renders chip for each non-empty array value', () => {
        const { getByText } = render(
            <div>
                chips
                {createChips(['a', 'b'])}
            </div>
        );

        expect(getByText('chips').querySelectorAll('div')).toHaveLength(4);
    });
});

describe('getFilterCount', () => {
    describe('when filter.getFilterCount is defined', () => {
        it('returns result of applying filter.getFilterCount to provided value', () => {
            expect(getFilterCount('1', { getFilterCount: () => 2 }, true)).toBe(2);
            expect(getFilterCount('1', { getFilterCount: () => 2 }, false)).toBe(2);
        });
    });

    describe('when filter.getFilterCount is not defined', () => {
        it('returns default filter count if filter has been applied', () => {
            expect(getFilterCount('1', {}, true)).toBe(1);
        });

        it('returns 0 if filter has not been applied', () => {
            expect(getFilterCount('1', {}, false)).toBe(0);
        });
    });
});
