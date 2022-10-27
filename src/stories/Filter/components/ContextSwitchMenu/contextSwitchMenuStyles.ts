import styled from '@emotion/styled';
import Button from 'src/components/Button/Button';

export const ButtonLabel = styled.div({
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    borderBottom: 0,
    padding: 0
});

export const ContextSwitchContainer = styled.div({
    alignSelf: 'center'
});

export const DropdownButton = styled(Button)(({ theme }) => ({
    width: 180,
    height: 36,
    paddingLeft: 13,
    padding: 0,
    border: `0px solid ${theme.colors.white}`,
    fontWeight: 400,
    justifyContent: 'space-between',
    ':hover': {
        backgroundColor: theme.colors.white
    },
    ':after': {
        transition: 'transform 0s, opacity 0s'
    }
}));
