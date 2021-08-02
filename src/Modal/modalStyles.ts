import styled from "@emotion/styled";

interface DialogProps {
    isOpen: boolean;
    dialogWidth: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const DIALOG_WIDTHS = {
    xs: '20%',
    sm: '30%',
    md: '40%',
    lg: '60%',
    xl: '80%'
};

export const Dialog = styled.div<DialogProps>(({ isOpen, dialogWidth, theme }) => ({
    display: isOpen ? 'block' : 'none',
    maxWidth: dialogWidth ? DIALOG_WIDTHS[dialogWidth] : undefined,
    paddingTop: '100px',
    width: '100%',
    height: '100%',
    overflow: 'auto',
}));

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

export const DialogContainer = styled.div({
    backgroundColor: ['rgb(0,0,0)', 'rgba(0,0,0,0.4)'],
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    zIndex: 1
});

export const DialogContent = styled.div({
    margin: '10% auto auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%'
});

export const DialogDividerBottom = styled.div({

});

export const DialogDividerTop = styled.div({

});

export const DialogSubHeader = styled.div({

});

export const DialogTitleContainer = styled.div({
    '.subHeader': {

    }
});
