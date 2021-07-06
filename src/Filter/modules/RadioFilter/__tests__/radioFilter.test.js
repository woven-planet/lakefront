import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RadioFilter from '../RadioFilter';

const RADIO_FILTER_OPTIONS = [
    {
        label: 'North',
        value: 'north'
    },
    {
        label: 'East',
        value: 'east'
    },
    {
        label: 'South',
        value: 'south'
    },
    {
        label: 'West',
        value: 'west'
    }
];

describe('RadioFilter', () => {
    it('returns the proper label', () => {
        const label = 'label';
        expect(RadioFilter({ label }, {})).toMatchObject({ label });
    });

    it('returns the proper description', () => {
        const description = 'description';
        expect(RadioFilter({ description }, {})).toMatchObject({ description });
    });

    describe('getApiQueryUrl', () => {
        const { getApiQueryUrl } = RadioFilter({ defaultValue: '' }, {});

        it('returns the proper url when there is a value not equal to default value', () => {
            expect(getApiQueryUrl('a', 'first name')).toBe('&a=first name');
            expect(getApiQueryUrl('a', null)).toBe('&a=null');
            expect(getApiQueryUrl('a', 0)).toBe('&a=0');
            expect(getApiQueryUrl('a')).toBe('&a=undefined');
        });

        it('returns an empty string when value equals default value', () => {
            expect(getApiQueryUrl('a', '')).toBe('');
        });
    });

    describe('getApiPostBody', () => {
        const { getApiPostBody } = RadioFilter({}, {});

        it('returns the proper object when there is a value', () => {
            expect(getApiPostBody('a', 'first name')).toMatchObject({ a: 'first name' });
        });

        it('returns undefined when value is falsy', () => {
            expect(getApiPostBody('a', '')).toBeUndefined();
            expect(getApiPostBody('a', null)).toBeUndefined();
            expect(getApiPostBody('a', 0)).toBeUndefined();
            expect(getApiPostBody('a')).toBeUndefined();
        });
    });

    describe('getBrowserQueryUrlValue', () => {
        const { getBrowserQueryUrlValue } = RadioFilter({}, {});

        it('returns the value provided', () => {
            expect(getBrowserQueryUrlValue('a')).toBe('a');
            expect(getBrowserQueryUrlValue(1)).toBe(1);
            expect(getBrowserQueryUrlValue()).toBeUndefined();
        });
    });

    describe('getDefaultFilterValue', () => {
        const defaultValue = 'default';
        const { getDefaultFilterValue } = RadioFilter({ defaultValue }, {});

        it('returns a provided default value', () => {
            expect(getDefaultFilterValue('a')).toBe(defaultValue);
            expect(getDefaultFilterValue(1)).toBe(defaultValue);
            expect(getDefaultFilterValue()).toBe(defaultValue);
        });
    });

    describe('isDefaultFilterValue', () => {
        const defaultValue = 'default';
        const { isDefaultFilterValue } = RadioFilter({ defaultValue }, {});

        it(`returns true if value is equal to ${defaultValue}`, () => {
            expect(isDefaultFilterValue(defaultValue)).toBe(true);
            expect(isDefaultFilterValue('a')).toBe(false);
            expect(isDefaultFilterValue()).toBe(false);
        });
    });

    describe('getFilterBarLabel', () => {
        const { getFilterBarLabel } = RadioFilter({ options: RADIO_FILTER_OPTIONS }, {});

        it('returns the associated label if value exists in options list', () => {
            expect(getFilterBarLabel(RADIO_FILTER_OPTIONS[0].value)).toBe(RADIO_FILTER_OPTIONS[0].label);
            expect(getFilterBarLabel(RADIO_FILTER_OPTIONS[1].value)).toBe(RADIO_FILTER_OPTIONS[1].label);
        });

        it('returns empty string if value does not exist in options list', () => {
            expect(getFilterBarLabel('a')).toBe('');
            expect(getFilterBarLabel('west2')).toBe('');
            expect(getFilterBarLabel()).toBe('');
        });
    });

    describe('parseInitialFilterValue', () => {
        const { parseInitialFilterValue } = RadioFilter({ initialValue: '' }, {});

        it('returns value if value is truthy', () => {
            expect(parseInitialFilterValue('a')).toBe('a');
            expect(parseInitialFilterValue(1)).toBe(1);
        });

        it('returns initialValue if value is falsy', () => {
            expect(parseInitialFilterValue('')).toBe('');
            expect(parseInitialFilterValue(null)).toBe('');
            expect(parseInitialFilterValue(0)).toBe('');
            expect(parseInitialFilterValue()).toBe('');
        });
    });

    describe('renderComponent', () => {
        const { renderComponent } = RadioFilter({ options: RADIO_FILTER_OPTIONS }, {});

        it('returns the expected component', () => {
            const update = () => null;
            const { container } = render(<div>{renderComponent({ name: 'name', value: '1', update })}</div>);
            expect(container.querySelectorAll('input')).toHaveLength(4);
        });
    });

    describe('radioFilterOptions', () => {
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
        } = RadioFilter(
            {
                label: 'label',
                description: 'description'
            },
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