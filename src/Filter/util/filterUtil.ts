export const FILTER_MODE_OPTIONS = new Map([
    [ FilterMode.FilterUI, 'Filter Results' ],
    [ FilterMode.JSON, 'Filter by JSON' ]
]);

export const getDefaultValue = (urlParams, key, defaultValue) => {
    // urlParams can return a string or an array. if array, grab the first one
    if (urlParams[key]) {
        return Array.isArray(urlParams[key]) ? urlParams[key][0] : urlParams[key];
    }

    return defaultValue;
};

export const getDefaultJsonViewValue = (urlParams) => {
    const val = getDefaultValue(urlParams, 'jsonView', false);

    // value will be a string if provided as a query string
    return val === 'true';
};

export const getFilterAppliedCount = (filters, filterValues) => {
    let count = 0;
    Object.keys(filters).forEach(key => {
        if (!filters[key].isDefaultFilterValue(filterValues[key]) && !filters[key].required) {
            count++;
        }
    });
    return count;
};
