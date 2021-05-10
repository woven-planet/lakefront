import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import DocBlock from '.storybook/DocBlock';
import Toggle, { ToggleOption, ToggleProps } from 'src/Toggle/Toggle';

export default {
    title: 'Lakefront/Toggle',
    component: Toggle,
    argTypes: {
        onChange: {
            action: 'changed',
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

const toggleOptions: ToggleOption[] = [
    {
        name: 'First',
        value: 'first'
    },
    {
        name: 'Second',
        value: 'second'
    }
];

const Template: Story<ToggleProps> = (args) => {
    const [selected, setSelected] = useState(toggleOptions[0].value);
    const handleChange = (value: string) => {
        setSelected(value);
    };

    return (
        <Toggle {...args} value={selected} onChange={handleChange} />
    );
}

export const ToggleComponent = Template.bind({});
ToggleComponent.args = {
    options: toggleOptions
};
