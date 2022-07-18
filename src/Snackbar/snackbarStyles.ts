import styled from '@emotion/styled';

export interface SnackbarPropsStyles {
anchorOrigin: {vertical: string, horizontal: string};
open: boolean;
};

export const SnackbarWrapper = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 4,
    '.snackbarOpen': {
        backgroundColor: 'pink',
        height: 50,
        opacity: 1,
        transition: 'height 1000ms ease-out, opacity 1000ms ease-out'
    },

    '.snackbarClosed': {
        backgroundColor: 'blue',
        height: 50,
        opacity: 1,
        transition: 'height 1000ms ease-out, opacity 1000ms ease-out'
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
    // minHeight: 40,
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
