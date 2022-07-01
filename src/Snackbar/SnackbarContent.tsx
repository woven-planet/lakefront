import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import Button from 'src/Button/Button';
import { Icon } from 'src/Toggle/toggleStyles';
import {  getColor, getIcon, MESSAGE_TYPES, SnackbarCloseReason } from './Snackbar.util';
import { colors } from 'react-select/src/theme';
import { ReactComponent as CloseIcon } from './assets/closeIcon.svg';
import IconButton from 'src/Button/IconButton';

export interface SnackbarContentProps {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: ReactNode;
  /**
   * The message to display.
   */
  message?: ReactNode;

  type: MESSAGE_TYPES;

  onClose: () => void;
}


export type SnackbarContentClassKey = 'root' | 'message' | 'action';

 const SnackbarContent: FC<SnackbarContentProps> = ({ action, message, type, onClose }) => {

    const color = getColor(type);
    const icon = getIcon(type);

    return (
        <ThemeProvider theme={theme}>
            <div>
                {
                    (message = (
                        <div>
                            <div>{message}</div>
                            {/* <Icon style={{ color }}>{icon}</Icon> */}
                        </div>
                    ))
                }
                {
                    (action = (
                            <Button
                                  style={{ display: 'flex', width: 150, justifyContent: 'flex-end' }}
                                  key="close"
                                  aria-label="Close"
                                  onClick={onClose}
                              >
                            <CloseIcon />
                            </Button>
                    ))
                }
            </div>
        </ThemeProvider>
    );
};

export default SnackbarContent;
