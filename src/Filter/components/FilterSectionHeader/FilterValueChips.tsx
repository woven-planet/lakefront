import { FC } from 'react';
import { createChips } from './filterSectionHeaderUtil';

interface FilterValueChipsProps {
    value: string | string[];
}

const FilterValueChips: FC<FilterValueChipsProps> = ({ value }) => {
    return createChips(value);
};

export default FilterValueChips;
