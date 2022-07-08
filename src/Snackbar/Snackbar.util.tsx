import colors  from 'src/styles/lakefrontColors';
import { ReactComponent as CheckCircle } from './check_circle.svg';
import { ReactComponent as Error } from './error.svg';
import { ReactComponent as ErrorOutline } from './error_outline.svg';

export enum MESSAGE_TYPES  {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success'
}

export type SnackbarCloseReason = 'timeout' | 'clickaway';

export interface SnackbarOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  }

export const getIcon = (type: MESSAGE_TYPES) => {
    switch (type) {
        case MESSAGE_TYPES.ERROR:
            return <Error style={{fill: colors.saturatedRed}}/>;
        case MESSAGE_TYPES.SUCCESS:
            return <CheckCircle style={{fill: colors.saturatedGreen}}/>;
        case MESSAGE_TYPES.INFO:
        default:
            return <ErrorOutline style={{fill: colors.white}}/>;
    }
};
