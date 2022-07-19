import styled from '@emotion/styled';

export interface SnackbarPropsStyles {
anchorOrigin: {vertical: string, horizontal: string};
open: boolean;
};

export const TRANSITION_TIME = 800;

export const SnackbarWrapper = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 4,  

    '.snackbarOpen': {
        minHeight: 40,
        opacity: 1,
        transform: `scale(${1.02}, ${1.02 ** 2})`,
        transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },

    '.snackbarClosed': {
        minHeight: 40,
        opacity: 0,
        transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 130ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        transform: 'none',
        // '.closeIcon': {
        //     display: 'none'
        //         },
        //         '.snackbarIcon': {
        //             display: 'none'
        //         },
        //         '.snackbarMessage': {
        //             display: 'none'
        //         }
    }
}));

export const StyledSnackbarButton = styled.span(() => ({
    display: 'inline-flex', 
      backgroundColor: '#316a8f',
      color: 'white',
      borderRadius: 5,
      padding: 5,
  }));

export const StyledSnackbarContent = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    height: 0,
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
    position: 'initial'
}));
