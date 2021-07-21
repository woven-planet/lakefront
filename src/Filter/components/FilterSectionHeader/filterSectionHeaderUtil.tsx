import { FilterValueChip } from './filterSectionHeaderStyles';
import { FilterModule } from 'src/Filter/types';

export const DEFAULT_FILTER_COUNT = 1;

export const createChips = (value: string | string[]) => {
    const chips = Array.isArray(value) ? value : [value];

    if (!chips?.length) {
        return null;
    }

    return (
        <>
            {chips.map((content: string, idx: number) => {
                if (!content) {
                    return null;
                }

                return <FilterValueChip key={`${content}-${idx}`}>{content}</FilterValueChip>;
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
