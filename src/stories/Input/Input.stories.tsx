import { Meta, Story } from '@storybook/react/types-6-0';

import Input from 'src/Input/Input';
import { ComponentPropsWithoutRef } from "react";

export default {
    title: 'Lakefront/Input',
    component: Input,
    argTypes: {
        onChange: {
            action: 'changed',
            table: {
                disable: true
            }
        },
        children: {
            table: {
                disable: true
            }
        },
        disabled: {
            control: 'boolean',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            },
            description: 'HTML input element disabled prop.'
        }
    }
} as Meta;

const Template: Story<ComponentPropsWithoutRef<'input'>> = (args) => <Input {...args} />;

export const Placeholder = Template.bind({});
Placeholder.args = {
    placeholder: 'Placeholder'
};

export const Filled = Template.bind({});
Filled.args = {
    value: 'Filled Input'
};
