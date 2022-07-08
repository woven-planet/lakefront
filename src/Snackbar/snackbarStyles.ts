import styled, { keyframes } from '@emotion/styled';
import Snackbar, { SnackbarProps } from '.';
import Button from '../Button';
import { ReactComponent as CheckCircle } from './check_circle.svg';
import { Icon } from 'src/Toggle/toggleStyles';
import { ReactComponent as Error } from './error.svg';
import colors  from 'src/styles/lakefrontColors';

export interface SnackbarPropsStyles {
anchorOrigin: {vertical: string, horizontal: string};
open: boolean;
};

export const SnackbarWrapper = styled.div<SnackbarPropsStyles>(({anchorOrigin = { vertical: 'bottom', horizontal: 'left' }, open=true}) => ({
display: 'flex',
// set classNames and use opacity to toggle between 0 and 1
    // transition: 'height 900ms ease, opacity 900ms ease',
    // opacity: 1,

    alignItems: 'center',
    marginTop:4
}));

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

    export const StyledMessageTypeIcons = styled.span((Icon) => ({
    display: 'flex',
    marginLeft: 10,
    opacity: 1,
    position: 'initial'
}));

export const StyledSnackbarButton = styled.span(() => ({
  display: 'inline-flex', 
    backgroundColor: '#316a8f',
    color: 'white',
    padding: 5
}));
