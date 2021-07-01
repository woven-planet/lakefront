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

export const FILTERS = {
    keywords: {
        description: 'Words to include.',
        label: 'Keywords',
        ...BASE_FILTER,
        getDefaultFilterValue: () => 'lakefront',
        parseInitialFilterValue: (browserQueryUrlValue) => browserQueryUrlValue || 'lakefront',
        getFilterBarLabel: (value) => `Keywords: ${value}`
    },
    phrases: {
        description: 'Phrases to lookup.',
        label: 'Phrases',
        ...BASE_FILTER,
        getFilterBarLabel: (value) => `Phrases: ${value}`
    }
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
