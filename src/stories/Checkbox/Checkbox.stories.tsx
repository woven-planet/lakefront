import { ChangeEvent, ComponentPropsWithoutRef, MouseEventHandler, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import CheckboxComponent, { CheckboxProps } from 'src/components/Checkbox/Checkbox';
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
            source: {
                transform: (source: string) => {
                    return source
                        .replace('onChange={function noRefCheck() {}}', '')
                        .replace(/\n/g, '')
                        .replace(/[ ]{2}/g, ' ');
                }
            }
        }
    }
} as Meta;

const Template: Story<CheckboxProps & ComponentPropsWithoutRef<'input'>> = (args) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(prevState => !prevState);
        action(`Checked changed to ${!isChecked}`)(event);
    };

    return (
        <CheckboxComponent
            checked={isChecked}
            onChange={handleClick}
            label={args.label}
            indeterminate={args.indeterminate}
            checkedIcon={args.checkedIcon}
            disabled={args.disabled}
        />
    );
};

export const Checkbox = Template.bind({});

export const CheckboxWithLabel = Template.bind({});
CheckboxWithLabel.args = {
    label: 'Checkbox'
};
