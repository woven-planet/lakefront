import styled from '@emotion/styled';


export const PlaybackStyle = styled.div<any>(() => ({
    boxSizing: 'border-box',
    textAlign: 'center'
}));

export const PlaySlider = styled.div(({ theme }) => ({
    fontSize: '12px',
    color: theme?.colors?.white,
    display: 'grid',
    gridTemplateColumns: '100px auto 100px',
    gridRowGap: '0.5rem'
}));

export const Highlight = styled.div<any>(({ theme, left, width }) => ({
    position: 'absolute',
    borderRadius: '6px',
    background: theme?.colors?.green,
    height: '8px',
    margin: '3px 0',
    top: 0,
    left: left,
    width: width
}));

export const SliderContainer = styled.div(() => ({
    position: 'relative',
    height: '14px'
}));

export const SliderBar = styled.div(({ theme }) => ({
    position: 'relative',
    borderRadius: '6px',
    background: theme?.colors?.dolphin,
    height: '8px',
    margin: '3px 0'
}));

export const SliderStyle = styled.div(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'transparent',
    height: '14px',
    width: '100%'
}));

export const ThumbStyle = styled.div<any>(({ theme, left }) => ({
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    background: theme?.colors?.mercury,
    cursor: 'grab',
    left: left
}));
