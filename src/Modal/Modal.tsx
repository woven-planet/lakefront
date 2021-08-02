import { FC, ReactNode } from 'react';
import { ReactComponent as CloseIcon } from './assets/closeIcon.svg';
import Button from 'src/Button/Button';

import {
    Dialog,
    DialogButtonContainer,
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
        dialogWidth = 'sm'
    } = props;

    const handleOnClose = () => {
        if (handleClose) {
            handleClose();
        }
    };

    return (
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
    );
};

export default Modal;
