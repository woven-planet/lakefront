import { FC } from 'react';
import { createChips, createHeaderChips } from './filterSectionHeaderUtil';
import { FilterValueChipsContainer, SvgCloseStyles } from './filterSectionHeaderStyles';
import { FilterModule } from '../../types';

interface FilterValueChipsProps {
    value: string | string[];
    visible?: boolean;
    item: FilterModule<any>;
    clearFilter(name: string, clearPartial?: boolean): void;
}

const FilterValueChips: FC<FilterValueChipsProps> = ({ value, visible, clearFilter, item }) => {
    if (!visible) {
        return null;
    }

    const handleCloseIcon = () => {
        clearFilter(item.label, false);
    };
    console.log('value', value);

    const itemLabel = item.getFilterBarLabel(value);
    const itemFilterLabelValues = item.getFilterSectionLabel(value);

    return (
            <FilterValueChipsContainer>
                {createChips(value)}
                { !item.required && value && !item.getDefaultFilterValue() && createHeaderChips(value) && <span onClick={handleCloseIcon}> x</span>}
            </FilterValueChipsContainer>


    );
};

export default FilterValueChips;
