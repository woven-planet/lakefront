import { RadioFilter } from 'src/Filter/modules';

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
    radioFilter: RadioFilter({
        label: 'Radio Filter',
        defaultValue: '',
        initialValue: RADIO_FILTER_OPTIONS[0].value,
        options: RADIO_FILTER_OPTIONS,
        description: 'RadioFilter is a radio group control meant to single select a value.'
    })
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