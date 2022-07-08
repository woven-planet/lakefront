import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import Button from 'src/Button/Button';
import { Icon } from 'src/Toggle/toggleStyles';
import {  getColor, getIcon, MESSAGE_TYPES, SnackbarCloseReason } from './Snackbar.util';
import IconButton from 'src/Button/IconButton';
import { StyledSnackbarContent, StyledSnackbarMessage, StyledSnackbarButton, StyledMessageTypeIcons } from './snackbarStyles';

export interface SnackbarContentProps {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: ReactNode | ReactNode[];
  /**
   * The message to display.
   */
  message?: ReactNode;
    /**
    * Message types used to determine icon color and icon to render.
    */
  type?: MESSAGE_TYPES;
}



export type SnackbarContentClassKey = 'root' | 'message' | 'action';

     const SnackbarContent: FC<SnackbarContentProps> = ({ action, message, type }) => {

    const icon = getIcon(type);

    return (
        <ThemeProvider theme={theme}>
            <StyledSnackbarContent>
            <StyledSnackbarMessage>
            {message}
            </StyledSnackbarMessage>
              <StyledMessageTypeIcons >{icon}</StyledMessageTypeIcons> 
           
              {!Array.isArray(action) && action}
              {/* { Array.isArray(action) && action.map(eachAction) => eachAction} */}
              
            </StyledSnackbarContent>
                            
        </ThemeProvider>
    );
};

export default SnackbarContent;
