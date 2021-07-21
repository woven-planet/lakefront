import { FilterValueChip } from './filterSectionHeaderStyles';

export const createChips = (value: string | string[]) => {
    const chips = Array.isArray(value) ? value : [value];

    if (!chips?.length) {
        return null;
    }

    return (
        <>
            {chips.map((content: string) => {
                if (!content) {
                    return null;
                }

                return (
                    <FilterValueChip>{content}</FilterValueChip>
                );
            })}
        </>
    );
};
