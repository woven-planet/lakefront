import { FC, useRef, useState, useEffect } from 'react';
import { getFilterAppliedCount } from 'src/components/Filter/util';
import { FilterBarProps, FilterModule } from 'src/components/Filter/types';
import { FilterBarContainer } from './filterBarStyles';

interface FilterItemProps {
    clearFilter?(name: string): void;
    name: string;
    item: FilterModule<any>;
    value: any;
}

export const FilterItem: FC<FilterItemProps> = (props) => {
    const { name, clearFilter, item, value } = props;

    const handleCloseIcon = () => {
      clearFilter ? clearFilter(name) : undefined;
    };

    if (item.isDefaultFilterValue(value)) {
        return null;
    }

    const itemLabel = item.getFilterBarLabel(value);

    return (
        <div className="filterItem">
            <span className="filterItemLabel">{itemLabel}</span>
            {!item.required && <div className="filterItemClose" onClick={handleCloseIcon}>x</div>}
        </div>
    );
};

const FilterBar: FC<FilterBarProps> = (props) => {
    const { filters, filterValues, clearFilter, clearAllFilter } = props;
    const [isMinimized, setMinimized] = useState(false);
    const filterBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMinimized(false);
        setTimeout(() => {
            // overflow occurring, set bar to minimized
            if (filterBarRef.current && filterBarRef.current.scrollHeight > 60) {
                setMinimized(true);
            }
        }, 150);
    }, [filterValues]);

    const filterKeys = Object.keys(filters);
    const filterCount = getFilterAppliedCount(filters, filterValues);

    return (
        <FilterBarContainer className="filterBar" ref={filterBarRef}>
            {isMinimized ? (
                <div className="filterItem">{filterCount} Filters Applied</div>
            ) : (
                <>
                    {filterKeys.map((key) => (
                        <FilterItem
                            key={key}
                            name={key}
                            item={filters[key]}
                            value={filterValues[key]}
                            clearFilter={clearFilter}
                        />
                    ))}
                </>
            )}

            {filterCount > 0 && (
                <span onClick={clearAllFilter} className="clearAll">
                    Clear All
                </span>
            )}
        </FilterBarContainer>
    );
};

export default FilterBar;
