import TextSearch from './TextSearch';
import { FilterModule, TextFilterOptions } from 'src/Filter/types';

/**
 * `TextFilter` is a text input control meant to be used as a keyword(s) search. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding description and label) can
 * be supplied via the `textFilterOptions` to change how the filter looks and acts. TextFilter arguments include:
 * 
 * `label` - The label to display for the text filter component.
 * 
 * `description` - The description/help text to display above the text filter component.
 * 
 * `textFilterOptions` - Any valid `FilterModule` property (excluding description and label)
 * which will override default text filter behaviour.
 */
export const TextFilter = (
    label: string,
    description?: string,
    textFilterOptions: TextFilterOptions = {}
): FilterModule<string> => ({
    description,
    label,
    getApiQueryUrl: (key, value) => {
        return value ? `&${key}=${encodeURIComponent(value)}` : '';
    },
    getApiPostBody: (key, value) => (value ? { [key]: value } : undefined),
    getBrowserQueryUrlValue: (value) => value,
    getDefaultFilterValue: () => '',
    isDefaultFilterValue: (value) => value === '',
    getFilterBarLabel: (value) => value,
    parseInitialFilterValue: (browserQueryUrlValue: string) => browserQueryUrlValue || '',
    renderComponent: ({ name, value, update }) => <TextSearch key={name} onChange={update} value={value} />,
    ...textFilterOptions
});

export default TextFilter;

