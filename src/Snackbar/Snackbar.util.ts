import colors  from 'src/styles/lakefrontColors';

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

export const getColor = (type: any) => {
    switch (type) {
        case MESSAGE_TYPES.ERROR:
            return colors.saturatedRed;
        case MESSAGE_TYPES.SUCCESS:
            return colors.saturatedGreen;
        case MESSAGE_TYPES.INFO:
        default:
            return colors.white;
    }
};

export const getIcon = (type: any) => {
    switch (type) {
        case MESSAGE_TYPES.ERROR:
            return 'error';
        case MESSAGE_TYPES.SUCCESS:
            return 'check_circle';
        case MESSAGE_TYPES.INFO:
        default:
            return 'error_outline';
    }
};

