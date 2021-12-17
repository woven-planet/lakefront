import styled from '@emotion/styled';

export const BreadCrumbStyle = styled.div(({ theme }) => ({
    display: 'grid',
    backgroundcolor: theme?.colors?.white,
    'nav': {
        alignSelf: 'center',
        display: 'flex',
    },
    'a': {
        color: theme?.colors?.pavement,
        textDecoration: 'none',
        '&:hover': {
            color: theme?.colors?.storm,
        }
    }
}));

export const Current = styled.span(({ theme }) => ({
    color: theme?.colors?.storm,
    fontWeight: 500
}));

export const Divider = styled.span(({ theme }) => ({
    display: 'inline-block',
    margin: '0 10px'
}));
