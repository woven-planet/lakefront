import { Meta, Story } from '@storybook/react/types-6-0';

import FilterPage from '../components/FilterPage';
import TextFilterDocs, { TextFilterArgs } from './TextFilterDocs';
import DocBlock from '.storybook/DocBlock';
import { TextFilter as TextFilterFunction } from 'src/Filter/modules';

export default {
    title: 'Lakefront/Filter/TextFilter',
    component: TextFilterDocs,
    argTypes: {
        label: {
            control: 'text',
            description: 'The label to display for the text filter component.'
        },
        description: {
            control: 'text',
            description: 'The description/help text to display above the text filter component.'
        },
        textFilterOptions: {
            control: false
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            source: {
                code: `
const FILTERS = {
    textFilter: TextFilter(
        props.label,
        props.description,
        {
            // ...TextFilterOptions
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

// Text Filter
const TextFilterTemplate: Story = (args: TextFilterArgs) => {
    const pageFilters = {
        textFilter: TextFilterFunction(args.label, args.description, {})
    };

    return <FilterPage pageFilters={pageFilters} />;
};

export const TextFilter = TextFilterTemplate.bind({});

TextFilter.args = {
    label: 'Text Filter',
    description: 'TextFilter is a text input control meant to be used as a keyword(s) search.'
};
