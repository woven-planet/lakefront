import { FC } from 'react';
import Filter from 'src/Filter/Filter';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import { useFilter } from 'src/Filter/util';
import { ContextSwitchMenu, FilterBar, FilterJSONConfirmationModal, FilterJSONInput, UrlPreview } from '../components';
import { FilterComponentProps, FilterSet } from 'src/Filter/types';
import { DefaultWrapper, PageBody } from './filterPageStyles';
import { FILTERS, LOCATION } from './filterPageUtil';

interface FilterPageProps {
    pageFilters?: FilterSet;
}

const FilterPage: FC<Pick<FilterComponentProps, 'isJSONInputAllowed' | 'hideFilterBar'> & FilterPageProps> = (
    props
) => {
    const {
        pageFilters = FILTERS
    } = props;
    const location = { ...LOCATION };
    const updateHistory = () => null;
    const filterHooks = useFilter(pageFilters, props.isJSONInputAllowed, location, updateHistory);

    return (
        <ThemeProvider theme={theme}>
            <DefaultWrapper>
                <Filter
                    {...props}
                    ContextSwitchMenu={ContextSwitchMenu}
                    FilterBar={FilterBar}
                    FilterJSONConfirmationModal={FilterJSONConfirmationModal}
                    FilterJSONInput={FilterJSONInput}
                    filterHooks={filterHooks}
                    location={location}
                    updateHistory={updateHistory}
                >
                    <PageBody>
                        <UrlPreview queryParams={filterHooks.filterUrl.substring(1)} />
                        <div>Modify filters in the left pane.</div>
                    </PageBody>
                </Filter>
            </DefaultWrapper>
        </ThemeProvider>
    );
};

export default FilterPage;
