import Select from './Select';
import { ChangeEvent } from 'react';
import { FilterModule, SingleSelectFilterProps, SingleSelectFilterOptions } from 'src/Filter/types';

/**
 * SingleSelectFilter Component
 * 
 * The SingleSelectFilter component is a single select dropdown filter. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding description and label) can
 * be supplied via the `singleSelectFilterOptions` parameter to change how the filter looks and acts.
 * SingleSelectFilter arguments include:
 *
 * `singleSelectFilterProps` - The props required to be supplied as the first argument of
 * the SingleSelectFilter component.
 *
 * `singleSelectFilterOptions` - Any valid `FilterModule` property (excluding description and label)
 * meant to override default text filter behaviour.
 */
const SingleSelectFilter = (
    {
        options,
        label,
        description,
        initialValue,
        selectPlaceholderLabel,
        filterLabelPrefix,
        required
    }: SingleSelectFilterProps,
    singleSelectFilterOptions: SingleSelectFilterOptions = {}
): FilterModule<string> => ({
    getApiQueryUrl: (key, value) => {
        return value ? `&${key}=${encodeURIComponent(value)}` : '';
    },
    getApiPostBody: (key, value) => (value ? { [key]: value } : undefined),
    getBrowserQueryUrlValue: value => value,
    getDefaultFilterValue: () => '',
    isDefaultFilterValue: value => value === '',
    getFilterBarLabel: value => (filterLabelPrefix ? `${filterLabelPrefix}: ${value}` : value),
    parseInitialFilterValue: (browserQueryUrlValue: string) => browserQueryUrlValue || (initialValue ? String(initialValue) : ''),
    renderComponent: ({ name, value, update }) => {
        // shallow copy of options to not mutate the original
        const filterOptions = [...options];
        // This is to add a default 'Please select an option' option to the dropdown
        if (!filterOptions.find(option => option.value === '')) {
            filterOptions.unshift({ label: selectPlaceholderLabel || 'Select', value: '' });
        }

        const handleUpdate = (event: ChangeEvent<HTMLSelectElement>) => {
            update(event.target.value);
        };

        return <Select
            key={name}
            options={filterOptions}
            value={value}
            onChange={handleUpdate}
        />;
    },
    getFilterValueFromApiPostBody: (key, mutableApiPostBody) => {
        if (mutableApiPostBody && mutableApiPostBody[key]) {
            const filterValue = mutableApiPostBody[key];

            delete mutableApiPostBody[key];

            return filterValue;
        } else {
            return '';
        }
    },
    ...singleSelectFilterOptions,
    required,
    description,
    label
});

export default SingleSelectFilter;
