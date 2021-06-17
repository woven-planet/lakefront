import { getDefaultValue, getDefaultJsonViewValue, getFilterAppliedCount } from '../filterUtil';

describe('getDefaultValue', () => {
    describe('when url parameter key exists', () => {
        it('returns first array value when found value is an array', () => {
            expect(getDefaultValue({ found: [1, 2, 3] }, 'found')).toBe(1);
        });

        it('returns first array value when found value is not an array', () => {
            expect(getDefaultValue({ found: 'value' }, 'found')).toBe('value');
        });
    });

    describe('when url parameter key does not exist', () => {
        it('returns the provided default value', () => {
            expect(getDefaultValue({}, 'missing')).toBeUndefined();
            expect(getDefaultValue({}, 'missing', true)).toBe(true);
        });
    });
});

describe('getDefaultJsonViewValue', () => {
    it("returns true if jsonView key exists and is the string 'true'", () => {
        expect(getDefaultJsonViewValue({ jsonView: 'true' })).toBe(true);
    });

    it("returns false if jsonView key exists and is not the string 'true'", () => {
        expect(getDefaultJsonViewValue({ jsonView: true })).toBe(false);
        expect(getDefaultJsonViewValue({ jsonView: false })).toBe(false);
        expect(getDefaultJsonViewValue({ jsonView: undefined })).toBe(false);
    });

    it('returns false if jsonView key does not exists', () => {
        expect(getDefaultJsonViewValue({})).toBe(false);
    });
});

describe('getFilterAppliedCount', () => {
    const BASE_FILTER = {
        getApiQueryUrl: (key, value) => {
            return value ? `&${key}=${encodeURIComponent(value)}` : '';
        },
        getApiPostBody: (key, value) => (value ? { [key]: value } : undefined),
        getBrowserQueryUrlValue: (value) => value,
        getDefaultFilterValue: () => '',
        isDefaultFilterValue: (value) => value === '',
        getFilterBarLabel: (value) => value,
        parseInitialFilterValue: (browserQueryUrlValue) => browserQueryUrlValue || '',
        renderComponent: ({ name, value, update }) => <input key={name} onChange={update} value={value} />
    };

    const FILTERS = {
        keywords: {
            description: 'Words to include.',
            label: 'Keywords',
            ...BASE_FILTER
        },
        phrases: {
            description: 'Phrases to lookup.',
            label: 'Phrases',
            ...BASE_FILTER
        }
    };

    it('returns the count of all changed filters', () => {
        expect(getFilterAppliedCount(FILTERS, { keywords: '', phrases: '2' })).toBe(1);
        expect(getFilterAppliedCount(FILTERS, { keywords: '2', phrases: '2' })).toBe(2);
    });

    it('does not count unchanged filters', () => {
        expect(getFilterAppliedCount(FILTERS, { keywords: '', phrases: '' })).toBe(0);
    });

    it('does not count required filters.', () => {
        const FILTERS_WITH_REQUIRED_PHRASES = {
            ...FILTERS,
            phrases: {
                ...FILTERS.phrases,
                required: true
            }
        };

        expect(
            getFilterAppliedCount(FILTERS_WITH_REQUIRED_PHRASES, {
                keywords: '',
                phrases: '2'
            })
        ).toBe(0);
    });
});
