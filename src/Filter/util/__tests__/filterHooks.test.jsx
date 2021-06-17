import { renderHook, act } from '@testing-library/react-hooks';
import { useFilter } from '../filterHooks';

const KEYWORD_DEMO = 'demoText';
const PHRASE_DEMO = 'demo phrase here.';
const REQUIRED_PHRASE_DEMO = 'A random phrase then.';

const BASE_FILTER = {
    getApiQueryUrl: (key, value) => {
        return value ? `&${key}=${encodeURIComponent(value)}` : '';
    },
    getApiPostBody: (key, value) => (value ? { [key]: value } : undefined),
    getBrowserQueryUrlValue: value => value,
    getDefaultFilterValue: () => '',
    isDefaultFilterValue: value => value === '',
    getFilterBarLabel: value => value,
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
        getDefaultFilterValue: () => {
            return REQUIRED_PHRASE_DEMO
        },
        ...BASE_FILTER
    }
};

const LOCATION = {
    pathname: 'path',
    search: '',
    state: {
        search: ''
    },
    hash: '',
    key: 'key'
};

const updateHistory = jest.fn();

describe('useFilter', () => {
    it('should have initial values', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, updateHistory));

        const { filterValues } = result.current;
        expect(filterValues.keywords).toBe('');
        expect(filterValues.phrases).toBe('');
    });

    it('update filter works', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, updateHistory));

        act(() => { result.current.updateFilter('keywords', KEYWORD_DEMO); });

        const { filterValues } = result.current;
        expect(filterValues.keywords).toBe(KEYWORD_DEMO);
    });

    it('update filter causes filter url values to change', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, updateHistory));

        act(() => { result.current.updateFilter('keywords', KEYWORD_DEMO); });
        act(() => { result.current.updateFilter('phrases', PHRASE_DEMO); });

        const { filterUrl } = result.current;
        expect(filterUrl).toContain(`&keywords=${KEYWORD_DEMO}`);
        expect(filterUrl).toContain(`&phrases=${encodeURIComponent(PHRASE_DEMO)}`);
    });

    it('update filter causes filter post body values to change', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, updateHistory));

        act(() => { result.current.updateFilter('keywords', KEYWORD_DEMO); });
        act(() => { result.current.updateFilter('phrases', PHRASE_DEMO); });

        let { filterPostBody } = result.current;
        expect(filterPostBody.keywords).toBe(KEYWORD_DEMO);
        expect(filterPostBody.phrases).toBe(PHRASE_DEMO);

        act(() => { result.current.updateFilter('keywords', ''); });
        act(() => { result.current.updateFilter('phrases', ''); });

        ({ filterPostBody } = result.current);
        expect(filterPostBody).toEqual({});
    });

    it('clear all filters works', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, updateHistory));

        act(() => { result.current.updateFilter('keywords', KEYWORD_DEMO); });
        act(() => { result.current.updateFilter('phrases', PHRASE_DEMO); });

        act(() => {
            const filterUrl = result.current.filterUrl;
            expect(filterUrl).toMatch(/phrases/);
            expect(filterUrl).toMatch(/keywords/);
        });

        act(() => { result.current.clearAllFilters(); });

        act(() => {
            const filterUrl = result.current.filterUrl;
            expect(filterUrl).toBe('');
        });
    });

    describe('when a filter has the required property set to true', () => {
        const FILTERS_WITH_REQUIRED_PHRASES = {
            ...FILTERS,
            phrases: {
                ...FILTERS.phrases,
                required: true
            }
        };

        it('should not change filter value when calling clearFilter', () => {
            const { result } = renderHook(() => useFilter(FILTERS_WITH_REQUIRED_PHRASES, false, LOCATION, updateHistory));

            act(() => { result.current.updateFilter('phrases', PHRASE_DEMO); });
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);
            
            act(() => { result.current.clearFilter('phrases'); });
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);
        });
        
        it('should keep existing filter value for required filter only when calling clearAllFilters', () => {
            const { result } = renderHook(() => useFilter(FILTERS_WITH_REQUIRED_PHRASES, false, LOCATION, updateHistory));
            
            act(() => { result.current.updateFilter('keywords', KEYWORD_DEMO); });
            act(() => { result.current.updateFilter('phrases', PHRASE_DEMO); });
            
            expect(result.current.filterValues.keywords).toBe(KEYWORD_DEMO);
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);

            act(() => { result.current.clearAllFilters(); });

            // keywords is cleared/reset, but phrases is not changed
            expect(result.current.filterValues.keywords).toBe('');
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);
        });
    });
});
