import { Meta, Story } from '@storybook/react/types-6-0';

import CheckboxComponent, { CheckboxProps } from 'src/Checkbox/Checkbox';
import { ComponentPropsWithoutRef } from "react";

export default {
    title: 'Lakefront/Checkbox',
    component: CheckboxComponent,
    argTypes: {
        checked: {
            control: false,
            description: 'The initial value to control whether the checkbox should be checked or not.'
        },
        checkedIcon: {
            table: {
                disable: true
            },
            description: 'The svg icon to display when checked is true. If left undefined, a check mark will be displayed.'
        },
        indeterminate: {
            control: 'boolean',
            description: 'A display state in which it is unknown whether checked should be true or false.'
        },
        label: {
            control: 'text',
            description: 'The (optional) text label for the checkbox.',
        },
        disabled: {
            control: 'boolean',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            },
            description: 'HTML input element disabled prop.'
        },
        onChange: {
            control: false,
            description: 'The action that should be run when the checked state changes.'
        },
        // Included to properly trigger storybook action console
        onClick: {
            action: 'clicked',
            table: {
                disable: true
            }
        },
    }
} as Meta;

const Template: Story<CheckboxProps & ComponentPropsWithoutRef<'input'>> = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});

export const CheckboxWithLabel = Template.bind({});
CheckboxWithLabel.args = {
    label: 'Checkbox'
};
