import { getUrlFromList } from 'src/Filter/util/filterUtil';
import MultiSelect from './MultiSelect';
import { FilterModule, MultiSelectFilterProps, MultiSelectFilterOptions } from 'src/Filter/types';

/**
 * MultiSelectFilter Component
 * 
 * The MultiSelectFilter component is a multi select dropdown filter. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding description and label) can
 * be supplied via the `multiSelectFilterOptions` parameter to change how the filter looks and acts.
 * MultiSelectFilter arguments include:
 *
 * `multiSelectFilterProps` - The props required to be supplied as the first argument of
 * the MultiSelectFilter component.
 *
 * `multiSelectFilterOptions` - Any valid `FilterModule` property (excluding description and label)
 * meant to override default text filter behaviour.
 */
const MultiSelectFilter = (
    {
        options,
        label,
        description,
        initialValue = [],
        creatable = false,
        disableMenu = false,
        handleCreateItem
    }: MultiSelectFilterProps,
    multiSelectFilterOptions: MultiSelectFilterOptions = {}
): FilterModule<string[]> => ({
    getFilterCount: (value) => value.length,
    getApiQueryUrl: (key, value) => {
        if (value) {
            return getUrlFromList(key, value, options.length);
        }
        return '';
    },
    getApiPostBody: (key, value) => {
        if (value && value.length > 0) {
            return { [key]: value };
        } else {
            // don't apply any post body when there are no values set
            return undefined;
        }
    },
    getBrowserQueryUrlValue: (value) => value,
    getDefaultFilterValue: () => [],
    isDefaultFilterValue: (value) => {
        if (value) {
            if (value.length === 0) {
                return true;
            }
            return value.length === options.length;
        }
        return false;
    },
    getFilterBarLabel: (values) => {
        if (values) {
            if (!Array.isArray(values)) {
                return '';
            }

            const filterValues = values.map((value) => {
                const valueLabel = options.find((option) => option.value === value);
                if (valueLabel) {
                    const pos = valueLabel.label.indexOf('[');
                    if (pos > 0) {
                        return valueLabel.label.substring(0, pos).trim();
                    }
                    return valueLabel.label;
                }
                return value;
            });

            return `${label}: ${filterValues.toString()}`;
        }

        return '';
    },
    getFilterSectionLabel: (values) => {
        if (values) {
            if (!Array.isArray(values)) {
                return [];
            }

            const filterValues = values.map((value) => {
                const valueLabel = options.find((option) => option.value === value);
                if (valueLabel) {
                    const pos = valueLabel.label.indexOf('[');
                    if (pos > 0) {
                        return valueLabel.label.substring(0, pos).trim();
                    }
                    return valueLabel.label;
                }
                return value;
            });

            return filterValues;
        }

        return [];
    },
    parseInitialFilterValue: (browserQueryUrlValue) => {
        if (browserQueryUrlValue) {
            return typeof browserQueryUrlValue === 'string' ? [browserQueryUrlValue] : browserQueryUrlValue;
        }
        if (initialValue !== []) {
            return typeof initialValue === 'string' ? [initialValue] : initialValue;
        }

        return [];
    },
    renderComponent: ({ name, value, update }) => {
        const selected = value.map((item) => ({
            label: item,
            value: item
        }));

        return (
            <MultiSelect
                key={name}
                creatable={creatable}
                handleCreateItem={handleCreateItem}
                items={options}
                value={selected}
                selectItem={update}
                title={name}
                disableMenu={disableMenu}
            />
        );
    },
    ...multiSelectFilterOptions,
    description,
    label
});

export default MultiSelectFilter;
