import { FC, MouseEventHandler } from 'react';
import { FilterSectionHeaderProps } from 'src/components/Filter/types';
import { ReactComponent as Add } from '../../assets/add.svg';
import { ReactComponent as Remove } from '../../assets/remove.svg';
import {
    ClearButton,
    FilterActions,
    FilterBadge,
    FilterDetails,
    FilterSectionHeaderContainer
} from './filterSectionHeaderStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import FilterValueChips from './FilterValueChips';
import { getFilterCount } from './filterSectionHeaderUtil';

const FilterSectionHeader: FC<FilterSectionHeaderProps> = ({
    activeSection = '',
    clearFilter,
    filter,
    name,
    onClick,
    value,
    badgeThreshold,
    children
}) => {
    const handleClear: MouseEventHandler<SVGElement> = (event) => {
        event.stopPropagation();
        clearFilter(name);
    };

    const filterApplied = !filter.isDefaultFilterValue(value);
    const filterCount = getFilterCount(value, filter, filterApplied);
    const showChips = filterCount < badgeThreshold;

    return (
        <ThemeProvider theme={theme}>
            <FilterSectionHeaderContainer onClick={onClick}>
                <FilterDetails>
                    {filter.label}
                    {!showChips && (
                        <FilterBadge>
                            <div>{filterCount}</div>
                        </FilterBadge>
                    )}
                </FilterDetails>
                <FilterActions>
                    {filterApplied && <ClearButton onClick={handleClear} aria-label="clear" />}
                    {activeSection !== name ? <Add aria-label="add" /> : <Remove aria-label="remove" />}
                </FilterActions>
            </FilterSectionHeaderContainer>
            {
                children ?? (
                    <FilterValueChips visible={showChips} value={filter.getFilterSectionLabel(value)} />
                )
            }
        </ThemeProvider>
    );
};

export default FilterSectionHeader;
