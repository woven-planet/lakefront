import { FilterMode, FilterSet, FilterValues } from '../types';
import queryString from 'query-string';

/**
 * FILTER_MODE_OPTIONS
 */
export const FILTER_MODE_OPTIONS = new Map([
    [FilterMode.FilterUI, 'Filter Results'],
    [FilterMode.JSON, 'Filter by JSON']
]);

/**
 * Constant user JSON query parameter.
 */
export const USER_JSON_QUERY_PARAM = 'userJSON';

/**
 * Returns the default value or fallback value of a requested url parameter.
 */
export const getDefaultValue = (urlParams: queryString.ParsedQuery<string>, key: string, defaultValue: any) => {
    if (urlParams[key]) {
        return Array.isArray(urlParams[key]) ? urlParams[key]?.[0] : urlParams[key];
    }

    return defaultValue;
};

/**
 * Returns the default value of `jsonView` parameter.
 */
export const getDefaultJsonViewValue = (urlParams: queryString.ParsedQuery<string>) => {
    const val = getDefaultValue(urlParams, 'jsonView', false);

    // value will be a string if provided as a query string
    return val === 'true';
};

/**
 * Gets the count of applied filters.
 */
export const getFilterAppliedCount = (filters: FilterSet, filterValues: FilterValues) => {
    let count = 0;
    Object.keys(filters).forEach((key) => {
        if (!filters[key].isDefaultFilterValue(filterValues[key]) && !filters[key].required) {
            count++;
        }
    });
    return count;
};

/**
 * Given a list (Array or Set) of string, return a query string representation.
 * Default behavior is that when all items are selected, nothing is returned.
 */
export const getUrlFromList = (name: string, list: string[] | Set<string>, count: number) => {
    const listSize = Array.isArray(list) ? list.length : list.size;

    // if all items in list selected, pass empty string in url filter
    if (listSize === count || listSize === 0) {
        return '';
    }

    const url = new URLSearchParams();

    for (const item of list) {
        url.append(name, item);
    }
    return `&${url}`;
};
