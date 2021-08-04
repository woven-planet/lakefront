import { FC, ReactElement } from 'react';
import Modal from 'src/Modal/Modal';
import { ReactComponent as ErrorIcon } from './assets/errorIcon.svg';
import Button from 'src/Button/Button';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { ConfirmationContentSpan, ConfirmationDiv, ConfirmationTitle, ConfirmationTitleDiv } from './confirmationModalStyles';

export interface ConfirmationModalProps {
    /**
     * The boolean value to determine if the modal is visible or not.
     */
    modalVisible: boolean;
    /**
     * The title of the modal.
     */
    title?: string;
    /**
     * The text or content to display in the main body of the modal.
     */
    message: string | ReactElement;
    /**
     * The yes/accept button text. This defaults to `Yes`.
     */
    yes?: string;
    /**
     * The no/decline button text. This defaults to `No`.
     */
    no?: string;
    /**
     * The action to run when yes/accept action is triggered.
     */
    onYes: () => void;
    /**
     * The action to run when no/decline action is triggered.
     */
    onNo: () => void;
    /**
     * The classes to pass to the modal.
     */
    className: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
    modalVisible,
    title,
    message,
    yes = 'Yes',
    no = 'No',
    onYes,
    onNo,
    className
}) => {
    const yesButton = (
        <Button onClick={onYes} color="destructive">
            {yes}
        </Button>
    );

    return (
        <ThemeProvider theme={theme}>
            <Modal
                isOpen={modalVisible}
                handleClose={onNo}
                actionButton={yesButton}
                cancelButtonText={no}
                className={className}
            >
                <ConfirmationTitleDiv>
                    <ErrorIcon style={{ color: theme?.colors?.watermelon }} />
                    {title ? <ConfirmationTitle>{title}</ConfirmationTitle> : ''}
                </ConfirmationTitleDiv>
                <ConfirmationDiv>
                    <ConfirmationContentSpan>{message}</ConfirmationContentSpan>
                </ConfirmationDiv>
            </Modal>
        </ThemeProvider>
    );
};

export default ConfirmationModal;
