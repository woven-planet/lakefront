import { Meta, Story } from '@storybook/react/types-6-0';
import SnackbarComponent, { SnackbarProps } from 'src/Snackbar/index';
import DocBlock from '.storybook/DocBlock';
import { MESSAGE_TYPES } from 'src/Snackbar/Snackbar.util';
import { StyledSnackbarButton } from 'src/Snackbar/snackbarStyles';
import { useState } from 'react';

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

const Template: Story<SnackbarProps> = (args) => {
    const [showMsg, setShowMsg] = useState<boolean>(false);

    const showMessage = (value: boolean) => {
        setShowMsg(value);
    };

    const handleClose = () => {
        showMessage(false);
    };

    return (
        <>
            <StyledSnackbarButton onClick={() => showMessage(true)}>
                <p>Click to view snackbar </p>
            </StyledSnackbarButton>

            <SnackbarComponent {...args} open={showMsg} onClose={handleClose} />
        </>
    );
};

export const Snackbar = Template.bind({});

Snackbar.args = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    renderInPortal: true,
    message: 'File transfer initiated.',
    type: MESSAGE_TYPES.SUCCESS
};
