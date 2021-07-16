import { FC, MouseEventHandler } from 'react';
import { FilterModule } from 'src/Filter/types';
import { ReactComponent as Add } from 'src/Filter/assets/add.svg';
import { ReactComponent as Remove } from 'src/Filter/assets/remove.svg';

interface FilterSectionHeaderProps {
    activeSection?: string;
    filter: FilterModule<any>;
    key: string;
    onClick?: MouseEventHandler<HTMLHeadingElement>;
}

const FilterSectionHeader: FC<FilterSectionHeaderProps> = ({ activeSection = '', filter, key, onClick }) => {
    return (
        <h3 onClick={onClick}>
            {filter.label}
            {activeSection !== key ? <Add aria-label="add" /> : <Remove aria-label="remove" />}
        </h3>
    );
};

export default FilterSectionHeader;
