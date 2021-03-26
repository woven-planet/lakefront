import { ComponentPropsWithoutRef, MouseEventHandler, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import CheckboxComponent, { CheckboxProps } from 'src/Checkbox/Checkbox';
import DocBlock from '.storybook/DocBlock';
import { action } from '@storybook/addon-actions';

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
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            transformSource: (source: string) => {
                return source
                    .replace('onClick={function noRefCheck() {}}', '')
                    .replace(/\n/g, '')
                    .replace(/[ ]{2}/g, ' ');
            },
        }
    }
} as Meta;

const Template: Story<CheckboxProps & ComponentPropsWithoutRef<'input'>> = (args) => {
    const [isChecked, setIsChecked] = useState(false);
    
    const handleClick = (event: MouseEventHandler<HTMLInputElement>) => {
        setIsChecked(!isChecked);
        action(`Checked changed to ${!isChecked}`)(event);
    };

    return (
        <CheckboxComponent checked={isChecked} onClick={handleClick} {...args} />
    );
};

export const Checkbox = Template.bind({});

export const CheckboxWithLabel = Template.bind({});
CheckboxWithLabel.args = {
    label: 'Checkbox'
};
