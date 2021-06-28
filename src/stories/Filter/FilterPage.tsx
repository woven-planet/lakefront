import { FC } from 'react';
import Filter from 'src/Filter/Filter';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import { useFilter } from 'src/Filter/util';
import { ContextSwitchMenu, FilterBar, FilterJSONConfirmationModal, FilterJSONInput } from './components';
import Input from 'src/Input/Input';
import { FilterComponentProps } from 'src/Filter/types';

const StyledInput = styled(Input)({
    width: '100%'
});

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

const FILTERS = {
    keywords: {
        description: 'Words to include.',
        label: 'Keywords',
        ...BASE_FILTER,
        getFilterBarLabel: (value) => `Keywords: ${value}`,
    },
    phrases: {
        description: 'Phrases to lookup.',
        label: 'Phrases',
        ...BASE_FILTER,
        getFilterBarLabel: (value) => `Phrases: ${value}`
    }
};

const LOCATION = {
    pathname: 'path',
    search: '',
    state: {
        search: ''
    },
    hash: '',
    key: 'key'
};

const DefaultWrapper = styled.div(({ theme }) => ({
    backgroundColor: theme.colors.white,
    fontFamily: '"Source Sans Pro", sans-serif',
    margin: 0,
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'center',
    border: theme.borders.primary
}));

const PageBody = styled.div(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: theme.colors.gunpowder,
    backgroundColor: theme.colors.akoya,
    fontSize: 20,
    height: 300
}));

const FilterPage: FC<FilterComponentProps> = (props) => {
    const location = { ...LOCATION };
    const updateHistory = () => null;
    const filterHooks = useFilter(FILTERS, props.isJSONInputAllowed, location, updateHistory);

    return (
        <ThemeProvider theme={theme}>
            <DefaultWrapper>
                <Filter
                    ContextSwitchMenu={ContextSwitchMenu}
                    FilterBar={FilterBar}
                    FilterJSONConfirmationModal={FilterJSONConfirmationModal}
                    FilterJSONInput={FilterJSONInput}
                    {...props}
                    filterHooks={filterHooks}
                    location={location}
                    updateHistory={updateHistory}
                >
                    <PageBody>
                        <div>Modify filters in the left pane.</div>
                    </PageBody>
                </Filter>
            </DefaultWrapper>
        </ThemeProvider>
    );
};
export default FilterPage;
