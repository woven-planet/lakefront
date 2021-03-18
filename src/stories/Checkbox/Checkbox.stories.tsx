import { ComponentPropsWithoutRef } from "react";
import { Meta, Story } from '@storybook/react/types-6-0';

import CheckboxComponent, { CheckboxProps } from 'src/Checkbox/Checkbox';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Checkbox',
    component: CheckboxComponent,
    argTypes: {
        checked: {
            control: false
        },
        checkedIcon: {
            table: {
                disable: true
            }
        },
        onChange: {
            control: false
        },
        // onClick included to properly trigger storybook action console
        onClick: {
            action: 'changed',
            table: {
                disable: true
            }
        },
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<CheckboxProps & ComponentPropsWithoutRef<'input'>> = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});

export const CheckboxWithLabel = Template.bind({});
CheckboxWithLabel.args = {
    label: 'Checkbox'
};
