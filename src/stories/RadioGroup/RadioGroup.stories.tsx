import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import RadioGroup, { RadioGroupProps } from 'src/RadioGroup/RadioGroup';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/RadioGroup',
    component: RadioGroup,
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

const Template: Story<RadioGroupProps & ComponentPropsWithoutRef<'input'>> = (args) => {
    const [value, setValue] = useState('');

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <RadioGroup
            name={args.name}
            options={args.options}
            value={value}
            disabled={args.disabled}
            onChange={handleClick}
        />
    );
};

export const StandardRadioGroup = Template.bind({});
StandardRadioGroup.args = {
    name: 'alphabet',
    options: [
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'}
    ]
};

export const DisabledRadioGroup = Template.bind({});
DisabledRadioGroup.args = {
    name: 'alphabet',
    options: [
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'}
    ],
    disabled: true
};
