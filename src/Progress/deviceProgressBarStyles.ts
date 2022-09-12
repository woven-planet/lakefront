import styled from '@emotion/styled';
import { colors } from 'react-select/src/theme';
import { theme } from 'src';

export const ProgressBarContainer = styled.div({
    minHeight: '120px'
});

export const TopText = styled.div({
    display: 'grid',
    gridTemplateColumns: '5fr 10fr 5fr',
    paddingBottom: '10px',
    'span': {
        whiteSpace: 'nowrap'
    }
});

export const CenterText = styled.span({
    textAlign: 'center'
});

export const RightText = styled.span({
    textAlign: 'right'
});

export const ProgressBar = styled.div(({ theme }) => ({
    position: 'relative',
    height: '32px',
    borderRadius: '4px',
    border: '1px solid',
    borderColor: theme?.colors.mercury,
    background: theme?.colors.akoya
}));

export const Filler = styled.div<any>(({ width, backgroundColor, theme }) => ({
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in',
    width: width,
    backgroundColor: backgroundColor,
    display: 'flex',
    alignItems: 'center',
    span: {
        marginLeft: '1em'
    }
}));

export const BottomText = styled.div({
    display: 'grid',
    gridTemplateColumns: '5fr 10fr 5fr',
    paddingTop: '20px'
});
