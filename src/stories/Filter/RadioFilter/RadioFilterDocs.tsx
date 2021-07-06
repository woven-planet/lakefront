import { FC } from 'react';
import { RadioFilterOptions, RadioFilterProps } from 'src/Filter/types';

export interface RadioFilterArgs {
    /**
     * The props required to be supplied as the first argument of
     * the RadioFilter component.
     */
    radioFilterProps: RadioFilterProps;
    /**
     * Any valid `FilterModule` property (excluding description and label)
     * which will override default radio filter behaviour.
     */
    radioFilterOptions?: RadioFilterOptions;
}

/**
 * RadioFilter Component
 *
 * The RadioFilter component is a filter by use of radio group. While the default
 * behaviour should suffice, any valid `FilterModule` property (excluding label) can
 * be supplied via the `radioFilterOptions` parameter to change how the filter looks and acts.
 */
const RadioFilterDocs: FC<RadioFilterArgs> = () => null;

export default RadioFilterDocs;
