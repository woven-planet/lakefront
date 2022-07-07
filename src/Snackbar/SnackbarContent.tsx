import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import Button from 'src/Button/Button';
import { Icon } from 'src/Toggle/toggleStyles';
import {  getColor, getIcon, MESSAGE_TYPES, SnackbarCloseReason } from './Snackbar.util';
import { colors } from 'react-select/src/theme';
import IconButton from 'src/Button/IconButton';
import { StyledSnackbarContent, StyledSnackbarMessage, StyledSnackbarButton } from './snackbarStyles';

export interface SnackbarContentProps {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: ReactNode | ReactNode[];
  /**
   * The message to display.
   */
  message?: ReactNode;
}


export type SnackbarContentClassKey = 'root' | 'message' | 'action';

     const SnackbarContent: FC<SnackbarContentProps> = ({ action, message }) => {
        
    return (
        <ThemeProvider theme={theme}>
            <div>
             <StyledSnackbarContent>
            {<StyledSnackbarMessage>{message}</StyledSnackbarMessage>}
            {/* <Icon style={{ color }}>{icon}</Icon>  */}
              {!Array.isArray(action) && action}
              {Array.isArray(action) && action}
              {/* { Array.isArray(action) && action.map(eachAction) => eachAction} */}
            </StyledSnackbarContent>
                            
            </div>
        </ThemeProvider>
    );
};

export default SnackbarContent;
