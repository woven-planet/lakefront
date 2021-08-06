import { MultiSelectOption } from './MultiSelect';
import { ParseMultiValue } from 'src/Filter/types';

export const createOption = (label: string): MultiSelectOption => ({
    label,
    value: label
});

export const createUniqueOptions = (parsedItems: string[]) => [...new Set(parsedItems)].map(createOption);

export const parseItems = (item: string, parseMultiValue?: ParseMultiValue): string[] => {
    if (!parseMultiValue?.enabled || !item.includes(parseMultiValue.delimiter)) {
        return [item];
    }
    
    return item.split(parseMultiValue.delimiter).filter((a) => a.trim());
};
