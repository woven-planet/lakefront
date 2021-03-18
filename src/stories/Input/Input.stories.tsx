import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import Input, { InputProps } from 'src/Input/Input';
import DocBlock from '../../../.storybook/DocBlock';

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
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<InputProps & ComponentPropsWithoutRef<'input'>> = (args) => <Input {...args} />;

export const Placeholder = Template.bind({});
Placeholder.args = {
    placeholder: 'Placeholder'
};

export const Filled = Template.bind({});
Filled.args = {
    value: 'Filled Input'
};
