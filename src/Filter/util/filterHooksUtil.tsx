import { Location } from 'history';
import queryString, { ParsedQuery } from 'query-string';

import { FilterSet } from './FilterModules/FilterModules';
import { FilterPostBody, FilterValues } from './filterHooks';

// return the filter query string to be appended to API endpoint URL
export const getApiQueryUrl = (filters: FilterSet, filterValues: FilterValues): string => {
    let filterUrl = '';

    Object.keys(filters).forEach(key => {
        const filter = filters[key];
        filterUrl += filter.getApiQueryUrl(key, filterValues[key]);
    });

    return filterUrl;
};

// return the filter post body to be passed for POST api calls
export const getApiPostBody = (filters: FilterSet, filterValues: FilterValues): FilterPostBody => {
    return Object.entries(filters).reduce((body, [key, filter]) => ({
        ...body,
        ...filter.getApiPostBody(key, filterValues[key])
    }), {});
};

// parse filter values from browser url query param values to pre-populates filter values on init
export const parseInitialFilterValues = (location: Location, filters: FilterSet): FilterValues => {
    const urlParams = queryString.parse(location.search);
    const initialFilterValues = {};
    Object.keys(filters).forEach(key => {
        const filter = filters[key];
        initialFilterValues[key] = filter.parseInitialFilterValue(urlParams[key]);
    });
    return initialFilterValues;
};

// get current browser query params, optionally excluding the supplied keys
export const getCurrentBrowserQueryParams = (location: Location, excludeKeys?: string[]): ParsedQuery => {
    const currentUrlParams = queryString.parse(location.search);

    if (excludeKeys) {
        excludeKeys.forEach(key => {
            delete currentUrlParams[key];
        });
    }

    return currentUrlParams;
};

// get browser query params to save in browser address bar using current filter values
export const getFilterBrowserQueryParams = (filters: FilterSet, values: FilterValues): ParsedQuery => {
    const urlValues = {};

    Object.keys(filters).forEach(key => {
        // only save filter url if it's not a default value or it's a time range
        if (!filters[key].isDefaultFilterValue(values[key]) || key === 'dateRange') {
            const filter = filters[key];
            urlValues[key] = filter.getBrowserQueryUrlValue(values[key]);
        }
    });

    return urlValues;
};
