import { FilterLabels, FilterValueChip } from './filterSectionHeaderStyles';
import { FilterModule } from 'src/components/Filter/types';
import { ReactComponent as CloseIcon } from 'src/components/Modal/assets/closeIcon.svg';

export const DEFAULT_FILTER_COUNT = 1;

export const createChips = (values: string | string[], name: string, onClose?: (name: string, value: any) => void, label?: FilterModule<any>['label'], showX?: boolean) => {
    const chips = Array.isArray(values) ? values : [values];

    if (!chips?.length) {
        return null;
    }

    return (
        <>
            {chips.map((content: string, idx: number) => {
                if (!content) {
                    return null;
                }

                return <FilterValueChip key={`${content}-${idx}`}>
                    <div>
                        {content}
                    </div>
                    <FilterLabels>{label}</FilterLabels>
                    {showX && onClose && <span onClick={() => onClose(name, content)}><CloseIcon/></span>}
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
