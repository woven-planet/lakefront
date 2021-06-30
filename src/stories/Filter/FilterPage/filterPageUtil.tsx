import { RadioFilter } from 'src/Filter/modules/RadioFilter';
import { StyledInput } from './filterPageStyles';

const BASE_FILTER = {
    getApiQueryUrl: (key, value) => {
        return value ? `&${key}=${encodeURIComponent(value)}` : '';
    },
    getApiPostBody: (key, value) => (value ? { [key]: value } : undefined),
    getBrowserQueryUrlValue: (value) => value,
    getDefaultFilterValue: () => '',
    isDefaultFilterValue: (value) => value === '',
    getFilterBarLabel: (value) => value,
    parseInitialFilterValue: (browserQueryUrlValue) => browserQueryUrlValue || '',
    getFilterValueFromApiPostBody: (key, apiPostBody) => apiPostBody[key] || '',
    renderComponent: ({ name, value, update }) => (
        <StyledInput key={name} placeholder={name} onChange={(e) => update(e.target.value)} value={value} />
    )
};

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
    keywords: {
        description: 'Words to include.',
        label: 'Keywords',
        ...BASE_FILTER,
        getDefaultFilterValue: () => 'lakehouse',
        parseInitialFilterValue: (browserQueryUrlValue) => browserQueryUrlValue || 'lakehouse',
        getFilterBarLabel: (value) => `Keywords: ${value}`
    },
    phrases: {
        description: 'Phrases to lookup.',
        label: 'Phrases',
        ...BASE_FILTER,
        getFilterBarLabel: (value) => `Phrases: ${value}`
    },
    direction: RadioFilter({
        initialValue: RADIO_FILTER_OPTIONS[0].value,
        defaultValue: '',
        options: RADIO_FILTER_OPTIONS,
        label: 'Direction',
        parseInitialFilterValue: (browserQueryUrlValue) => browserQueryUrlValue || RADIO_FILTER_OPTIONS[0].value,
        ...BASE_FILTER
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
