import RadioGroup from "src/RadioGroup/RadioGroup";
import { FilterModule, RadioFilterOptions } from "../types";


export interface RadioFilterProps {
    initialValue: string;
    defaultValue: string;
    options: {
        label: string;
        value: string;
    }[];
    label: string;
    radioFilterOptions?: RadioFilterOptions;
}

export const RadioFilter = (
    { initialValue, defaultValue, options, label, radioFilterOptions }: RadioFilterProps
): FilterModule<string> => ({
    label,
    getApiQueryUrl: (key, value) => {
        return value !== defaultValue ? `&${key}=${value}` : '';
    },
    getApiPostBody: (key, value) => (value ? { [key]: value } : undefined),
    getBrowserQueryUrlValue: value => value,
    getDefaultFilterValue: () => defaultValue,
    isDefaultFilterValue: value => value === defaultValue,
    getFilterBarLabel: value => {
        const itemLabel = options.find(i => i.value === value);
        return itemLabel ? itemLabel.label : '';
    },
    parseInitialFilterValue: (browserQueryUrlValue: string) => browserQueryUrlValue || initialValue,
    renderComponent: ({ name, value, update }) => (
        <RadioGroup key={name} name={name} value={value} onChange={(event) => update(event.target.value)} options={options} />
    ),
    ...radioFilterOptions
});
