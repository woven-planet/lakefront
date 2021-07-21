import { FC } from 'react';
import { createChips } from './filterSectionHeaderUtil';
import { FilterValueChipsContainer } from './filterSectionHeaderStyles';

interface FilterValueChipsProps {
    value: string | string[];
}

const FilterValueChips: FC<FilterValueChipsProps> = ({ value }) => {
    return <FilterValueChipsContainer>{createChips(value)}</FilterValueChipsContainer>;
};

export default FilterValueChips;
