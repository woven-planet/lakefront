import { ListFilter, MultiSelectFilter, RadioFilter, SingleSelectFilter, TextFilter } from 'src/Filter/modules';
import { listFilterOptions } from 'src/stories/Filter/ListFilter/listFilterUtil';

export const MULTI_SELECT_FILTER_OPTIONS = [
    {
        label: 'colors',
        value: 'colors'
    },
    {
        label: 'sizes',
        value: 'sizes'
    },
    {
        label: 'shapes',
        value: 'shapes'
    }
];

export const SINGLE_SELECT_FILTER_OPTIONS = [
    {
        label: 'Red',
        value: 'red'
    },
    {
        label: 'Green',
        value: 'green'
    },
    {
        label: 'Blue',
        value: 'blue'
    }
];

const RADIO_FILTER_OPTIONS = [
    {
        label: 'North',
        value: 'north'
    },
    {
        label: 'East',
        value: 'east'
    },
    {
        label: 'South',
        value: 'south'
    },
    {
        label: 'West',
        value: 'west'
    }
];

export const FILTERS = {
    multiSelectFilter: MultiSelectFilter(
        {
            label: 'Multi Select Filter',
            creatable: true,
            initialValue: ['colors'],
            options: MULTI_SELECT_FILTER_OPTIONS,
            description: 'MultiSelectFilter is a select dropdown control meant to multi select a value.'
        },
        {
            getDefaultFilterValue: () => ['colors']
        }
    ),
    listFilter: ListFilter(
        listFilterOptions,
        'List Filter',
        'ListFilter is a checkbox group control meant to be used for multiple filter value combinations.'
    ),
    radioFilter: RadioFilter(
        {
            label: 'Radio Filter',
            defaultValue: '',
            initialValue: RADIO_FILTER_OPTIONS[0].value,
            options: RADIO_FILTER_OPTIONS,
            description: 'RadioFilter is a radio group control meant to single select a value.'
        },
        {
            getFilterBarLabel: (value: string) => `Radio Filter: ${value}`
        }
    ),
    singleSelectFilter: SingleSelectFilter({
        label: 'Single Select Filter',
        selectPlaceholderLabel: 'Select a color',
        filterLabelPrefix: 'Single Select Filter',
        options: SINGLE_SELECT_FILTER_OPTIONS,
        description: 'SingleSelectFilter is a select dropdown control meant to single select a value.'
    }),
    textFilter: TextFilter(
        'Text Filter',
        'TextFilter is a text input control meant to be used as a keyword(s) search. (Tab or Enter to apply)',
        {
            getDefaultFilterValue: () => 'lakefront',
            parseInitialFilterValue: (browserQueryUrlValue: string): string => browserQueryUrlValue || 'lakefront',
            getFilterBarLabel: (value: string) => `Text Filter: ${value}`
        }
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
