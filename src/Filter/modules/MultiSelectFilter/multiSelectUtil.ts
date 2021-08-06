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
        .filter((a) => a.trim())
        .map((a) => a.trim());
};
