import { FC } from 'react';
import { createChips } from './filterSectionHeaderUtil';
import { FilterValueChipsContainer } from './filterSectionHeaderStyles';
import { FilterModule } from '../../types';

interface FilterValueChipsProps {
    value: string | string[];
    visible?: boolean;
    item?: FilterModule<any>;
    notDefaultValues?: boolean;
    name: string;
    clearFilter(name: string, value?: any): void;
}

const FilterValueChips: FC<FilterValueChipsProps> = ({ value, visible, name, clearFilter, item, notDefaultValues }) => {
    if (!visible) {
        return null;
    }


    return (
        <FilterValueChipsContainer>
            {createChips(value, name, clearFilter, item, notDefaultValues)}
        </FilterValueChipsContainer>
    );
};

export default FilterValueChips;
