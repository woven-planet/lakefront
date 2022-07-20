import { ThemeProvider } from '@emotion/react';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SelectPopoverItem, StyledSelectPopover } from 'src/SelectPopover/selectPopoverStyles';
import theme from 'src/styles/theme';
import { generateAnchorOrigin, MESSAGE_TYPES, SnackbarCloseReason, SnackbarOrigin } from './Snackbar.util';
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
    open?: boolean;
    /**
     * Message types used to determine icon color and icon to render.
     */
    type: MESSAGE_TYPES;
    
    renderInPortal: boolean;
}

 const Snackbar: FC<SnackbarProps> = ({
     //TODO: add portal to use anchorOrigin to put snackbar on bottom left
        anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
        open,
        autoHideDuration,
        onClose,
        action,
        message,
        type,
        renderInPortal = false
    }) => {
 
        const snackbarContentRef = useRef<HTMLDivElement | null>(null);
        const toggleSnackbarOpen = (callback?: () => void) => {
            console.log('inside toggle', snackbarContentRef.current);
            if (snackbarContentRef.current) {
                const isOpen = snackbarContentRef.current.classList.contains('snackbarOpen');
                const newClass = !isOpen ? 'snackbarOpen' : 'snackbarClosed';

                if (newClass === 'snackbarOpen') {
                    snackbarContentRef.current.classList.remove('snackbarClosed');
                }

                if (newClass === 'snackbarClosed') {
                    snackbarContentRef.current.classList.remove('snackbarOpen');
                }
    
                snackbarContentRef.current.className = `${snackbarContentRef.current.className} ${newClass}`;
                if (callback) {
                    setTimeout(() => {
                        console.log('in setTimeout', snackbarContentRef.current);
                        callback();
                    }, 195);
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
                //4000
                hideDuration = 1000000;
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



        // NOTE: Portal stuff
        const [portal, setPortal] = useState<HTMLElement | null>(null);
        const [popoverElement, setPopoverElement] = useState<HTMLElement | null>(null);
        const [update, setUpdate] = useState<number>(0);

        useEffect(() => {
            const bodyElementHTMLCollection = document.getElementsByTagName('body');
            const bodyElement = bodyElementHTMLCollection.length > 0 ? bodyElementHTMLCollection.item(0) : null;
            let observer: IntersectionObserver;
            let portalElement: HTMLElement;
    
                if (renderInPortal && bodyElement) {
                    console.log('bodyElement', bodyElement);
                portalElement = document.createElement('div');
    
                if (!portal) {
                    bodyElement.appendChild(portalElement);
                }
    
                if (!portal && popoverElement) {
                    observer = new IntersectionObserver(
                        () => {
                            setUpdate(new Date().getTime());
                        }
                    );
                    observer.observe(popoverElement);
                    setPortal(portalElement);
                }
            }
    
            return () => {
                if (popoverElement && observer) {
                    console.log('unobserve');
                    observer.unobserve(popoverElement);
                }
    
                if (portalElement && bodyElement && bodyElement.contains(portalElement)) {
                    console.log('removeChild');
                    bodyElement.removeChild(portalElement);
                }
            };
        }, [popoverElement, renderInPortal]);

        useEffect(() => {
            if (popoverElement && portal) {
                const { left, bottom, width } = popoverElement.getBoundingClientRect();
                
                generateAnchorOrigin(anchorOrigin, portal);

                portal.style.position = 'absolute';

                portal.style.left = '0%' || '50%' || '100%';

                portal.style.left = `${left + (width / 2)}px`;
                portal.style.top = `${bottom + window.scrollY}px`;
            }
        }, [update]);

   

        const popoverNodeMounted = (node: HTMLDivElement) => {
            setPopoverElement(node);
        };

        const popover = useMemo(
            () => {
                console.log('in useMemo open', open);
                return (
                    <>
                        {open && (
                            <div>
                                <SnackbarContent
                                id='snackbar-content'
                                ref={snackbarContentRef}
                                action={action}
                                message={message}
                                type={type}
                                />
                            </div>
                        )}
                    </>
                );
            },
            [open]
        );


if (!open) {
    return null;
}

    return (
        <ThemeProvider theme={theme}>
            <SnackbarWrapper className='snackbarWrapper' ref={popoverNodeMounted}>
                 {   portal && anchorOrigin ? (
                        createPortal(popover, portal)
                    ) : (
                        popover
                    )}
            </SnackbarWrapper>
        </ThemeProvider>
    );
};

export default Snackbar;
