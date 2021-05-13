import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import LoadingComponent, { LoadingProps } from 'src/Loading/Loading';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Loading',
    component: LoadingComponent,
    argTypes: {
    },
    parameters: {
        docs: {
            page: DocBlock,
        }
    }
} as Meta;

const Template: Story<LoadingProps & ComponentPropsWithoutRef<'div'>> = (args) => {

    return (
        <LoadingComponent
        />
    );
};

//export const Loading = Template.bind({});

export const LoadingWithLabel = Template.bind({});
LoadingWithLabel.args = {
    label: 'I am loading'
};
