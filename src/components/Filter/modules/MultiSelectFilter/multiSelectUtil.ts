import { MultiSelectOption } from './MultiSelect';

export const createOption = (label: string): MultiSelectOption => ({
    label,
    value: label
});

export const createUniqueOptions = (parsedItems: string[]) => [...new Set(parsedItems)].map(createOption);

export const parseItems = (item: string, delimiter?: string): string[] => {
    if (!delimiter || !item.includes(delimiter)) {
        return [item];
    }

    return item
        .split(delimiter)
        .map((a) => a.trim())
        .filter((a) => a);
};

export const getUniqueOptions = (itemsStateCopy: MultiSelectOption[]): MultiSelectOption[] | string[] => {
    const eachOption = itemsStateCopy.map(option => option.value);
    return eachOption.filter((unique, index) => unique.indexOf(unique) !== index);
};
