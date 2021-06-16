import { FilterModule } from '../types';

const isActualValue = (value: any) => {
    return value && Object.keys(value).length > 0;
};

/**
 * This is a "pseudo" filter used in Filter JSON input to track additional, user-supplied JSON values which
 * have no equivalent UI filter to represent them. It acts like any other filter, in that is is able to parse its
 * own value from a query string, serialize to a query string, and show a filter chip label in the Filter Bar,
 * but it has `inputHidden` set to true which causes it to NOT RENDER ANY FILTER UI in the filter drawer.
 * 
 * This filter intentionally does NOT implement getFilterValueFromApiPostBody, because the useFilter hook
 * sets this filter's value based on the JSON "leftover" after all the other filters parse their values from JSON
 */
export const AdditionalJSONFilter = (): FilterModule<any> => ({
    label: 'Additional JSON',
    inputHidden: true,
    getApiQueryUrl: () => '',
    getApiPostBody: (_, value) => value,
    getBrowserQueryUrlValue: value => (isActualValue(value) ? JSON.stringify(value) : undefined),
    getDefaultFilterValue: () => undefined,
    isDefaultFilterValue: value => !isActualValue(value),
    getFilterBarLabel: value => (value ? 'Additional JSON Filters' : ''),
    parseInitialFilterValue: (browserQueryUrlValue: string) => {
        return browserQueryUrlValue ? JSON.parse(browserQueryUrlValue) : undefined;
    },
    renderComponent: () => (<></>)
});
