import colors from 'src/styles/lakefrontColors';
import { ReactComponent as CheckCircle } from './assets/check_circle.svg';
import { ReactComponent as Error } from './assets/error.svg';
import { ReactComponent as Info } from './assets/info.svg';
import { StyledSnackbarCloseButton } from './snackbarStyles';
import { ReactComponent as CloseIcon } from './assets/closeIcon.svg';

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

export const createDefaultAction = (onClose: (reason: SnackbarCloseReason) => void) => {
    return (
        <StyledSnackbarCloseButton
            alternate
            className='closeIcon'
            key='close'
            aria-label='Close'
            onClick={() => onClose ? onClose('timeout') : undefined}
            icon={<CloseIcon />}
        />
    );
};

export const generateAnchorOrigin = (
    anchorOrigin: { horizontal: SnackbarOrigin['horizontal']; vertical: SnackbarOrigin['vertical'] },
    portal: { style: { left: string; bottom: string; right: string; top: string } }
) => {
    // set horizontal properties
    if (anchorOrigin.horizontal === 'left') {
        portal.style.left = '24px';
    }
    if (anchorOrigin.horizontal === 'center') {
        portal.style.left = '40%';
    }
    if (anchorOrigin.horizontal === 'right') {
        portal.style.right = '24px';
    }
    // set vertical properties
    if (anchorOrigin.vertical === 'bottom') {
        portal.style.bottom = '24px';
    }
    if (anchorOrigin.vertical === 'top') {
        portal.style.top = '24px';
    }
};

export const getIcon = (type: MESSAGE_TYPES) => {
    switch (type) {
        case MESSAGE_TYPES.ERROR:
            return <Error style={{ fill: colors.saturatedRed }} />;
        case MESSAGE_TYPES.SUCCESS:
            return <CheckCircle style={{ fill: colors.saturatedBlue }} />;
        case MESSAGE_TYPES.INFO:
        default:
            return <Info style={{ fill: colors.white }} />;
    }
};
