import { Meta, Story } from '@storybook/react/types-6-0';
import SnackbarComponent, { SnackbarProps } from 'src/Snackbar/index';
import DocBlock from '.storybook/DocBlock';
import Button from 'src/Button/Button';
import { MESSAGE_TYPES } from 'src/Snackbar/Snackbar.util';
import { SnackbarWrapper } from 'src/Snackbar/snackbarStyles';
import { Icon } from 'src/Toggle/toggleStyles';
import { Children, SyntheticEvent, useState } from 'react';
import SnackbarContent, { SnackbarContentProps } from 'src/Snackbar/SnackbarContent';

export default {
    title: 'Lakefront/Snackbar',
    component: SnackbarComponent,
    argTypes: {
        handleClick: {
            action: 'clicked'
        },
        children: {
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

const Template: Story<SnackbarProps> = (args) => (
    <div>
        <SnackbarComponent {...args}>
            <SnackbarContent {...args}/> 
        </SnackbarComponent>
    </div>
);


export const Snackbar = Template.bind({});

Snackbar.args = {
    open: true,
     message: 'File transfer initiated.',
     type: MESSAGE_TYPES.SUCCESS
};
