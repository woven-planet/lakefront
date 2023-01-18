import { FilterValueChip, FilterValueHeaderChip, SvgCloseStyles } from './filterSectionHeaderStyles';
import { FilterModule } from 'src/components/Filter/types';
import { ReactComponent as CloseIcon } from './assets/closeIcon.svg';
import  Button from 'src/components/Button/Button';

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

                return <FilterValueChip key={`${content}-${idx}`}><div>{content} </div></FilterValueChip>;
            })}
        </>
    );
};

export const createHeaderChips = (value: string | string[]) => {
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

                return (
                    <FilterValueHeaderChip key={`${content}-${idx}`}>
                        <div>{content} </div>
                    </FilterValueHeaderChip>
                );
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
