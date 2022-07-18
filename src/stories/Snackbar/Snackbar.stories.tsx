import { Meta, Story } from '@storybook/react/types-6-0';
import SnackbarComponent, { SnackbarProps } from 'src/Snackbar/index';
import DocBlock from '.storybook/DocBlock';
import Button from 'src/Button/Button';
import { MESSAGE_TYPES, SnackbarCloseReason, } from 'src/Snackbar/Snackbar.util';
import { StyledSnackbarButton } from 'src/Snackbar/snackbarStyles';
import { SyntheticEvent, useState, useEffect, useRef } from 'react';
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
    const [showMsg, setShowMsg] = useState<boolean>(false);

        const showMessage = (_value: boolean) => {
             setShowMsg((prevState) => !prevState);
        };
        
        const handleClose = (_event: SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
                if (reason === 'clickaway') {
                    return;
                }
                showMessage(false);
            };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMsg(false);
        }, 6000);
        return () => {
            clearTimeout(timer);
        };
    }, [showMsg]);


const button = <Button style={{
    alignSelf: 'center',
    transform: 'scale(0.85)'
    }}
    alternate className='closeIcon'
    key='close'
    aria-label='Close'
    onClick={handleClose}
    icon={<CloseIcon />} 
    />;


return (
    <>
      <StyledSnackbarButton onClick={() => showMessage(true)}>
          <p>Click to view snackbar </p>
      </StyledSnackbarButton>

      {showMsg && <SnackbarComponent {...args} action = {button} open = {showMsg} />}
      {!showMsg && <SnackbarComponent type={undefined} open={false} />}

      {/* <SnackbarComponent {...args} action = {button} open = {showMsg} /> */}
    </>
);
};

export const Snackbar = Template.bind({});

Snackbar.args = {
    message: 'File transfer initiated.',
    type: MESSAGE_TYPES.SUCCESS
};
