import { Meta, Story } from '@storybook/react/types-6-0';

import FilterPage from '../components/FilterPage';
import DocBlock from '.storybook/DocBlock';
import { ListFilter as ListFilterFunction } from 'src/Filter/modules';
import ListFilterDocs, { LIST_FILTER_SOURCE_CODE, ListFilterArgs } from './ListFilterDocs';

export default {
    title: 'Lakefront/Filter/ListFilter',
    component: ListFilterDocs,
    argTypes: {
        label: {
            control: 'text',
            description: 'The label to display for the text filter component.'
        },
        description: {
            control: 'text',
            description: 'The description/help text to display above the text filter component.'
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            source: {
                code: LIST_FILTER_SOURCE_CODE
            }
        }
    }
} as Meta;

// ListFilter
const ListFilterTemplate: Story = (args: ListFilterArgs) => {
    const pageFilters = {
        textFilter: ListFilterFunction(args.label, args.description, {})
    };

    return <FilterPage pageFilters={pageFilters} />;
};

export const ListFilter = ListFilterTemplate.bind({});

ListFilter.args = {
    label: 'List Filter',
    description: 'ListFilter is a checkbox group control meant to be used for multiple filter value combinations.'
};
