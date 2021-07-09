import { FC } from 'react';
import { TextFilterOptions } from 'src/Filter/types';
import { createFilterSourceCode } from 'src/stories/Filter/filterStoriesUtil';
import { ListFilterOptions } from '../../../Filter/modules/ListFilter/ListFilter';
import { CheckboxGroupOption } from '../../../CheckboxGroup/CheckboxGroup';

export interface ListFilterArgs {
    /**
     * Array of objects for the checkboxes to show for the filter.
     */
    options: CheckboxGroupOption[],
    /**
     * The label to display for the text filter component.
     */
    label: string;
    /**
     * The description/help text to display above the text filter component.
     */
    description?: string;
    /**
     * Additional options for the list filter behavior.
     */
    listFilterOptions: ListFilterOptions
}

/**
 * Example of list filter source code.
 */
 export const LIST_FILTER_SOURCE_CODE = createFilterSourceCode(`{
    textFilter: ListFilter(
        'List Filter',
        'ListFilter is a checkbox group control meant to be used as a keyword(s) search. (Tab or Enter to apply)',
        {
            getDefaultFilterValue: () => '',
            ...additionalTextFilterOptions
        }
    )
}`);

/**
 * ListFilter Component
 *
 * The ListFilter component is a checkbox control meant to be used as a keyword(s) search. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding description and label) can
 * be supplied via the `textFilterOptions` parameter to change how the filter looks and acts.
 */
const ListFilterDocs: FC<ListFilterArgs> = () => null;

export default ListFilterDocs;
