
import { Meta, Story } from '@storybook/react/types-6-0';

import FilterPage from './FilterPage';
import FilterComponent from 'src/Filter/Filter';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Filter',
    component: FilterComponent,
    argTypes: {
        checked: {
            control: false
        },
        checkedIcon: {
            table: {
                disable: true
            }
        },
        onChange: {
            control: false
        }
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

// All Filters
const AllTemplate: Story = (args) => <FilterPage {...args} />;

export const AllFilters = AllTemplate.bind({});

AllFilters.args = {
    hideFilterBar: false
};
