import colors from 'src/styles/lakefrontColors';
import { ReactComponent as CheckCircle } from './assets/check_circle.svg';
import { ReactComponent as Error } from './assets/error.svg';
import { ReactComponent as ErrorOutline } from './assets/error_outline.svg';

export enum MESSAGE_TYPES {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success'
}

export type SnackbarCloseReason = 'timeout';

export interface SnackbarOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}

export const generateAnchorOrigin = (
    anchorOrigin: { horizontal: SnackbarOrigin['horizontal']; vertical: SnackbarOrigin['vertical'] },
    portal: { style: { left: string; bottom: string } }
) => {
    // set horizontal properties
    if (anchorOrigin.horizontal === 'left') {
        portal.style.left = '0%';
    }

    if (anchorOrigin.horizontal === 'center') {
        portal.style.left = '40%';
    }

    if (anchorOrigin.horizontal === 'right') {
        portal.style.left = '85%';
    }

    // set vertical properties
    if (anchorOrigin.vertical === 'bottom') {
        portal.style.bottom = '0%';
    }

    if (anchorOrigin.vertical === 'top') {
        portal.style.bottom = '90%';
    }
};

export const getIcon = (type: MESSAGE_TYPES) => {
    switch (type) {
        case MESSAGE_TYPES.ERROR:
            return <Error style={{ fill: colors.saturatedRed }} />;
        case MESSAGE_TYPES.SUCCESS:
            return <CheckCircle style={{ fill: colors.saturatedGreen }} />;
        case MESSAGE_TYPES.INFO:
        default:
            return <ErrorOutline style={{ fill: colors.white }} />;
    }
};
