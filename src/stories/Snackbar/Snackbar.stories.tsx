import { Meta, Story } from '@storybook/react/types-6-0';
import SnackbarComponent, { SnackbarProps } from 'src/Snackbar/index';
import DocBlock from '.storybook/DocBlock';
import Button from 'src/Button/Button';
import { MESSAGE_TYPES } from 'src/Snackbar/Snackbar.util';
import { SnackbarWrapper } from 'src/Snackbar/snackbarStyles';
import { Icon } from 'src/Toggle/toggleStyles';
import { Children, SyntheticEvent, useState } from 'react';
import SnackbarContent, { SnackbarContentProps } from 'src/Snackbar/SnackbarContent';
import { ReactComponent as CloseIcon } from './assets/closeIcon.svg';

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
    // const color = getColor(type);
    // const icon = getIcon(type);
    const [showMsg, setShowMsg] = useState<boolean>(false);
        
        const showMessage = (value: boolean) => {
            setShowMsg(value);
        };
        
          const handleClose = (_event: SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
                if (reason === 'clickaway') {
                    return;
                }
                showMessage(false);
            };

const button = <Button style={{
    alignSelf: 'center',
    transform: 'scale(0.85)'
    }}
    alternate className="closeIcon"
    key="close"
    aria-label="Close"
    onClick={handleClose}
    icon={<CloseIcon />} 
    />;

return (
    <>
        <Button alternate onClick={() => showMessage(true)}>
        <p>Click to view snackbar </p>
        </Button>
       
       <SnackbarComponent {...args} action = {button} open = {showMsg} />
      </>   
)
};


export const Snackbar = Template.bind({});

Snackbar.args = {
     message: 'File transfer initiated.',
     type: MESSAGE_TYPES.SUCCESS
};
