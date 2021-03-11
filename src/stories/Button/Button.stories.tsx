import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';

import Button from 'Button/Button';
import { ButtonComponentProps, COLORS } from 'Button/buttonUtil';

export default {
    title: 'Example/Button',
    component: Button,
    argTypes: {
        alternate: {
            description: 'Provides an alternate color theme for use on darker backgrounds'
        },
        children: {
            name: 'text (children)'
        }
    }
} as Meta;

const Template: Story<ButtonComponentProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Button',
    color: COLORS.PRIMARY
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Button',
    color: COLORS.SECONDARY
};

export const Destructive = Template.bind({});
Destructive.args = {
    children: 'Button',
    color: COLORS.DESTRUCTIVE
};
