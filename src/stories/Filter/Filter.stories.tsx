import { Meta, Story } from '@storybook/react/types-6-0';

import FilterPage from './components/FilterPage';
import FilterComponent from 'src/Filter/Filter';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Filter',
    component: FilterComponent,
    argTypes: {
        ContextSwitchMenu: {
            control: false
        },
        FilterBar: {
            control: false
        },
        FilterJSONConfirmationModal: {
            control: false
        },
        FilterJSONInput: {
            control: false
        },
        additionalQueryParams: {
            control: false
        },
        filterHooks: {
            control: false
        },
        hideFilterBar: {
            control: {
                type: 'boolean'
            }
        },
        initialActiveSection: {
            control: {
                type: 'text'
            }
        },
        isCollapsed: {
            control: {
                type: 'boolean'
            }
        },
        isJSONInputAllowed: {
            control: {
                type: 'boolean'
            }
        },
        location: {
            control: false
        },
        onToggleCollapsed: {
            control: false
        },
        updateHistory: {
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
    hideFilterBar: false,
    isJSONInputAllowed: true
};
