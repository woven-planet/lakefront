/**
 * JSONObject is a wrapper for a generic JSON object structure.
 */
export interface JSONObject {
    [key: string]: any;
}

/**
 * This is the structure of a selectable option.
 */
export interface SelectOption<T> {
    label: string;
    value: T;
}
