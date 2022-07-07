import { ThemeProvider } from '@emotion/react';
import { FC, SyntheticEvent, useState, ReactNode } from 'react';
import Button from 'src/Button/Button';
import theme from 'src/styles/theme';
import { Icon } from 'src/Toggle/toggleStyles';
import { getColor, getIcon, MESSAGE_TYPES, SnackbarCloseReason, SnackbarOrigin } from './Snackbar.util';
import SnackbarContent, { SnackbarContentProps } from './SnackbarContent';
import { SnackbarWrapper } from './snackbarStyles';


  
export interface SnackbarProps {
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action?: ReactNode | ReactNode[];
    // action?: string;
    /**
     * The anchor of the `Snackbar`.
     */
    anchorOrigin?: SnackbarOrigin;
    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. `onClose` should then set the state of the `open`
     * prop to hide the Snackbar. This behavior is disabled by default with
     * the `null` value.
     */
    autoHideDuration?: number;
    /**
     * The message to display.
     */
    message: string;
    /**
     * Replace the `SnackbarContent` component.
     */
    // children: React.ReactElement<any, any>;
    /**
     * Callback fired when the component requests to be closed.
     * Typically `onClose` is used to set state in the parent component,
     * which is used to control the `Snackbar` `open` prop.
     * The `reason` parameter can optionally be used to control the response to `onClose`,
     * for example ignoring `clickaway`.
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`.
     */
    onClose: () => {};
    /**
     * If `true`, `Snackbar` is open.
     */
    open: boolean;
    type: MESSAGE_TYPES;
}

 const Snackbar: FC<SnackbarProps> = ({ 
        anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
        open,
        children = { action: '', message: '' },
        autoHideDuration,
        onClose,
        action,
        message,
        type
    }) => {
 

if (open) {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarWrapper
                anchorOrigin={anchorOrigin}
                open={open}
                >
               {<SnackbarContent
                action={action}
                message={message}
                />}
            </SnackbarWrapper>
        </ThemeProvider>
    );
}
return null;
};

export default Snackbar;
