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

export const Dialog = styled.div<DialogProps>(({ isOpen, dialogWidth }) => ({
    display: isOpen ? 'block' : 'none',
    maxWidth: dialogWidth ? DIALOG_WIDTHS[dialogWidth] : undefined
}));

export const DialogButtonContainer = styled.div({

});

export const DialogContent = styled.div({

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
