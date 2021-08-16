import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import TypeaheadSearch, { TypeaheadSearchProps } from 'src/Input/TypeaheadSearch';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Input/TypeaheadSearch',
    component: TypeaheadSearch,
    argTypes: {
        children: {
            table: {
                disable: true
            }
        },
        submitSearch: {
            table: {
                disable: true
            }
        }
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<TypeaheadSearchProps> = (args) => {
    const [result, setResult] = useState<string>('');

    const submitSearch = (searchText: string) => {
        setResult(searchText);
    };

    return (
        <div style={{ height: 250, display: 'flex', justifyContent: 'center', backgroundColor: 'blue' }}>
            <TypeaheadSearch {...args} submitSearch={submitSearch}>
                {(debouncedText) => <div>{`Search for: ${result} - ${debouncedText}`}</div>}
            </TypeaheadSearch>
        </div>
    );
};

export const SearchBottomStart = Template.bind({});
SearchBottomStart.args = {
    placeholder: 'Search',
    autoFocus: true,
    placement: 'bottom-start'
};

export const SearchBottomEnd = Template.bind({});
SearchBottomEnd.args = {
    placeholder: 'Search',
};

export const InitializedSearch = Template.bind({});
InitializedSearch.args = {
    initialSearchText: 'Lakefront',
    placeholder: 'Search',
};

export const PortalRendered = Template.bind({});
PortalRendered.args = {
    initialSearchText: 'Lakefront',
    placeholder: 'Search',
    renderInPortal: true
};
