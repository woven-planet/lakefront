import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextFilter from '../TextFilter';

describe('TextFilter', () => {
    it('returns the proper label', () => {
        const label = 'label';
        expect(TextFilter(label, '')).toMatchObject({ label });
    });

    it('returns the proper description', () => {
        const description = 'description';
        expect(TextFilter('', description)).toMatchObject({ description });
    });

    describe('getApiQueryUrl', () => {
        const { getApiQueryUrl } = TextFilter('', '');

        it('returns the proper url when there is a value', () => {
            expect(getApiQueryUrl('a', 'first name')).toBe('&a=first%20name');
        });

        it('returns an empty string when value is falsy', () => {
            expect(getApiQueryUrl('a', '')).toBe('');
            expect(getApiQueryUrl('a', null)).toBe('');
            expect(getApiQueryUrl('a', 0)).toBe('');
            expect(getApiQueryUrl('a')).toBe('');
        });
    });

    describe('getApiPostBody', () => {
        const { getApiPostBody } = TextFilter('', '');

        it('returns the proper object when there is a value', () => {
            expect(getApiPostBody('a', 'first name')).toMatchObject({ a: 'first name' });
        });

        it('returns an undefined when value is falsy', () => {
            expect(getApiPostBody('a', '')).toBeUndefined();
            expect(getApiPostBody('a', null)).toBeUndefined();
            expect(getApiPostBody('a', 0)).toBeUndefined();
            expect(getApiPostBody('a')).toBeUndefined();
        });
    });

    describe('getBrowserQueryUrlValue', () => {
        const { getBrowserQueryUrlValue } = TextFilter('', '');

        it('returns the value provided', () => {
            expect(getBrowserQueryUrlValue('a')).toBe('a');
            expect(getBrowserQueryUrlValue(1)).toBe(1);
            expect(getBrowserQueryUrlValue()).toBeUndefined();
        });
    });

    describe('getDefaultFilterValue', () => {
        const { getDefaultFilterValue } = TextFilter('', '');

        it('returns an empty string', () => {
            expect(getDefaultFilterValue('a')).toBe('');
            expect(getDefaultFilterValue(1)).toBe('');
            expect(getDefaultFilterValue()).toBe('');
        });
    });

    describe('isDefaultFilterValue', () => {
        const { isDefaultFilterValue } = TextFilter('', '');

        it('returns true if value is equal to empty string', () => {
            expect(isDefaultFilterValue('')).toBe(true);
            expect(isDefaultFilterValue('a')).toBe(false);
            expect(isDefaultFilterValue()).toBe(false);
        });
    });

    describe('getFilterBarLabel', () => {
        const { getFilterBarLabel } = TextFilter('', '');

        it('returns the value provided', () => {
            expect(getFilterBarLabel('a')).toBe('a');
            expect(getFilterBarLabel(1)).toBe(1);
            expect(getFilterBarLabel()).toBeUndefined();
        });
    });

    describe('parseInitialFilterValue', () => {
        const { parseInitialFilterValue } = TextFilter('', '');

        it('returns value if value is truthy', () => {
            expect(parseInitialFilterValue('a')).toBe('a');
            expect(parseInitialFilterValue(1)).toBe(1);
        });

        it('returns empty string if value is falsy', () => {
            expect(parseInitialFilterValue('')).toBe('');
            expect(parseInitialFilterValue(null)).toBe('');
            expect(parseInitialFilterValue(0)).toBe('');
            expect(parseInitialFilterValue()).toBe('');
        });
    });

    describe('renderComponent', () => {
        const { renderComponent } = TextFilter('', '');

        it('returns the expected component', () => {
            const update = jest.fn();
            const { getByRole } = render(<div>{renderComponent({ name: 'name', value: '1', update })}</div>);
            expect(getByRole('textbox')).toHaveValue('1');
            fireEvent.blur(getByRole('textbox'), { target: { value: 'asdf' } });
            expect(update).toBeCalledWith('asdf');
        });
    });

    describe('textFilterOptions', () => {
        const filterModuleKeys = [
            'label',
            'description',
            'getApiQueryUrl',
            'getApiPostBody',
            'getBrowserQueryUrlValue',
            'getDefaultFilterValue',
            'isDefaultFilterValue',
            'getFilterBarLabel',
            'parseInitialFilterValue',
            'renderComponent'
        ];

        const {
            label,
            description,
            getApiQueryUrl,
            getApiPostBody,
            getBrowserQueryUrlValue,
            getDefaultFilterValue,
            isDefaultFilterValue,
            getFilterBarLabel,
            parseInitialFilterValue,
            renderComponent
        } = TextFilter(
            'label',
            'description',
            filterModuleKeys.reduce((acc, k) => ({ ...acc, [k]: () => null }), {})
        );

        it('does not override label and description', () => {
            expect(label).toBe('label');
            expect(description).toBe('description');
        });

        it('overrides default methods', () => {
            expect(getApiQueryUrl('a', 'b')).toBeNull();
            expect(getApiPostBody('a', 'b')).toBeNull();
            expect(getBrowserQueryUrlValue('a')).toBeNull();
            expect(getDefaultFilterValue('a')).toBeNull();
            expect(isDefaultFilterValue('a')).toBeNull();
            expect(getFilterBarLabel('a')).toBeNull();
            expect(parseInitialFilterValue('a')).toBeNull();

            const { queryByRole } = render(
                <div>{renderComponent({ name: 'name', value: '1', update: () => null })}</div>
            );
            expect(queryByRole('textbox')).not.toBeInTheDocument();
        });
    });
});
