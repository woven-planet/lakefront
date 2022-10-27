import { FC } from 'react';
import { createChips } from './filterSectionHeaderUtil';
import { FilterValueChipsContainer } from './filterSectionHeaderStyles';

interface FilterValueChipsProps {
    value: string | string[];
    visible?: boolean;
}

const FilterValueChips: FC<FilterValueChipsProps> = ({ value, visible }) => {
    if (!visible) {
        return null;
    }

    return <FilterValueChipsContainer>{createChips(value)}</FilterValueChipsContainer>;
};

export default FilterValueChips;
