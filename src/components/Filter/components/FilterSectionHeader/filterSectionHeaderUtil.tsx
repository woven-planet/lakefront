import { FilterValueChip } from './filterSectionHeaderStyles';
import { FilterModule } from 'src/components/Filter/types';

export const DEFAULT_FILTER_COUNT = 1;

export const createChips = (value: string | string[], onClose?: () => void, item?: FilterModule<any>, showX?: boolean) => {
    const chips = Array.isArray(value) ? value : [value];

    if (!chips?.length) {
        return null;
    }
    // item?.label
    return (
        <>
            {chips.map((content: string, idx: number) => {
                if (!content) {
                    return null;
                }
                return <FilterValueChip key={`${content}-${idx}`}>
                    <div>{content}</div>
                    {showX && onClose && <span onClick={onClose}>x</span>}
                </FilterValueChip>;
            })}
        </>
    );
};

export const getFilterCount = (value: any, filter: FilterModule<any>, filterApplied: boolean) => {
    if (filter.getFilterCount) {
        return filter.getFilterCount(value);
    }

    return filterApplied ? DEFAULT_FILTER_COUNT : 0;
};
