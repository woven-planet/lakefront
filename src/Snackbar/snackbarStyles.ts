import styled from '@emotion/styled';
import Snackbar, { SnackbarProps } from '.';

export interface SnackbarPropsStyles {
anchorOrigin: {vertical: string, horizontal: string};
open: boolean;
};

// add props that change styling 
//
// Example:
    // export const IconWrapper = styled.div<Pick<ToggleProps<unknown>, 'disabled' | 'position'>>(({ theme, disabled, position }) => ({
export const SnackbarWrapper = styled.div<SnackbarPropsStyles>(({anchorOrigin = { vertical: 'bottom', horizontal: 'left' }, open}) => ({
display: 'flex',
    alignItems: 'center',
    marginTop:4,
    
}));
