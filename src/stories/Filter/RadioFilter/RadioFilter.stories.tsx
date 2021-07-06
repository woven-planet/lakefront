import { Meta, Story } from '@storybook/react/types-6-0';

import FilterPage from '../components/FilterPage';
import RadioFilterDocs, { RadioFilterArgs } from './RadioFilterDocs';
import DocBlock from '.storybook/DocBlock';
import { RadioFilter as RadioFilterFunction } from 'src/Filter/modules';

export default {
    title: 'Lakefront/Filter/RadioFilter',
    component: RadioFilterDocs,
    argTypes: {
        radioFilterProps: {
            control: {
                type: 'object'
            },
            description: 'The props required to be supplied as the first argument of the RadioFilter component.'
        },
        radioFilterOptions: {
            control: false,
            description:
                'Any valid `FilterModule` property (excluding description and label) which will override default radio filter behaviour.'
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            source: {
                code: `
const FILTERS = {
    radioFilter: RadioFilter(
        props.radioFilterOptions
        {
            // ...RadioFilterOptions
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
        radioFilter: RadioFilterFunction(args.radioFilterProps, {})
    };

    return <FilterPage pageFilters={pageFilters} />;
};

export const RadioFilter = RadioFilterTemplate.bind({});

RadioFilter.args = {
    radioFilterProps: {
        label: 'Radio Filter',
        initialValue: RADIO_FILTER_OPTIONS[0].value,
        defaultValue: '',
        options: RADIO_FILTER_OPTIONS,
        description: 'RadioFilter is a radio group control meant to single select a value.'
    }
};
