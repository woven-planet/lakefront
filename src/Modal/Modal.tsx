import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ReactComponent as CloseIcon } from './assets/closeIcon.svg';
import Button from 'src/Button/Button';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { createPortal } from 'react-dom';

import {
    Dialog,
    DialogButtonContainer,
    DialogContainer,
    DialogContent,
    DialogDivider,
    DialogSubHeader,
    DialogTitleContainer
} from './modalStyles';

export const CANCEL_BUTTON_TEXT = 'Cancel';

export interface ModalProps {
    /**
     * The action to run when close of the modal is triggered
     * (either by the close button, cancel button, or clicking
     * an area outside the modal dialog).
     */
    handleClose?: () => void;
    /**
     * The boolean value to determine if the modal is visible or not.
     */
    isOpen: boolean;
    /**
     * The header text to display on the modal.
     * This defaults to an empty string.
     */
    headerText?: string;
    /**
     * The text to display beneath the header text on the modal.
     * This defaults to an empty string.
     */
    subHeaderText?: string;
    /**
     * The boolean value to determine whether the close icon
     * is visible or not. This defaults to `true`.
     */
    isCloseIconVisible?: boolean;
    /**
     * The primary submit/action button on the modal.
     */
    actionButton?: ReactNode;
    /**
     * The cancel button text. This defaults to `Cancel`.
     */
    cancelButtonText?: string;
    /**
     * Any valid React child.
     */
    children?: ReactNode;
    /**
     * The boolean value to determine whether a top divider shows
     * between the header and the dialog main body.
     */
    showTopDivider?: boolean;
    /**
     * The boolean value to determine whether a bottom divider shows
     * between the dialog main body and the action and cancel buttons.
     */
    showBottomDivider?: boolean;
    /**
     * The max-width of the dialog area. This width grows with the size
     * of the screen. Setting to `false` will disable `maxWidth`.
     */
    dialogWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * When true, the component will mount a div to the body and render the dialog through it.
     * This is useful when the dialog would be inside a scrollable container or one with "overflow: hidden"
     * so it doesn't get cut off. Uses IntersectionObserver and needs a polyfill if IE compatibility is needed. This
     * defaults to `false`.
     */
    renderInPortal?: boolean;
    /**
     * The classes to pass to the modal.
     */
    className?: string;
}

/**
 * Modal Component
 *
 * The Modal component is a UI blocking dialog overlay.
 * The state is not managed inside this component and visibility (via the `isOpen` prop) needs to be maintained in the parent component.
 * While the default rendering behavior is often sufficient, the `renderInPortal` prop can be used
 * to append a div to the body.
 *
 */
const Modal: FC<ModalProps> = (props) => {
    const {
        handleClose,
        isOpen,
        headerText = '',
        isCloseIconVisible = true,
        actionButton,
        cancelButtonText = CANCEL_BUTTON_TEXT,
        subHeaderText = '',
        children,
        showTopDivider = false,
        showBottomDivider = false,
        dialogWidth = 'sm',
        renderInPortal = false,
        className
    } = props;

    const handleOnClose = () => {
        if (handleClose) {
            handleClose();
        }
    };

    const [portal, setPortal] = useState<HTMLElement | null>(null);
    const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
    const [update, setUpdate] = useState<number>(0);
    const [bodyOverflow, setBodyOverflow] = useState<string>('');
    const bodyOverflowRef = useRef(false);

    useEffect(() => {
        const bodyElementHTMLCollection = document.getElementsByTagName('body');
        const bodyElement = bodyElementHTMLCollection.length > 0 ? bodyElementHTMLCollection.item(0) : null;
        let observer: IntersectionObserver;
        let portalElement: HTMLElement;

        if (renderInPortal && bodyElement) {
            portalElement = document.createElement('div');
            portalElement.onclick = (e) => {
                if (e.target !== portalElement) {
                    return;
                }
                handleOnClose();
            };

            if (!portal) {
                bodyElement.appendChild(portalElement);
            }

            if (!portal && dialogElement) {
                observer = new IntersectionObserver(() => {
                    setUpdate(new Date().getTime());
                });

                observer.observe(dialogElement);
                setPortal(portalElement);
            }
        }

        return () => {
            if (dialogElement && observer) {
                observer.unobserve(dialogElement);
            }

            if (portalElement && bodyElement && bodyElement.contains(portalElement)) {
                bodyElement.removeChild(portalElement);
            }
        };
    }, [dialogElement, renderInPortal]);

    useEffect(() => {
        if (dialogElement && portal) {
            portal.style.display = isOpen ? 'flex' : 'none';
            portal.style.backgroundColor = 'rgb(0,0,0), rgba(0,0,0,0.4)';
            portal.style.width = '100%';
            portal.style.height = '100%';
            portal.style.justifyContent = 'center';
            portal.style.alignItems = 'center';
            portal.style.position = 'fixed';
            portal.style.top = '0';
            portal.style.left = '0';
            portal.style.zIndex = `${theme?.zIndex?.modal}`;
        }
    }, [update]);

    useEffect(() => {
        if (document) {
            if (!bodyOverflowRef.current) {
                setBodyOverflow(document.body.style.overflow);
                bodyOverflowRef.current = true;
            }

            isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = bodyOverflow;
            return (() => {
                document.body.style.overflow = bodyOverflow;
            });
        }
    }, [isOpen]);


    const dialogNodeMounted = (node: HTMLDivElement) => {
        setDialogElement(node);
    };

    const dialog = useMemo(
        () => (
            <>
                {isOpen && (
                    <Dialog dialogWidth={dialogWidth} onClick={(e) => e.stopPropagation()}>
                        <DialogTitleContainer>
                            {headerText}
                            {subHeaderText && <DialogSubHeader>{subHeaderText}</DialogSubHeader>}
                            {isCloseIconVisible ? (
                                <Button
                                    className="closeIcon"
                                    aria-label="Close"
                                    onClick={handleOnClose}
                                    icon={<CloseIcon />}
                                />
                            ) : (
                                <span />
                            )}
                            {showTopDivider && <DialogDivider className="dialogDivider" />}
                        </DialogTitleContainer>
                        <DialogContent>{children}</DialogContent>
                        {showBottomDivider && <DialogDivider className="dialogDivider" />}
                        {actionButton && (
                            <DialogButtonContainer>
                                <Button color="secondary" onClick={handleOnClose}>
                                    {cancelButtonText}
                                </Button>
                                {actionButton}
                            </DialogButtonContainer>
                        )}
                    </Dialog>
                )}
            </>
        ),
        [
            children,
            headerText,
            subHeaderText,
            isCloseIconVisible,
            showTopDivider,
            showBottomDivider,
            actionButton,
            cancelButtonText
        ]
    );

    return (
        <ThemeProvider theme={theme}>
            <DialogContainer ref={dialogNodeMounted} isOpen={isOpen} className={className} onClick={handleOnClose}>
                {portal ? createPortal(dialog, portal) : dialog}
            </DialogContainer>
        </ThemeProvider>
    );
};

export default Modal;
