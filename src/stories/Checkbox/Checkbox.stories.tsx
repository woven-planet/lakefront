import { Meta, Story } from '@storybook/react/types-6-0';

import CheckboxComponent, { CheckboxProps } from 'src/Checkbox/Checkbox';
import { ComponentPropsWithoutRef } from "react";

export default {
    title: 'Lakefront/Checkbox',
    component: CheckboxComponent,
    argTypes: {
        onClick: {
            action: 'clicked',
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

const Template: Story<CheckboxProps & ComponentPropsWithoutRef<'input'>> = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});

export const CheckboxWithLabel = Template.bind({});
CheckboxWithLabel.args = {
    label: 'Checkbox'
};
