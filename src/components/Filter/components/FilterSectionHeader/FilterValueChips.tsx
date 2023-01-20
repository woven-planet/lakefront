import { FC } from 'react';
import { createChips } from './filterSectionHeaderUtil';
import { FilterValueChip, FilterValueChipsContainer } from './filterSectionHeaderStyles';
import { FilterModule } from '../../types';

interface FilterValueChipsProps {
    value: string | string[];
    visible?: boolean;
    item: FilterModule<any>;
    notDefaultValues?: boolean;

    clearFilter(name: string | string[], clearPartial?: boolean): void;
}

const FilterValueChips: FC<FilterValueChipsProps> = ({ value, visible, clearFilter, item, notDefaultValues }) => {
    if (!visible) {
        return null;
    }

    const handleCloseIcon = () => {
        clearFilter(value, true);
    };


    return (
        <FilterValueChipsContainer>
            {createChips(value, handleCloseIcon, item, notDefaultValues)}
        </FilterValueChipsContainer>
    );
};

export default FilterValueChips;
