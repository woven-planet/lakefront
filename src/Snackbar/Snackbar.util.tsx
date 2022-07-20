import colors  from 'src/styles/lakefrontColors';
import { ReactComponent as CheckCircle } from './check_circle.svg';
import { ReactComponent as Error } from './error.svg';
import { ReactComponent as ErrorOutline } from './error_outline.svg';

export enum MESSAGE_TYPES  {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success'
}

export type SnackbarCloseReason = 'timeout';

export interface SnackbarOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  }

 export const generateAnchorOrigin = ((anchorOrigin: { horizontal: SnackbarOrigin['horizontal']; vertical: SnackbarOrigin['vertical']; },
    portal: { style: { left: string; bottom: string; }; } ) => {

        
//   const left = portal.style.left = '0%';
//    const center = portal.style.left = '50%';
//     const right = portal.style.left = '100%';
//     anchorOrigin.horizontal = left || center || right;

//     const top = portal.style.bottom = '0%';
//     const bottom = portal.style.bottom = '50%';

//     anchorOrigin.vertical = top || bottom;

 portal.style.left = '0%';
 portal.style.left = '50%';
 portal.style.left = '100%';

 anchorOrigin.horizontal = 'left';
anchorOrigin.vertical = 'bottom' || 'top';
 


    return ;
    
});

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
