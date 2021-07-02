import { FC } from 'react';
import { RadioFilterOptions } from 'src/Filter/types';

export interface RadioFilterArgs {
    /**
     * The label to display for the radio filter component.
     */
    label: string;
    /**
     * The value the radio filter starts with.
     */
    initialValue: string;
    /**
     * The default value when there is no value selected.
     */
    defaultValue: string;
    /**
     * The list of options to choose from in the radio filter.
     */
    options: {
        label: string;
        value: string;
    }[];
    /**
     * Any valid `FilterModule` property (excluding description and label)
     * which will override default radio filter behaviour.
     */
    radioFilterOptions?: RadioFilterOptions;
}

/**
 * `RadioFilter` is a filter by use of radio group. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding description and label) can
 * be supplied via the `radioFilterOptions` parameter to change how the filter looks and acts.
 */
const RadioFilterDocs: FC<RadioFilterArgs> = () => null;

export default RadioFilterDocs;