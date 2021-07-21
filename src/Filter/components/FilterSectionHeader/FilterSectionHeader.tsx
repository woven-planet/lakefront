import { FC, MouseEventHandler } from 'react';
import { FilterModule } from 'src/Filter/types';
import { ReactComponent as Add } from 'src/Filter/assets/add.svg';
import { ReactComponent as Remove } from 'src/Filter/assets/remove.svg';
import { ClearButton, FilterActions, FilterBadge, FilterDetails, FilterSectionHeaderContainer } from './filterSectionHeaderStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import FilterValueChips from './FilterValueChips';

interface FilterSectionHeaderProps {
    activeSection?: string;
    filter: FilterModule<any>;
    name: string;
    value: any;
    onClick?: MouseEventHandler<HTMLHeadingElement>;
    clearFilter: (name: string) => void;
}

const FilterSectionHeader: FC<FilterSectionHeaderProps> = ({ activeSection = '', clearFilter, filter, name, onClick, value }) => {
    const handleClear: MouseEventHandler<SVGElement> = (event) => {
        event.stopPropagation();
        clearFilter(name);
    };

    return (
        <ThemeProvider theme={theme}>
            <FilterSectionHeaderContainer onClick={onClick}>
                <FilterDetails>
                    {filter.label}
                    <FilterBadge>
                        <div>{filter.getFilterCount ? filter.getFilterCount(value) : 1}</div>
                    </FilterBadge>
                </FilterDetails>
                <FilterActions>
                    <ClearButton onClick={handleClear} />
                    {activeSection !== name ? <Add aria-label="add" /> : <Remove aria-label="remove" />}
                </FilterActions>
            </FilterSectionHeaderContainer>
            <FilterValueChips value={filter.getFilterSectionLabel(value)} />
        </ThemeProvider>
    );
};

export default FilterSectionHeader;
