import { ListFilter, TextFilter } from 'src/Filter/modules';
import { listFilterOptions } from 'src/stories/Filter/ListFilter/listFilterUtil';

export const FILTERS = {
    textFilter: TextFilter(
        'Text Filter',
        'TextFilter is a text input control meant to be used as a keyword(s) search. (Tab or Enter to apply)',
        {
            getDefaultFilterValue: () => 'lakefront',
            parseInitialFilterValue: (browserQueryUrlValue: string): string => browserQueryUrlValue || 'lakefront',
            getFilterBarLabel: (value: string) => `Text Filter: ${value}`
        }
    ),
    listFilter: ListFilter(
        listFilterOptions,
        'List Filter',
        'ListFilter is a checkbox group control meant to be used for multiple filter value combinations.'
    )
};

export const LOCATION = {
    pathname: 'path',
    search: '',
    state: {
        search: ''
    },
    hash: '',
    key: 'key'
};
