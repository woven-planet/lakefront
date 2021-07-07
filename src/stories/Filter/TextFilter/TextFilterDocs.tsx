import { FC } from 'react';
import { TextFilterOptions } from 'src/Filter/types';
import { createFilterSourceCode } from 'src/stories/Filter/filterStoriesUtil';

export interface TextFilterArgs {
    /**
     * The label to display for the text filter component.
     */
    label: string;
    /**
     * The description/help text to display above the text filter component.
     */
    description?: string;
    /**
     * Any valid `FilterModule` property (excluding description and label)
     * which will override default text filter behaviour.
     */
    textFilterOptions?: TextFilterOptions;
}

/**
 * Example of text filter source code.
 */
 export const TEXT_FILTER_SOURCE_CODE = createFilterSourceCode(`{
    textFilter: TextFilter(
        'Text Filter',
        'TextFilter is a text input control meant to be used as a keyword(s) search. (Tab or Enter to apply)',
        {
            getDefaultFilterValue: () => '',
            ...additionalTextFilterOptions
        }
    )
}`);

/**
 * TextFilter Component
 * 
 * The TextFilter component is a text input control meant to be used as a keyword(s) search. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding description and label) can
 * be supplied via the `textFilterOptions` parameter to change how the filter looks and acts.
 */
const TextFilterDocs: FC<TextFilterArgs> = () => null;

export default TextFilterDocs;
