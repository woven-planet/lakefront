import { Meta, Story } from '@storybook/react';

import Button from 'src/material-components/Button';
import { ButtonProps } from 'src/material-components/Button/Buttton';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront-Material-io/Button',
    component: Button
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const BasicButton = Template.bind({});
