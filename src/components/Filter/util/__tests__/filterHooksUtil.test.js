import {
    getApiQueryUrl,
    getApiPostBody,
    parseInitialFilterValues,
    getCurrentBrowserQueryParams,
    getFilterBrowserQueryParams
} from '../filterHooksUtil';
import { FILTERS, KEYWORD_DEMO, PHRASE_DEMO } from 'src/components/Filter/__tests__/filter.data';

const FILTER_HOOKS_UTIL_VALUES = { keywords: KEYWORD_DEMO, phrases: PHRASE_DEMO };
const FILTER_HOOKS_UTIL_LOCATION = { search: `&keywords=${KEYWORD_DEMO}&phrases=${encodeURIComponent(PHRASE_DEMO)}` };

describe('getApiQueryUrl', () => {
    it('returns the expected url', () => {
        expect(getApiQueryUrl(FILTERS, FILTER_HOOKS_UTIL_VALUES)).toBe(
            `&keywords=${KEYWORD_DEMO}&phrases=${encodeURIComponent(PHRASE_DEMO)}`
        );
    });
});

describe('getApiPostBody', () => {
    it('returns the expected post body', () => {
        expect(getApiPostBody(FILTERS, FILTER_HOOKS_UTIL_VALUES)).toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO
        });
    });
});

describe('parseInitialFilterValues', () => {
    it('returns the correctly parsed intial filter values', () => {
        expect(parseInitialFilterValues(FILTER_HOOKS_UTIL_LOCATION, FILTERS)).toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO
        });
    });
});

describe('getCurrentBrowserQueryParams', () => {
    it('returns the correct current params', () => {
        expect(getCurrentBrowserQueryParams(FILTER_HOOKS_UTIL_LOCATION)).toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO
        });
    });

    it('returns the correct current params with excluded keys', () => {
        expect(getCurrentBrowserQueryParams(FILTER_HOOKS_UTIL_LOCATION, ['keywords'])).not.toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO
        });
        expect(getCurrentBrowserQueryParams(FILTER_HOOKS_UTIL_LOCATION, ['keywords'])).toMatchObject({
            phrases: PHRASE_DEMO
        });
    });
});

describe('getFilterBrowserQueryParams', () => {
    it('returns url values that have changed.', () => {
        expect(getFilterBrowserQueryParams(FILTERS, FILTER_HOOKS_UTIL_VALUES)).toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO
        });

        expect(getFilterBrowserQueryParams(FILTERS, { ...FILTER_HOOKS_UTIL_VALUES, keywords: '' })).not.toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO
        });

        expect(getFilterBrowserQueryParams(FILTERS, { ...FILTER_HOOKS_UTIL_VALUES, keywords: '' })).toMatchObject({
            phrases: PHRASE_DEMO
        });
    });

    it('does not return url values with the dateRange key.', () => {
        const FILTERS_WITH_DATERANGE_KEY = {
            ...FILTERS,
            dataRange: {
                ...FILTERS.keywords,
                label: 'Date Range'
            }
        };

        expect(
            getFilterBrowserQueryParams(FILTERS_WITH_DATERANGE_KEY, {
                ...FILTER_HOOKS_UTIL_VALUES,
                dateRange: 'asfdsd'
            })
        ).not.toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO,
            dataRange: 'asfdsd'
        });
        
        expect(
            getFilterBrowserQueryParams(FILTERS_WITH_DATERANGE_KEY, {
                ...FILTER_HOOKS_UTIL_VALUES,
                dateRange: 'asfdsd'
            })
        ).toMatchObject({
            keywords: KEYWORD_DEMO,
            phrases: PHRASE_DEMO
        });
    });
});
