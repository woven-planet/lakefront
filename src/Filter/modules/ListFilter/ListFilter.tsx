import { getUrlFromList } from 'src/Filter/util/filterUtil';
import CheckboxGroup from 'src/CheckboxGroup';
import { FilterModule } from 'src/Filter/types';
import { pluralize } from 'src/lib/util';

interface ListFilterOptions {
    allLabel?: string;
    initialValue?: string | any[];
}

export const ListFilter = (
    options,
    label: string,
    description?: string,
    listFilterOptions: ListFilterOptions = {}
): FilterModule<Set<string>> => ({
    label,
    description,
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
                    return itemLabel.label;
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
            const initialfilterValue = typeof initialValue === 'string' ? [initialValue] : initialValue;

            return new Set(initialfilterValue);
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
    )
});
