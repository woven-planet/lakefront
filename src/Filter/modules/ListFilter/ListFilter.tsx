import { getUrlFromList } from 'src/Filter/util/filterUtil';
import CheckboxGroup, { CheckboxGroupOption } from 'src/CheckboxGroup/CheckboxGroup';
import { FilterModule, ListFilterOverrides } from 'src/Filter/types';
import { pluralize } from 'src/lib/util';

export interface ListFilterOptions {
    allLabel?: string;
    initialValue?: string | any[];
}

const ListFilter = (
    options: CheckboxGroupOption[],
    label: string,
    description?: string,
    listFilterOptions: ListFilterOptions = {},
    listFilterOverrides: ListFilterOverrides = {}
): FilterModule<Set<string>> => ({
    getApiQueryUrl: (key, value) => {
        if (value) {
            return getUrlFromList(key, value, options.length);
        }
        return '';
    },
    getApiPostBody: (key, value) => {
        if (value && value.size > 0) {
            return { [key]: Array.from(value) };
        } else {
            // don't apply any post body when there are no values set
            return undefined;
        }
    },
    getBrowserQueryUrlValue: value => value && Array.from(value),
    getDefaultFilterValue: () => new Set(options.map(item => item.value)),
    isDefaultFilterValue: value => {
        if (value) {
            if (value.size === 0) {
                return true;
            }
            return value.size === options.length;
        }
        return false;
    },
    getFilterBarLabel: value => {
        if (value) {
            return Array.from(value)
                .map(item => {
                    const itemLabel = options.find(i => i.value === item);
                    return itemLabel?.label;
                })
                .toString();
        }
        return '';
    },
    parseInitialFilterValue: browserQueryUrlValue => {
        if (browserQueryUrlValue) {
            // initial value is either a single string or array of strings
            return typeof browserQueryUrlValue === 'string' ?
                new Set([browserQueryUrlValue]) :
                new Set(browserQueryUrlValue);
        }
        if (listFilterOptions.initialValue?.length) {
            const { initialValue } = listFilterOptions;
            const initialFilterValue = typeof initialValue === 'string' ? [initialValue] : initialValue;

            return new Set(initialFilterValue);
        }
        return new Set(options.map(item => item.value));
    },
    renderComponent: ({ name, value, update }) => (
        <CheckboxGroup
            key={name}
            onHandleChange={update}
            name={name}
            options={options}
            selected={value}
            allLabel={listFilterOptions.allLabel || pluralize(label, label.length)}
        />
    ),
    ...listFilterOverrides,
    label,
    description
});

export default ListFilter;
