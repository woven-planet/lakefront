import { renderHook, act } from '@testing-library/react-hooks';
import { useFilter } from '../filterHooks';
import queryString from 'query-string';
import { DEFAULT_PHRASE_DEMO, FILTERS, KEYWORD_DEMO, LOCATION, PHRASE_DEMO } from 'src/components/Filter/__tests__/filter.data';

describe('useFilter', () => {
    it('should have initial values', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, () => null));

        const { filterValues } = result.current;
        expect(filterValues.keywords).toBe('');
        expect(filterValues.phrases).toBe('');
    });

    it('update filter works', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, () => null));

        act(() => {
            result.current.updateFilter('keywords', KEYWORD_DEMO);
        });

        const { filterValues } = result.current;
        expect(filterValues.keywords).toBe(KEYWORD_DEMO);
    });

    it('update filter causes filter url values to change', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, () => null));

        act(() => {
            result.current.updateFilter('keywords', KEYWORD_DEMO);
        });
        act(() => {
            result.current.updateFilter('phrases', PHRASE_DEMO);
        });

        const { filterUrl } = result.current;
        expect(filterUrl).toContain(`&keywords=${KEYWORD_DEMO}`);
        expect(filterUrl).toContain(`&phrases=${encodeURIComponent(PHRASE_DEMO)}`);
    });

    it('update filter causes filter post body values to change', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, () => null));

        act(() => {
            result.current.updateFilter('keywords', KEYWORD_DEMO);
        });
        act(() => {
            result.current.updateFilter('phrases', PHRASE_DEMO);
        });

        let { filterPostBody } = result.current;
        expect(filterPostBody.keywords).toBe(KEYWORD_DEMO);
        expect(filterPostBody.phrases).toBe(PHRASE_DEMO);

        act(() => {
            result.current.updateFilter('keywords', '');
        });
        act(() => {
            result.current.updateFilter('phrases', '');
        });

        ({ filterPostBody } = result.current);
        expect(filterPostBody).toEqual({});
    });

    it('clear all filters works', () => {
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, () => null));

        act(() => {
            result.current.updateFilter('keywords', KEYWORD_DEMO);
        });
        act(() => {
            result.current.updateFilter('phrases', PHRASE_DEMO);
        });

        act(() => {
            const filterUrl = result.current.filterUrl;
            expect(filterUrl).toMatch(/phrases/);
            expect(filterUrl).toMatch(/keywords/);
        });

        act(() => {
            result.current.clearAllFilters();
        });

        act(() => {
            const filterUrl = result.current.filterUrl;
            expect(filterUrl).toBe('');
        });
    });

    it('clear all filter sets default value.', () => {
        const FILTERS_WITH_DEFAULT_PHRASES = {
            ...FILTERS,
            phrases: {
                ...FILTERS.phrases,
                getDefaultFilterValue: () => {
                    return DEFAULT_PHRASE_DEMO;
                }
            }
        };
        const { result } = renderHook(() => useFilter(FILTERS_WITH_DEFAULT_PHRASES, false, LOCATION, () => null));

        act(() => {
            result.current.updateFilter('keywords', KEYWORD_DEMO);
        });
        act(() => {
            result.current.updateFilter('phrases', PHRASE_DEMO);
        });

        act(() => {
            const filterUrl = result.current.filterUrl;
            expect(filterUrl).toMatch(/phrases/);
            expect(filterUrl).toMatch(/keywords/);
        });

        act(() => {
            result.current.clearAllFilters();
        });

        act(() => {
            const filterUrl = result.current.filterUrl;
            expect(filterUrl).toBe(`&phrases=${encodeURIComponent(DEFAULT_PHRASE_DEMO)}`);
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
            const { result } = renderHook(() => useFilter(FILTERS_WITH_REQUIRED_PHRASES, false, LOCATION, () => null));

            act(() => {
                result.current.updateFilter('phrases', PHRASE_DEMO);
            });
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);

            act(() => {
                result.current.clearFilter('phrases');
            });
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);
        });

        it('should keep existing filter value for required filter only when calling clearAllFilters', () => {
            const { result } = renderHook(() => useFilter(FILTERS_WITH_REQUIRED_PHRASES, false, LOCATION, () => null));

            act(() => {
                result.current.updateFilter('keywords', KEYWORD_DEMO);
            });
            act(() => {
                result.current.updateFilter('phrases', PHRASE_DEMO);
            });

            expect(result.current.filterValues.keywords).toBe(KEYWORD_DEMO);
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);

            act(() => {
                result.current.clearAllFilters();
            });

            // keywords is cleared/reset, but phrases is not changed
            expect(result.current.filterValues.keywords).toBe('');
            expect(result.current.filterValues.phrases).toBe(PHRASE_DEMO);
        });
    });

    it('calls updateHistory on filter update', () => {
        const updateHistory = jest.fn();
        const { result } = renderHook(() => useFilter(FILTERS, false, LOCATION, updateHistory));

        act(() => {
            result.current.updateFilter('keywords', KEYWORD_DEMO);
        });
        act(() => {
            result.current.updateFilter('phrases', PHRASE_DEMO);
        });

        expect(updateHistory).toHaveBeenCalledWith({
            search: queryString.stringify({
                keywords: KEYWORD_DEMO,
                phrases: PHRASE_DEMO
            })
        });
    });
});
