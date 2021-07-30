import {
    DoubleMultiSelectFilterOptions,
    DoubleMultiSelectFilterProps,
    DoubleMultiSelectValues,
    FilterModule
} from 'src/Filter/types';
import DoubleMultiSelect from './DoubleMultiSelect';

export const getValuesFromKey = (key: string): DoubleMultiSelectValues | undefined => {
    const [first, second] = key.split('~');

    if (first || second) {
        return {
            firstSelect: first?.split(',').filter(s => s),
            secondSelect: second?.split(',').filter(s => s)
        };
    }

    return undefined;
};

const DoubleMultiSelectFilter = (
    { label, description, selectOptions }: DoubleMultiSelectFilterProps,
    doubleMultiSelectOptions: DoubleMultiSelectFilterOptions = {}
): FilterModule<DoubleMultiSelectValues> => ({
    getApiQueryUrl: (key, value) => {
        const { firstSelect, secondSelect } = selectOptions;
        let urlString = '';

        if (value?.firstSelect) {
            value.firstSelect.forEach((include) => {
                urlString += `&${firstSelect.apiField}=${include}`;
            });
        }
        if (value?.secondSelect) {
            value.secondSelect.forEach((exclude) => {
                urlString += `&${secondSelect.apiField}=${exclude}`;
            });
        }
        return urlString;
    },
    getApiPostBody: (key, value) => {
        if (value) {
            const { firstSelect, secondSelect } = selectOptions;
            const postBody: {[key: string]: string[]} = {
                [firstSelect.apiField]: [],
                [secondSelect.apiField]: []
            };

            if (value.firstSelect) {
                postBody[firstSelect.apiField] = value.firstSelect;
            }
            if (value.secondSelect) {
                postBody[secondSelect.apiField] = value.secondSelect;
            }

            return postBody;
        }

        return undefined;
    },
    getBrowserQueryUrlValue: value => {
        return value &&
        (value?.firstSelect?.length > 0 ||
            value?.secondSelect?.length > 0) ?
            `${value.firstSelect ?? ''}~${value.secondSelect ?? ''}` :
            '';
    },
    getDefaultFilterValue: () => null,
    isDefaultFilterValue: value => value === null,
    getFilterBarLabel: value => {
        if (value && (value?.firstSelect?.length > 0 || value?.secondSelect?.length > 0)) {
            const firstStr = value?.firstSelect ? `${value.firstSelect}` : '';
            const secondStr = value?.secondSelect ? `${value.secondSelect}` : '';
            return `${selectOptions.firstSelect.barLabel}: ${firstStr} ${selectOptions.secondSelect.barLabel}: ${secondStr}`;
        }
        return '';
    },
    getFilterSectionLabel: value => {
        if (value && (value?.firstSelect?.length > 0 || value?.secondSelect?.length > 0)) {
            const firstStr = value?.firstSelect ? `${value.firstSelect}` : '';
            const secondStr = value?.secondSelect ? `${value.secondSelect}` : '';
            const firstSelectStr = firstStr ? `${selectOptions.firstSelect.barLabel}: ${firstStr}` : '';
            const secondSelectStr = secondStr ? `${selectOptions.secondSelect.barLabel}: ${secondStr}` : '';

            return [firstSelectStr, secondSelectStr];
        }
        return '';
    },
    parseInitialFilterValue: (browserQueryUrlValue: string) => {
        return browserQueryUrlValue ? getValuesFromKey(browserQueryUrlValue) : null;
    },
    renderComponent: ({ value, update }) => (
        <DoubleMultiSelect
            value={value}
            onChange={update}
            options={selectOptions}
        />
    ),
    ...doubleMultiSelectOptions,
    label,
    description
});

export default DoubleMultiSelectFilter;
