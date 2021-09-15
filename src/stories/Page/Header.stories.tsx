import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import HeaderComponent from 'src/Page/Header';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Header',
    component: HeaderComponent,
    argTypes: {
        children :{
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

const Template: Story<ComponentPropsWithoutRef<'div'>> = (args) => {
    return(
        <HeaderComponent>
            {args.children}
        </HeaderComponent>
    )
}

export const Header = Template.bind({});
Header.args = {
    children: <div>The header goes here.</div>
};
