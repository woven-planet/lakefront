import TextSearch from './TextSearch';
import { FilterModule, TextFilterOverrides } from 'src/components/Filter/types';

export interface TextFilterOptions {
    type?: 'text' | 'number';
}

/**
 * TextFilter Component
 * 
 * The TextFilter component is a text input control meant to be used as a keyword(s) search. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding description and label) can
 * be supplied via the `textFilterOverrides` parameter to change how the filter looks and acts. TextFilter arguments include:
 * 
 * `label` - The label to display for the text filter component.
 * 
 * `description` - The description/help text to display above the text filter component.
 * 
 * `textFilterOverrides` - Any valid `FilterModule` property (excluding description and label)
 * which will override default text filter behaviour.
 * 
 * `textFilterOptions` - Used to set additional textFilter options such as the type of text input.
 */
const TextFilter = (
    label: string,
    description?: string,
    textFilterOverrides: TextFilterOverrides = {},
    textFilterOptions: TextFilterOptions = {}
): FilterModule<string> => ({
    getApiQueryUrl: (key, value) => {
        return value ? `&${key}=${encodeURIComponent(value)}` : '';
    },
    getApiPostBody: (key, value) => (value ? { [key]: value } : undefined),
    getBrowserQueryUrlValue: (value) => value,
    getDefaultFilterValue: () => '',
    isDefaultFilterValue: (value) => value === '',
    getFilterBarLabel: (value) => value,
    getFilterSectionLabel: (value) => value,
    parseInitialFilterValue: (browserQueryUrlValue: string) => browserQueryUrlValue || '',
    renderComponent: ({ name, value, update }) => (
        <TextSearch key={name} onChange={update} value={value} type={textFilterOptions.type} />
    ),
    getFilterCount(value?: string): number {
        return value ? 1 : 0;
    },
    ...textFilterOverrides,
    description,
    label
});

export default TextFilter;

