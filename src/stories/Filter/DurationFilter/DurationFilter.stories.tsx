import { Meta, StoryFn } from '@storybook/react-webpack5';

import FilterPage from '../components/FilterPage';
import DurationFilterDocs, { DurationFilterArgs, DURATION_FILTER_SOURCE_CODE } from './DurationFilterDocs';
import DocBlock from '.storybook/DocBlock';
import { DurationFilter as DurationFilterFunction } from 'src/components/Filter/modules';

export default {
    title: 'Lakefront/Filter/DurationFilter',
    component: DurationFilterDocs,
    argTypes: {
        label: {
            control: 'text',
            description: 'The label to display for the duration filter component.'
        },
        description: {
            control: 'text',
            description: 'The description/help text to display above the duration filter component.'
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            source: {
                code: DURATION_FILTER_SOURCE_CODE
            }
        }
    }
} as Meta;

// Duration Filter
const DurationFilterTemplate: StoryFn = (args: DurationFilterArgs) => {
    console.log("args:", args);
    const pageFilters = {
        durationFilter: DurationFilterFunction({ ...args })
    };

    return <FilterPage pageFilters={pageFilters} />;
};

export const DurationFilter = DurationFilterTemplate.bind({});

DurationFilter.args = {
    label: 'Duration Filter',
    description: 'Duration Filter is a input control to be used to filter according to the minimum and maximum input.'
};
