import { FilterValueChip } from './filterSectionHeaderStyles';

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
