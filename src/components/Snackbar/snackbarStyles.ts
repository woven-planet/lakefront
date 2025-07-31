import styled from '@emotion/styled';
import colors from 'src/styles/lakefrontColors';
import Button from 'src/components/Button/Button';
import theme from 'src/styles/theme';
import { generateAnchorOrigin, SnackbarOrigin } from './Snackbar.util';

export const TRANSITION_CLOSE_TIME = 0;

export interface SnackbarPropsStyles {
    anchorOrigin: { horizontal: SnackbarOrigin['horizontal']; vertical: SnackbarOrigin['vertical'] };
}

export const SnackbarWrapper = styled.div<SnackbarPropsStyles>(({ anchorOrigin }) => {
    const portal = { style: { left: '', bottom: '', right: '', top: '' } };
    // set horizontal properties
    generateAnchorOrigin(anchorOrigin, portal);
    const snackbarStyles = {
        zIndex: theme.zIndex.snackbar,
        position: 'fixed' as const,
        left: portal.style.left || 'auto',
        top: portal.style.top || 'auto',
        right: portal.style.right || 'auto',
        bottom: portal.style.bottom || 'auto'
    };

    return {
        ...snackbarStyles,
        '.content-snackbar-wrapper': {
            ...snackbarStyles,
            display: 'flex',
            alignItems: 'center',
            marginTop: 4
        },
        '.snackbarOpen': {
            opacity: 1,
            transform: `scale(${1.02}, ${1.02 ** 2})`,
            transition:
                'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
        '.snackbarClosed': {
            opacity: 0,
            transition:
                'opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 130ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            transform: 'none'
        }
    };
});

export const StyledSnackbarCloseButton = styled(Button)({
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

interface StyledSnackbarProps {
    alt?: boolean
}

export const StyledSnackbarContent = styled.div<StyledSnackbarProps>(({alt}) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 80,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: `3px solid ${alt ? '#35C65B' : '#E6F6EA'}`,
    backgroundColor: alt ? '#2D2F32' : '#F9FAFB',
    padding: '4px 16px',
    justifyContent: 'space-between'
}));

export const StyledSnackbarMessage = styled.div<StyledSnackbarProps>(({alt}) => ({
    color: alt ? '#7DDE9C' : '#35C65B',
    alignSelf: 'center'
}));

export const StyledMessageTypeIcons = styled.span((Icon) => ({
    display: 'flex',
    marginLeft: 10,
    position: 'initial'
}));
