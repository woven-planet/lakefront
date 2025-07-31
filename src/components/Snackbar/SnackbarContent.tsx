import { ComponentPropsWithRef, FC, forwardRef, ReactNode } from 'react';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { getIcon, MESSAGE_TYPES } from './Snackbar.util';
import { StyledSnackbarContent, StyledSnackbarMessage, StyledMessageTypeIcons } from './snackbarStyles';

export interface SnackbarContentProps {
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action?: ReactNode;
    /**
     * The message to display.
     */
    message?: ReactNode;
    /**
     * Message types used to determine icon color and icon to render.
     */
    type: MESSAGE_TYPES;

    alt?: boolean;
}

const SnackbarContent: FC<SnackbarContentProps & ComponentPropsWithRef<'div'>> = forwardRef(
    ({ action, message, type, alt, ...props }, ref) => {
        const icon = getIcon(type);

        return (
            <ThemeProvider theme={theme}>
                <div { ...props}>
                    <StyledSnackbarContent className="snackbarContent" ref={ref} alt={alt}>
                        <StyledSnackbarMessage className="snackbarMessage" alt={alt}>{message}</StyledSnackbarMessage>
                        <StyledMessageTypeIcons className="snackbarIcon">{icon}</StyledMessageTypeIcons>
                        {action}
                    </StyledSnackbarContent>
                </div>
            </ThemeProvider>
        );
    }
);

export default SnackbarContent;
