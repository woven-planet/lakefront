import { FC } from 'react';
import { createChips } from './filterSectionHeaderUtil';
import { FilterValueChipsContainer } from './filterSectionHeaderStyles';
import { FilterModule } from '../../types';

interface FilterValueChipsProps {
    value: string | string[];
    visible?: boolean;
    label?: FilterModule<any>['label'];
    notDefaultValues?: boolean;
    name: string;
    resetFilter?(name: string, value?: any): void;
}

const FilterValueChips: FC<FilterValueChipsProps> = ({ value, visible, name, resetFilter, label, notDefaultValues }) => {
    if (!visible) {
        return null;
    }

    return (
        <FilterValueChipsContainer>
            {createChips(value, name, resetFilter, label, notDefaultValues)}
        </FilterValueChipsContainer>
    );
};

export default FilterValueChips;
