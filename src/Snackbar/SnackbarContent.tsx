import { ComponentPropsWithRef, FC, forwardRef, LegacyRef, ReactNode } from 'react';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { getIcon, MESSAGE_TYPES } from './Snackbar.util';
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
  type: MESSAGE_TYPES;

}

export type SnackbarContentClassKey = 'root' | 'message' | 'action';

     const SnackbarContent: FC<SnackbarContentProps & ComponentPropsWithRef<'div'>> = forwardRef(({ action, message, type }, ref) => {

    const icon = getIcon(type);

    return (
        <ThemeProvider theme={theme}>
            <StyledSnackbarContent className='snackbarContent' ref={ref}>
            <StyledSnackbarMessage>
            {message}
            </StyledSnackbarMessage>
              <StyledMessageTypeIcons >{icon}</StyledMessageTypeIcons> 
           
              {!Array.isArray(action) && action}
              {/* { Array.isArray(action) && action.map(eachAction) => eachAction} */}
              
            </StyledSnackbarContent>
                            
        </ThemeProvider>
    );

});

export default SnackbarContent;
