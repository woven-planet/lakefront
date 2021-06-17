import queryString, { ParsedQuery } from 'query-string';
import { FilterPostBody, FilterSet, FilterValues, Location } from '../types';

/**
 * Return the filter query string to be appended to API endpoint URL.
 */
export const getApiQueryUrl = (filters: FilterSet, filterValues: FilterValues): string => {
    let filterUrl = '';

    Object.keys(filters).forEach((key) => {
        const filter = filters[key];
        filterUrl += filter.getApiQueryUrl(key, filterValues[key]);
    });

    return filterUrl;
};

/**
 * Return the filter post body to be passed for POST api calls.
 */
export const getApiPostBody = (filters: FilterSet, filterValues: FilterValues): FilterPostBody => {
    return Object.entries(filters).reduce(
        (body, [key, filter]) => ({
            ...body,
            ...filter.getApiPostBody(key, filterValues[key])
        }),
        {}
    );
};

/**
 * Parse filter values from browser url query param values to
 * pre-populate filter values on init.
 */
export const parseInitialFilterValues = (location: Location, filters: FilterSet): FilterValues => {
    const urlParams = queryString.parse(location.search);
    const initialFilterValues: FilterValues = {};
    Object.keys(filters).forEach((key) => {
        const filter = filters[key];
        initialFilterValues[key] = filter.parseInitialFilterValue(urlParams[key]);
    });
    return initialFilterValues;
};

/**
 * Get current browser query params, optionally excluding the supplied keys.
 */
export const getCurrentBrowserQueryParams = (location: Location, excludeKeys?: string[]): ParsedQuery => {
    const currentUrlParams = queryString.parse(location.search);

    if (excludeKeys) {
        excludeKeys.forEach((key) => {
            delete currentUrlParams[key];
        });
    }

    return currentUrlParams;
};

/**
 * Get browser query params to save in browser address bar
 * using current filter values.
 */
export const getFilterBrowserQueryParams = (filters: FilterSet, values: FilterValues): ParsedQuery => {
    const urlValues: FilterValues = {};

    Object.keys(filters).forEach((key) => {
        // only save filter url if it's not a default value or it's a time range
        if (!filters[key].isDefaultFilterValue(values[key]) || key === 'dateRange') {
            const filter = filters[key];
            urlValues[key] = filter.getBrowserQueryUrlValue(values[key]);
        }
    });

    return urlValues;
};
