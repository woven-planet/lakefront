import { Meta, Story } from '@storybook/react/types-6-0';

import FilterPage from '../components/FilterPage';
import RadioFilterDocs, { RadioFilterArgs } from './RadioFilterDocs';
import DocBlock from '.storybook/DocBlock';
import { RadioFilter as RadioFilterFunction } from 'src/Filter/modules';

export default {
    title: 'Lakefront/Filter/RadioFilter',
    component: RadioFilterDocs,
    argTypes: {
        label: {
            control: 'text',
            description: 'The label to display for the radio filter component.'
        },
        initialValue: {
            control: 'text',
            description: 'The value to the radio filter starts with selected.'
        },
        defaultValue: {
            control: 'text',
            description: 'The default value when there is no value selected.'
        },
        options: {
            control: 'array',
            description: 'The list of options to choose from in the radio filter.'
        },
        radioFilterOptions: {
            control: false
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            source: {
                code: `
const FILTERS = {
    radioFilter: RadioFilter(
        {
            props.label,
            props.initialValue,
            props.defaultValue,
            props.options,
            {
                // ...RadioFilterOptions
            }
        }
    )
};
const location = {};
const updateHistory = () => null;
const filterHooks = useFilter(FILTERS, true, location, updateHistory);
return (
    <ThemeProvider theme={theme}>
        <DefaultWrapper>
            <Filter
                {...props}
                filterHooks={filterHooks}
                location={location}
                updateHistory={updateHistory}
            >
                <PageBody>
                    <UrlPreview queryParams={filterHooks.filterUrl.substring(1)} />
                    <div>Modify filters in the left pane.</div>
                </PageBody>
            </Filter>
        </DefaultWrapper>
    </ThemeProvider>
);
                `
            }
        }
    }
} as Meta;

const RADIO_FILTER_OPTIONS = [
    {
        label: 'North',
        value: 'north'
    },
    {
        label: 'East',
        value: 'east'
    },
    {
        label: 'South',
        value: 'south'
    },
    {
        label: 'West',
        value: 'west'
    }
];

// Radio Filter
const RadioFilterTemplate: Story = (args: RadioFilterArgs) => {
    const pageFilters = {
        radioFilter: RadioFilterFunction({args.initialValue, args.defaultValue, args.label,, args.options})
    };

    return <FilterPage pageFilters={pageFilters} />;
};

export const RadioFilter = RadioFilterTemplate.bind({});

RadioFilter.args = {
    label: 'Radio Filter',
    initialValue: RADIO_FILTER_OPTIONS[0].value,
    defaultValue: '',
    options: RADIO_FILTER_OPTIONS
};