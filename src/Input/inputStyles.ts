import styled from '@emotion/styled';

export const StyledLabel = styled.label(({ theme }) => ({
    color: theme?.colors?.cinder,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 600,
    span: {
        marginBottom: 4
    }
}));

export const StyledInput = styled.input(({ theme }) => ({
    border: `1px solid ${theme?.colors?.mercury}`,
    borderRadius: 4,
    color: theme?.colors?.cinder,
    fontSize: 16,
    outline: 'none',
    paddingLeft: 12,
    height: 40,
    width: 300,
    ':focus': {
        border: `1px solid ${theme?.colors?.cinder}`
    },
    '::placeholder': {
        color: theme?.colors?.mercury
    }
}));
