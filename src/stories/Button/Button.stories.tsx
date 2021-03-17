import { Meta, Story } from '@storybook/react/types-6-0';

import Button from 'src/Button/Button';
import { ButtonComponentProps, COLORS } from 'src/Button/buttonUtil';
import ButtonsPage from './ButtonsPage';

export default {
    title: 'Lakefront/Button',
    component: Button,
    argTypes: {
        onClick: {
            action: 'clicked',
            table: {
                disable: true
            }
        },
        as: {
            control: {
                type: 'select',
                options: ['a', 'button', 'div', 'span']
            }
        },
        children: {
            name: 'text (children)',
            description: 'Usually text, but can accept other elements. If an icon is needed, use the icon prop.'
        },
        color: {
            control: {
                type: 'select',
                options: [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.DESTRUCTIVE],
            },
        },
        disabled: {
            control: 'boolean',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            },
            description: 'HTML button element disabled prop.'
        },
        icon: {
            control: {
                type: 'boolean'
            }
        }
    }
} as Meta;

// All Buttons
const AllTemplate: Story = (args) => <ButtonsPage />;

export const AllButtons = AllTemplate.bind({});

AllButtons.args = {};

const Template: Story<ButtonComponentProps> = (args) => <Button {...args} />;

// Individual Buttons (No Icon)
export const Primary = Template.bind({});
Primary.args = {
    children: 'Button',
    color: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Button',
    color: 'secondary'
};

export const Destructive = Template.bind({});
Destructive.args = {
    children: 'Button',
    color: 'destructive'
};

// Individual Buttons (With Icon)
export const PrimaryDefaultIcon = Template.bind({});
PrimaryDefaultIcon.args = {
    ...Primary.args,
    icon: true
};

export const SecondaryDefaultIcon = Template.bind({});
SecondaryDefaultIcon.args = {
    ...Secondary.args,
    icon: true
};

export const DestructiveDefaultIcon = Template.bind({});
DestructiveDefaultIcon.args = {
    ...Destructive.args,
    icon: true
};

// Icon Only Buttons
export const PrimaryIconButton = Template.bind({});
PrimaryIconButton.args = {
    children: undefined,
    color: 'primary',
    icon: true
};

export const SecondaryIconButton = Template.bind({});
SecondaryIconButton.args = {
    children: undefined,
    color: 'secondary',
    icon: true
};

export const DestructiveIconButton = Template.bind({});
DestructiveIconButton.args = {
    children: undefined,
    color: 'destructive',
    icon: true
};
