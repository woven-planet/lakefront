import styled from '@emotion/styled';
import Input from 'src/Input/Input';

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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: theme.colors.gunpowder,
    backgroundColor: theme.colors.akoya,
    fontSize: 20,
    height: 300
}));

export const StyledInput = styled(Input)({
    width: '100%'
});
