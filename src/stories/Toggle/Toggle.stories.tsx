import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import DocBlock from '.storybook/DocBlock';
import ToggleComponent, { ToggleOption, ToggleProps } from 'src/Toggle/Toggle';

export default {
    title: 'Lakefront/Toggle',
    component: ToggleComponent,
    argTypes: {
        onChange: {
            action: 'changed',
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

const toggleOptions: ToggleOption<string>[] = [
    {
        name: 'First',
        value: 'first'
    },
    {
        name: 'Second',
        value: 'second'
    }
];



const Template: Story<ToggleProps<string>> = (args) => {
    const [selected, setSelected] = useState(toggleOptions[0].value);
    const handleChange = (value: string) => {
        setSelected(value);

        args.onChange(value);
    };

    return (
        <ToggleComponent
            options={args.options}
            disabled={args.disabled}
            position={args.position}
            value={selected}
            onChange={handleChange}
        />
    );
};

export const Toggle = Template.bind({});
Toggle.args = {
    options: toggleOptions
};
