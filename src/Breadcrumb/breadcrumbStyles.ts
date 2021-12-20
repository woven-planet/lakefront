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

export const Container = styled.div<any>(({ theme, standalone }) => ({
    display: 'grid',
    gridTemplateRows: '56px auto',
    ...((standalone) && {
        padding: '0 3.5rem',
        borderBottom: '1px solid',
        borderBottomColor: theme?.colors?.mercury,
        backgroundColor: theme?.colors?.white
    })
}));

export const Content = styled.div({
    display: 'grid'
});
