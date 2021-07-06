import { FC } from 'react';
import Filter from 'src/Filter/Filter';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import { useFilter } from 'src/Filter/util';
import { ContextSwitchMenu, FilterBar, FilterJSONConfirmationModal, FilterJSONInput } from '..';
import { FilterComponentProps } from 'src/Filter/types';
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
