import styled from '@emotion/styled';
import { ModalProps } from './Modal';

const DIALOG_WIDTHS = {
    xs: '20%',
    sm: '30%',
    md: '40%',
    lg: '60%',
    xl: '80%'
};

export const DialogContainer = styled.div<Pick<ModalProps, 'isOpen'>>(({ isOpen, theme }) => ({
    display: isOpen ? 'flex' : 'none',
    backgroundColor: ['rgb(0,0,0)', 'rgba(0,0,0,0.4)'],
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: theme?.zIndex?.modal
}));

export const Dialog = styled.div<Pick<ModalProps, 'dialogWidth'>>(({ dialogWidth, theme }) => ({
    maxWidth: dialogWidth ? DIALOG_WIDTHS[dialogWidth] : undefined,
    paddingTop: '100px',
    overflow: 'auto'
}));

export const DialogTitleContainer = styled.div({});

export const DialogSubHeader = styled.div({});

export const DialogDividerTop = styled.div({});

export const DialogContent = styled.div({
    margin: '10% auto auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%'
});

export const DialogDividerBottom = styled.div({});

export const DialogButtonContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
    button: {
        flex: 1
    },
    'button:first-of-type': {
        marginRight: 2
    },
    'button:last-of-type': {
        marginLeft: 2
    }
});
