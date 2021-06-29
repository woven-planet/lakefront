import { FC, useRef, useState, useEffect } from 'react';

import { getFilterAppliedCount } from 'src/Filter/util';
import { FilterBarProps, FilterModule } from 'src/Filter/types';
import styled from '@emotion/styled';

interface FilterItemProps {
    clearFilter(name: string): void;
    name: string;
    item: FilterModule<any>;
    value: any;
}

const FilterBarContainer = styled.div(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottom: `1px solid ${theme.colors.selago}`,
    padding: '0 1rem',
    '.filterItem': {
        borderRadius: 2,
        border: `solid 1px ${theme.colors.selago}`,
        backgroundColor: '$akoya',
        color: theme.colors.gunpowder,
        padding: '4px 6px',
        display: 'inline-flex',
        marginRight: 8,
        alignItems: 'center',
        '.filterItemLabel': {
            maxWidth: 325,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        '.filterItemClose': {
            borderLeft: `1px solid ${theme.colors.pavement}`,
            marginLeft: 8,
            paddingLeft: 8,
            fontSize: 20,
            cursor: 'pointer'
        }
    },
    '.clearAll': {
        color: theme.colors.saturatedBlue,
        cursor: 'pointer'
    }
}));

export const FilterItem: FC<FilterItemProps> = (props) => {
    const { name, clearFilter, item, value } = props;

    const handleCloseIcon = () => {
        clearFilter(name);
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
