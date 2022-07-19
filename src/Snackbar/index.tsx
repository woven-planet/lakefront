import { ThemeProvider } from '@emotion/react';
import { FC, ReactNode, useEffect, useRef } from 'react';
import theme from 'src/styles/theme';
import { MESSAGE_TYPES, SnackbarCloseReason, SnackbarOrigin } from './Snackbar.util';
import SnackbarContent from './SnackbarContent';
import { SnackbarWrapper, TRANSITION_TIME } from './snackbarStyles';

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
     * the `null` value. If left undefined will auto hide after 4000ms.
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
     * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`.
     */
    onClose?: (reason: SnackbarCloseReason) => void;
    /**
     * If `true`, `Snackbar` is open.
     */
    open: boolean;
    /**
     * Message types used to determine icon color and icon to render.
     */
    type: MESSAGE_TYPES;
}

 const Snackbar: FC<SnackbarProps> = ({ 
        anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
        open,
        autoHideDuration,
        onClose,
        action,
        message,
        type
    }) => {
 
        const snackbarContentRef = useRef<HTMLDivElement | null>(null);
        const toggleSnackbarOpen = (callback?: () => void) => {
            if (snackbarContentRef.current) {
                console.log('snackbarContentRef.current', snackbarContentRef.current);
    const isOpen = snackbarContentRef.current.classList.contains('snackbarOpen');

                const newClass = !isOpen ? 'snackbarOpen' : 'snackbarClosed';
                console.log('newClass init', newClass);
    
                if (newClass === 'snackbarOpen') {
                    snackbarContentRef.current.classList.remove('snackbarClosed');
                    console.log('newClass if 1', newClass);
                }
                if (newClass === 'snackbarClosed') {
                    snackbarContentRef.current.classList.remove('snackbarOpen');
                    console.log('newClass if 2', newClass);
                }
    
                snackbarContentRef.current.className = `${snackbarContentRef.current.className} ${newClass}`;
                if (callback) {
                    setTimeout(() => {
                        callback();
                    }, TRANSITION_TIME);
                }
            }
        };

        useEffect(() => {
            toggleSnackbarOpen();
            let hideDuration = autoHideDuration;
            // allow user to disable autoHideDuration
            if (hideDuration === null) {
               return;
            }
            // allow user to default autoHideDuration to 4000ms
            if (hideDuration === undefined) {
                hideDuration = 4000;
            }
            const timer = setTimeout(() => {
                toggleSnackbarOpen(() => {
                    if (onClose) {
                    onClose('timeout');
                    }
                });
               
            }, hideDuration);
            return () => {
                clearTimeout(timer);
            };
        }, [open, autoHideDuration]);


if (!open) {
    return null;
}

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
};

export default Snackbar;
