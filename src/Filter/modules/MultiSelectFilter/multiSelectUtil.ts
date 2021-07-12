import { MultiSelectOption } from './MultiSelect';

export const createOption = (label: string): MultiSelectOption => ({
    label,
    value: label
});

export const getUrlFromList = (name: string, list: string[] | Set<string>, count: number) => {
    const listSize = Array.isArray(list) ? list.length : list.size;

    // if all items in list selected, pass empty string in url filter
    if (listSize === count || listSize === 0) {
        return '';
    }

    const url = new URLSearchParams();

    for (const item of list) {
        url.append(name, item);
    }
    return `&${url}`;
};
