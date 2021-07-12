import { Dispatch, FC, SetStateAction } from 'react';
import { SelectOverLayOption } from 'src/Filter/modules/SingleSelectFilter/SelectOverlay';
import { MultiSelectOption } from 'src/Filter/modules/MultiSelectFilter/MultiSelect';
import { JSONObject } from 'src/types/global';

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
export interface FilterPostBody extends JSONObject {}

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
    hash?: string;
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
    [key: string]: string[] | string | null;
};

/**
 * UpdateHistory is the structure of a history update callback.
 */
export type UpdateHistory = ({ search, hash }: LocationState) => void;

/**
 * ContextSwitchMenuProps is the structure of the ContextSwitchMenu
 * component that can be used to toggle Filter component
 * views.
 */
export interface ContextSwitchMenuProps {
    options: Map<FilterMode, string>;
    value: FilterMode;
    onChange?: (filterMode: FilterMode) => void;
    triggerClassName?: string;
}

/**
 * FilterBarProps is the structure of the FilterBar
 * component that can be used to display the applied filters.
 */
export interface FilterBarProps {
    filters: FilterSet;
    filterValues: FilterValues;
    clearFilter?: (name: string) => void;
    clearAllFilter?: () => void;
}

/**
 * FilterJSONConfirmationModalProps is the structure of the
 * FilterJSONConfirmationModal component that can be used to
 * confirm the user has finished making unsaved changes.
 */
export interface FilterJSONConfirmationModalProps {
    modalVisible: boolean;
    handleModalClose?: () => void;
    onConfirm?: () => void;
}

/**
 * FilterJSONInputProps is the structure of the
 * FilterJSONInput component that can be used by
 * the end user to edit the filter JSON parameters and values.
 */
export interface FilterJSONInputProps {
    filterHooks: FilterHooks;
    onInputModifiedChange?: Dispatch<SetStateAction<boolean>>;
}

/**
 * FilterComponentProps is the structure of the expected props
 * to be provided to the primary Filter component.
 */
export interface FilterComponentProps {
    /**
     * ContextSwitchMenu can be used to toggle Filter component views.
     */
    ContextSwitchMenu?: FC<ContextSwitchMenuProps>;
    /**
     * FilterBar can be used to display the applied filters.
     */
    FilterBar?: FC<FilterBarProps>;
    /**
     * FilterJSONConfirmationModal can be used to
     * confirm the user has finished making unsaved changes.
     */
    FilterJSONConfirmationModal?: FC<FilterJSONConfirmationModalProps>;
    /**
     * FilterJSONInput can be used by
     * the end user to edit the filter JSON parameters and values.
     */
    FilterJSONInput?: FC<FilterJSONInputProps>;
    /**
     * Additional query params that can be provided seperate from
     * the current filters.
     */
    additionalQueryParams?: {
        [key: string]: string;
    };
    /**
     * The available values and functions returned from the useFilter hook.
     */
    filterHooks: FilterHooks;
    /**
     * Controls whether the FilterBar component (if provided)
     * is visible.
     */
    hideFilterBar?: boolean;
    /**
     * Controls which filter (if any) is expanded by default.
     */
    initialActiveSection?: string;
    /**
     * Controls whether the filter side panel is expanded or collapsed.
     */
    isCollapsed?: boolean;
    /**
     * Controls whether the user can add additional filters via a JSON editor.
     */
    isJSONInputAllowed?: boolean;
    /**
     * The (mutable) location state which gets updated as filters are applied.
     */
    location: Location;
    /**
     * The callback that runs when the filter pane is collapsed.
     */
    onToggleCollapsed?(isCollapsed: boolean): void;
    /**
     * This controls how the location/history state is updated
     * as filters change.
     */
    updateHistory: UpdateHistory;
}

/**
 * FilterContainerProps is the structure of the expected props
 * to be provided to outermost container of the Filter component.
 */
export interface FilterContainerProps {
    showJSONInput: boolean;
    isCollapsed: boolean;
};

/**
 * `MultiSelectFilterProps` are the props required to be supplied as the
 * first argument of the MultiSelectFilter component.
 */
export interface MultiSelectFilterProps {
    options: MultiSelectOption[];
    label: string;
    description?: string;
    initialValue?: any[];
    creatable?: boolean;
    handleCreateItem?: (item: string) => void;
    disableMenu?: boolean;
}

/**
 * `MultiSelectFilterOptions` is any valid `FilterModule` property (excluding description and label)
 * meant to override default multi select filter behaviour.
 */
 export interface MultiSelectFilterOptions extends Omit<Partial<FilterModule<string[]>>, 'description' | 'label'> {}


/**
 * `SingleSelectFilterProps` are the props required to be supplied as the
 * first argument of the SingleSelectFilter component.
 */
 export interface SingleSelectFilterProps {
    options: SelectOverLayOption[];
    label: string;
    description?: string;
    selectPlaceholderLabel?: string;
    filterLabelPrefix?: string;
    initialValue?: string | number;
    required?: boolean;
}

/**
 * `SingleSelectFilterOptions` is any valid `FilterModule` property (excluding description, label, and required)
 * meant to override default single select filter behaviour.
 */
 export interface SingleSelectFilterOptions extends Omit<Partial<FilterModule<string>>, 'description' | 'label' | 'required'> {}

/**
 * `TextFilterOptions` is any valid `FilterModule` property (excluding description and label)
 * meant to override default text filter behaviour.
 */
 export interface TextFilterOptions extends Omit<Partial<FilterModule<string>>, 'description' | 'label'> {}
