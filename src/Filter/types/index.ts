/**
 * FilterRenderProps are the required props of the renderComponent
 * function of the FilterModule.
 */
export interface FilterRenderProps<T> {
    name: string;
    value: T;
    update(value: T | null | undefined): void;
}

/**
 * FilterPostBody is a map of key/value pairs that's
 * intended to be sent as a JSON post body payload.
 */
export interface FilterPostBody {
    [key: string]: any;
}

/**
 * FilterModule is the minimum expected structure of a filter
 * to be used in the filter system.
 */
export interface FilterModule<T> {
    /**
     * text label displayed above the filter input controls
     */
    label: string;
    /**
     * optional paragraph describing the filter (also displayed above the filter input controls)
     */
    description?: string;
    /**
     * when true, indicates that filter may not be dismissed and must always have a value. defaults to false.
     */
    required?: boolean;
    /**
     * when true, indicates that UI should not be displayed in left panel for this filter. defaults to false.
     */
    inputHidden?: boolean;
    /**
     * generates filter url query param in API calls (&key=valueString)
     */
    getApiQueryUrl(key: string, value: T): string;
    /**
     * generates post body used to apply this filter when used in a POST search request
     */
    getApiPostBody(key: string, value: T): FilterPostBody | null | undefined;
    /**
     * generates the url query param value(s) for saving filter value(s) in the browser address bar (key is automatic)
     */
    getBrowserQueryUrlValue(value: T): string | string[] | null | undefined;
    /**
     * returns filter value that is set when filter is cleared
     */
    getDefaultFilterValue(): T | null | undefined;
    /**
     * returns boolean indicating if the current filter value matches the default value (if true, chip is hidden in the filter bar)
     */
    isDefaultFilterValue(value: T): boolean;
    /**
     * generates the string in displayed on this filter's chip in the filter bar
     */
    getFilterBarLabel(value: T): string;
    /**
     * parses filter value from browser url query param value(s) and pre-populates the filter value on init
     */
    parseInitialFilterValue(browserQueryUrlValue?: string | string[] | null | undefined): T | null | undefined;
    /**
     * renders the filter input controls in the left filter drawer
     */
    renderComponent(input: FilterRenderProps<T>): React.ReactElement;
    /**
     * OPTIONAL (support direct JSON input) - extracts/parses the filter value from an API post body.
     * Note: should also delete this filter's key & value from the provided API post body, so that
     * unparsed JSON can be identified and separated into its own pseudo-filter
     */
    getFilterValueFromApiPostBody?(key: string, mutableApiPostBody: FilterPostBody | null | undefined):
        T | null | undefined;
}

/**
 * FilterSet is the current set of filter names and their
 * associated FilterModule.
 */
export interface FilterSet {
    [key: string]: FilterModule<any>;
}

/**
 * FilterValues is a map of each filter and their current values.
 */
export interface FilterValues {
    [filterName: string]: any;
}

/**
 * FilterHooks is the available values and functions returned from the useFilter hook.
 */
export interface FilterHooks {
    /**
     * The currently available filter set.
     */
    filters: FilterSet;
    /**
     * The current url state after filters applied.
     */
    filterUrl: string;
    /**
     * The current post body after filters applied.
     */
    filterPostBody: FilterPostBody;
    /**
     * The current filter values.
     */
    filterValues: FilterValues;
    /**
     * The function to update a particular filter.
     */
    updateFilter(name: string, value: any): void;
    /**
     * The function to clear a particular filter.
     */
    clearFilter(name: string): void;
    /**
     * The function to clear all current filters.
     */
    clearAllFilters(): void;
    /**
     * The function to determine how filters update the post body.
     */
    applyApiPostBody(apiPostBody: FilterPostBody): void;
}

/**
 * FilterMap is the mapping of filters as they should
 * be applied to the url and post body.
 */
export interface FilterMap {
    [key: string]: string;
}

/**
 * FilterMode is the list of available states to display
 * the filter UI.
 */
export enum FilterMode {
    FilterUI = 'filter',
    JSON = 'json'
}

/**
 * LocationState is the current state of the location.
 */
interface LocationState {
    search: string;
}

/**
 * Location holds information about the current user location
 * and url state when using the consuming application.
 */
export interface Location {
    pathname: string;
    search: string;
    state: LocationState;
    hash: string;
    key?: string;
}

/**
 * UrlParameters is a map of the current url parameter name and values.
 */
export interface UrlParameters {
    [key: string]: string[] | string;
};

/**
 * UpdateHistory is the structure of a history update callback.
 */
export type UpdateHistory = ({ search }: LocationState) => void;
