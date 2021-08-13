import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import TypeaheadSearch, { TypeaheadSearchProps } from 'src/Input/TypeaheadSearch';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Input/TypeaheadSearch',
    component: TypeaheadSearch,
    argTypes: {
        // TODO:
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
    autoFocus: true
};

export const SearchBottomEnd = Template.bind({});
SearchBottomEnd.args = {
    placeholder: 'Search',
    placement: 'bottom-end'
};

export const InitialedSearch = Template.bind({});
InitialedSearch.args = {
    initialSearchText: 'Lakefront',
    placeholder: 'Search',
    placement: 'bottom-end'
};

export const PortalRendered = Template.bind({});
PortalRendered.args = {
    initialSearchText: 'Lakefront',
    placeholder: 'Search',
    renderInPortal: true
};
