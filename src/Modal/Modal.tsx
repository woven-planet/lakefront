import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
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
    DialogDividerBottom,
    DialogDividerTop,
    DialogSubHeader,
    DialogTitleContainer
} from './modalStyles';

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
     * between the header and the dialogue main body.
     */
    showTopDivider?: boolean;
    /**
     * The boolean value to determine whether a bottom divider shows
     * between the dialogue main body and the action and cancel buttons.
     */
    showBottomDivider?: boolean;
    /**
     * The max-width of the dialog area. This width grows with the size
     * of the screen. Setting to `false` will disable `maxWidth`.
     */
    dialogWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * When true, the component will mount a div to the body and render the dialogue through it.
     * This is useful when the dialogue would be inside a scrollable container or one with "overflow: hidden"
     * so it doesn't get cut off. Uses IntersectionObserver and needs a polyfill if IE compatibility is needed. This
     * defaults to `false`.
     */
    renderInPortal?: boolean;
}

const Modal: FC<ModalProps> = (props) => {
    const {
        handleClose,
        isOpen,
        headerText = '',
        isCloseIconVisible = true,
        actionButton,
        cancelButtonText = 'Cancel',
        subHeaderText = '',
        children,
        showTopDivider = false,
        showBottomDivider = false,
        dialogWidth = 'sm',
        renderInPortal = false
    } = props;

    const handleOnClose = () => {
        if (handleClose) {
            handleClose();
        }
    };

    const [portal, setPortal] = useState<HTMLElement | null>(null);
    const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
    const [update, setUpdate] = useState<number>(0);

    useEffect(() => {
        const bodyElementHTMLCollection = document.getElementsByTagName('body');
        const bodyElement = bodyElementHTMLCollection.length > 0 ? bodyElementHTMLCollection.item(0) : null;
        let observer: IntersectionObserver;

        if (renderInPortal && bodyElement) {
            const portalElement = document.createElement('div');

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

            if (portal && bodyElement && bodyElement.contains(portal)) {
                bodyElement.removeChild(portal);
            }
        };
    }, [dialogElement]);

    useEffect(() => {
        if (dialogElement && portal) {
            portal.style.position = 'absolute';
            portal.style.left = '50%';
            portal.style.top = '50%';
        }
    }, [update]);

    const dialogueNodeMounted = (node: HTMLDivElement) => {
        setDialogElement(node);
    };

    const dialogue = useMemo(
        () => (
            <>
                {isOpen && (
                    <Dialog isOpen={isOpen} dialogWidth={dialogWidth}>
                        <DialogTitleContainer>
                            {headerText}
                            {subHeaderText && <DialogSubHeader>{subHeaderText}</DialogSubHeader>}
                            {isCloseIconVisible ? (
                                <Button aria-label="Close" onClick={handleOnClose} icon={<CloseIcon />} />
                            ) : (
                                <span />
                            )}
                            {showTopDivider && <DialogDividerTop />}
                        </DialogTitleContainer>
                        <DialogContent>
                            {children}
                            {showBottomDivider && <DialogDividerBottom />}
                            {actionButton && (
                                <DialogButtonContainer>
                                    <Button color="secondary" onClick={handleOnClose}>
                                        {cancelButtonText}
                                    </Button>
                                    {actionButton}
                                </DialogButtonContainer>
                            )}
                        </DialogContent>
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
            <DialogContainer ref={dialogueNodeMounted}>{portal ? createPortal(dialogue, portal) : dialogue}</DialogContainer>
        </ThemeProvider>
    );
};

export default Modal;
