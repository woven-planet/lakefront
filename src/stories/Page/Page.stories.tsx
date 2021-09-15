import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import PageComponent, { PageProps } from 'src/Page/Page';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Page',
    component: PageComponent,
    argTypes: {
        children :{
            table: {
                disable: true
            }
        },
        className : {
            type: 'string'
        }
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<PageProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    return(
        <PageComponent className={args.className}>
            {args.children}
        </PageComponent>
    )
}

export const Page = Template.bind({});
Page.args = {
    children: <div>The page content goes here...</div>
};
