import styled from '@emotion/styled';

export const DefaultWrapper = styled.div(({ theme }) => ({
    backgroundColor: theme.colors.white,
    fontFamily: '"Source Sans Pro", sans-serif',
    margin: 0,
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'center',
    border: theme.borders.primary
}));

export const PageBody = styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    color: theme.colors.gunpowder,
    backgroundColor: theme.colors.akoya,
    fontSize: 20,
    minHeight: 400
}));

export const PageWrapper = styled.div(({ theme }) => ({
    backgroundColor: theme.colors.white,
    fontFamily: '"Source Sans Pro", sans-serif',
    margin: 0,
    padding: 15,
    display: 'grid',
    flexDirection: 'column',
    width: '100%',
    border: theme.borders.primary
}));

export const PageBodyWithCollapseSection = styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    fontSize: 10,
    marginLeft: 5,
    minHeight: 400
}));
