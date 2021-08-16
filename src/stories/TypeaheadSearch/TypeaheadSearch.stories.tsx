import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import TypeaheadSearch, { TypeaheadSearchProps } from 'src/Input/TypeaheadSearch';
import DocBlock from '.storybook/DocBlock';
import { TypeaheadResultItem } from 'src/Input/TypeaheadSearch/TypeaheadResults';

const LAKEFRONT_NAMES = [
    'L',
    'La',
    'Lak',
    'Lake',
    'Lakefront',
    'Lakers',
    'Lakes',
    'Lakeside',
    'l',
    'la',
    'lak',
    'lake',
    'lakefront',
    'lakers',
    'lakes',
    'lakeside'
];

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

    const fetchResults = (searchText: string) => {
        return new Promise<TypeaheadResultItem[]>((res, rej) => {
            setTimeout(() => {
                let response = [];

                if (searchText === 'error') {
                    rej('An error was thrown');
                }

                if (LAKEFRONT_NAMES.join().includes(searchText)) {
                    response = LAKEFRONT_NAMES.map((value) => ({ label: value, value })).filter(({ value }) =>
                        value.includes(searchText)
                    );
                }

                res(response);
            }, 100);
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {!args.children && (
                <>
                    <div style={{ width: 300, marginBottom: 8 }}>
                        Type the word <strong>lake</strong> to demo results.
                    </div>
                    <div style={{ width: 300, marginBottom: 8 }}>
                        Type the word <strong>error</strong> to demo error state.
                    </div>
                </>
            )}
            <div style={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                <TypeaheadSearch {...args} submitSearch={submitSearch} fetchResults={fetchResults} />
            </div>
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
    placeholder: 'Search'
};

export const InitializedWithCustomSearch = Template.bind({});
InitializedWithCustomSearch.args = {
    initialSearchText: 'Lakefront',
    placeholder: 'Search',
    children: (debouncedText: string) => <div>{`Custom Search: ${debouncedText}`}</div>
};

export const PortalRendered = Template.bind({});
PortalRendered.args = {
    initialSearchText: 'Lakefront',
    placeholder: 'Search',
    renderInPortal: true
};
