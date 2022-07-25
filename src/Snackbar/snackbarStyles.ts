import styled from '@emotion/styled';
import colors from 'src/styles/lakefrontColors';
import Button from 'src/Button/Button';
import theme from 'src/styles/theme';
import { generateAnchorOrigin, SnackbarOrigin } from './Snackbar.util';

export const TRANSITION_CLOSE_TIME = 0;

export interface SnackbarPropsStyles {
    anchorOrigin: { horizontal: SnackbarOrigin['horizontal']; vertical: SnackbarOrigin['vertical'] },
}

export const SnackbarWrapper = styled.div<SnackbarPropsStyles>(({ anchorOrigin }) => {
    const portal = { style: {left: '', bottom: '', right: '', top: ''}};
    // set horizontal properties
    generateAnchorOrigin(anchorOrigin, portal);
    return {
    '.content-snackbar-wrapper': {
        display: 'flex',
        alignItems: 'center',
        marginTop: 4,
        zIndex: theme.zIndex.snackbar,
        position: 'fixed',
        left: portal.style.left || 'auto',
        top: portal.style.top || 'auto',
        right: portal.style.right || 'auto',
        bottom: portal.style.bottom || 'auto',
    },
    '.snackbarOpen': {
        minHeight: 40,
        opacity: 1,
        transform: `scale(${1.02}, ${1.02 ** 2})`,
        transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    '.snackbarClosed': {
        minHeight: 40,
        opacity: 0,
        transition: 'opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 130ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        transform: 'none'
    }
};});

export const StyledSnackbarCloseButton = styled(Button) ({
    alignSelf: 'center',
    transform: 'scale(0.8)'
});

export const StyledSnackbarButton = styled.span(() => ({
    display: 'inline-flex',
    backgroundColor: colors.black,
    color: colors.white,
    borderRadius: 5,
    padding: 5
}));

export const StyledSnackbarContent = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 80,
    borderRadius: 4,
    backgroundColor: 'rgb(44, 44, 53)',
    padding: '4px 16px',
    justifyContent: 'space-between'
}));

export const StyledSnackbarMessage = styled.div(() => ({
    color: 'rgb(255, 255, 255)',
    alignSelf: 'center'
}));

export const StyledMessageTypeIcons = styled.span((Icon) => ({
    display: 'flex',
    marginLeft: 10,
    position: 'initial'
}));
