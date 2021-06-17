import { FilterMode, FilterSet, FilterValues, UrlParameters } from '../types';

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
export const getDefaultValue = (urlParams: UrlParameters, key: string, defaultValue: any) => {
    if (urlParams[key]) {
        return Array.isArray(urlParams[key]) ? urlParams[key][0] : urlParams[key];
    }

    return defaultValue;
};

/**
 * Returns the default value of `jsonView` parameter.
 */
export const getDefaultJsonViewValue = (urlParams: UrlParameters) => {
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
