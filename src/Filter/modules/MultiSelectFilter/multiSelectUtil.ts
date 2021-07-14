import { MultiSelectOption } from './MultiSelect';

export const createOption = (label: string): MultiSelectOption => ({
    label,
    value: label
});
