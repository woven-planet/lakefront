import styled from '@emotion/styled';
import Snackbar, { SnackbarProps } from '.';
import Button from '../Button';
export interface SnackbarPropsStyles {
anchorOrigin: {vertical: string, horizontal: string};
open: boolean;
};

export const SnackbarWrapper = styled.div<SnackbarPropsStyles>(({anchorOrigin = { vertical: 'bottom', horizontal: 'left' }, open=true}) => ({
display: 'flex',
    alignItems: 'center',
    marginTop:4,
    
open: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
    minWidth: 80,
    borderRadius: 4,
    backgroundColor: 'rgb(44, 44, 53)',
    paddingLeft: 15,
    justifyContent: 'space-between',
    }
    
}));

// replace this with the SnackbarWrapper when 'open' 
export const StyledSnackbarContent = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
    minWidth: 80,
    borderRadius: 4,
    backgroundColor: 'rgb(44, 44, 53)',
    paddingLeft: 15,
    justifyContent: 'space-between',
}));

export const StyledSnackbarMessage = styled.div(() => ({
    color: 'rgb(255, 255, 255)',
    alignSelf: 'center'
}));
