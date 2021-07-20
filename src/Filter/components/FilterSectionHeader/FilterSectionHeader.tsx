import { FC, MouseEventHandler } from 'react';
import { FilterModule } from 'src/Filter/types';
import { ReactComponent as Add } from 'src/Filter/assets/add.svg';
import { ReactComponent as Remove } from 'src/Filter/assets/remove.svg';
import { ClearButton, FilterActions, FilterBadge, FilterDetails, FilterSectionHeaderContainer } from './filterSectionHeaderStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

interface FilterSectionHeaderProps {
    activeSection?: string;
    filter: FilterModule<any>;
    key: string;
    onClick?: MouseEventHandler<HTMLHeadingElement>;
}

const FilterSectionHeader: FC<FilterSectionHeaderProps> = ({ activeSection = '', filter, key, onClick }) => {
    return (
        <ThemeProvider theme={theme}>
            <FilterSectionHeaderContainer onClick={onClick}>
                <FilterDetails>
                    {filter.label}
                    <FilterBadge>
                        <div>10</div>
                    </FilterBadge>
                </FilterDetails>
                <FilterActions>
                    <ClearButton />
                    {activeSection !== key ? <Add aria-label="add" /> : <Remove aria-label="remove" />}
                </FilterActions>
            </FilterSectionHeaderContainer>
        </ThemeProvider>
    );
};

export default FilterSectionHeader;
