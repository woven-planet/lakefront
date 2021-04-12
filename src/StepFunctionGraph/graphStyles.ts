import styled from '@emotion/styled';

export const GraphContainer = styled.div({
    height: '100%',
    margin: 0,
    position: 'relative'
});

export const StyledCanvas = styled.canvas({
    height: '100%',
    width: '100%'
});

export const GraphControls = styled.div(({theme}) => ({
    bottom: 16,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 16,
    svg: {
        height: 17
    },
    div: {
        backgroundColor: theme?.colors?.storm,
        borderRadius: 2,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        height: 32,
        width: 32
    },
    'div:first-of-type': {
        marginBottom: 15
    },
    'div:nth-of-type(2)': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    'div:nth-of-type(3)': {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTop: `1px solid ${theme?.colors?.dolphin}`
    },
    'svg path:nth-of-type(2)': {
        fill: theme?.colors?.mercury
    }
}));
