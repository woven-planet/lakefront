import { ChangeEvent, ComponentPropsWithoutRef, MouseEventHandler, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import RadioGroupComponent, { RadioButtonProps } from 'src/RadioGroup/RadioGroup';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/RadioGroup',
    component: RadioGroupComponent,
    argTypes: {
        onChange: {
            control: false
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            transformSource: (source: string) => {
                return source
                    .replace('onChange={function noRefCheck() {}}', '')
                    .replace(/\n/g, '')
                    .replace(/[ ]{2}/g, ' ');
            },
        }
    }
} as Meta;

const Template: Story<RadioButtonProps & ComponentPropsWithoutRef<'input'>> = (args) => {
    const [value, setValue] = useState('');

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <RadioGroupComponent
            onChange={handleClick}
            name={args.name}
            options={args.options}
            label={args.label}
            disabled={args.disabled}
            value={value}
        />
    );
};

export const RadioGroup = Template.bind({});
RadioGroup.args = {
    name: 'alphabet',
    options: [
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'}
    ]
};
