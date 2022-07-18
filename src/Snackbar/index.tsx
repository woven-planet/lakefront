import { ThemeProvider } from '@emotion/react';
import { FC, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import theme from 'src/styles/theme';
import { MESSAGE_TYPES, SnackbarCloseReason, SnackbarOrigin } from './Snackbar.util';
import SnackbarContent from './SnackbarContent';
import { SnackbarWrapper } from './snackbarStyles';

export interface SnackbarProps {
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action?: ReactNode | ReactNode[];
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
    autoHideDuration?: number | null;
    /**
     * The message to display.
     */
    message?: string;
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
    onClose?: (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason) => void;
    /**
     * If `true`, `Snackbar` is open.
     */
    open?: boolean;
    /**
     * Message types used to determine icon color and icon to render.
     */
    type: MESSAGE_TYPES;
}

 const Snackbar: FC<SnackbarProps> = ({ 
        anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
        open,
        autoHideDuration = 4000,
        onClose,
        action,
        message,
        type
    }) => {
 
        const snackbarContentRef = useRef<HTMLDivElement | null>(null);


useEffect(() => {
setTimeout(() => {
    if (snackbarContentRef.current) {
        console.log('snackbarContentRef.current', snackbarContentRef.current);

        const newClass = open ? 'snackbarOpen' : 'snackbarClosed';
        console.log('newClass', newClass);

       snackbarContentRef.current.className = `${ snackbarContentRef.current.className} ${newClass}`;

    //    if (!open){
    //     snackbarContentRef.current.removeAttribute('snackbarOpen');
    //    }
    //    if (open){
    //     snackbarContentRef.current.removeAttribute('snackbarClosed');
    //    }
    }
}, 0);
}, [open]);

// if (open) {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarWrapper>
            <SnackbarContent ref={snackbarContentRef}
                action={action}
                message={message}
                type={type}
                />  
            </SnackbarWrapper>
        </ThemeProvider>
    );
    // }
    // return null;
};

export default Snackbar;
