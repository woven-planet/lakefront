import { ComponentPropsWithRef, FC, forwardRef, ReactNode } from 'react';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { getIcon, MESSAGE_TYPES } from './Snackbar.util';
import { StyledSnackbarContent, StyledSnackbarMessage, StyledMessageTypeIcons } from './snackbarStyles';

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

const SnackbarContent: FC<SnackbarContentProps & ComponentPropsWithRef<'div'>> = forwardRef(
    ({ action, message, type, ...props }, ref) => {
        const icon = getIcon(type);

        return (
            <ThemeProvider theme={theme}>
                <div {...props}>
                    <StyledSnackbarContent className="snackbarContent" ref={ref}>
                        <StyledSnackbarMessage className="snackbarMessage">{message}</StyledSnackbarMessage>
                        <StyledMessageTypeIcons className="snackbarIcon">{icon}</StyledMessageTypeIcons>

                        {!Array.isArray(action) && action}
                        {Array.isArray(action) && action.map((eachAction) => eachAction?.toString())}
                    </StyledSnackbarContent>
                </div>
            </ThemeProvider>
        );
    }
);

export default SnackbarContent;
