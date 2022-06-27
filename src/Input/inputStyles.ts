import styled from '@emotion/styled';
import { InputProps } from './Input';

export const INPUT_WIDTH = 300;

export const StyledLabel = styled.label<InputProps>(({ error, theme }) => ({
    color: theme?.colors?.cinder,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 600,
    span: {
        marginBottom: 4,
        '&.required-field':{
            color: theme.colors.saturatedRed
        }
    },
    div: {
        marginTop: 4,
        minHeight: 14,
    },
    ...(error && {
        color: theme?.colors?.red,
    })
}));

export const StyledInput = styled.input<InputProps>(({ error, theme, disabled }) => ({
    border: `1px solid ${theme?.colors?.mercury}`,
    borderRadius: 4,
    boxSizing: 'border-box',
    color: theme?.colors?.cinder,
    fontSize: 16,
    outline: 'none',
    paddingBottom: 0,
    paddingLeft: 12,
    paddingTop: 0,
    height: 40,
    width: INPUT_WIDTH,
    cursor: disabled ? 'not-allowed' : undefined,
    ':focus': {
        border: `1px solid ${theme?.colors?.cinder}`
    },
    '::placeholder': {
        color: theme?.colors?.mercury
    },
    ...(error && {
        border: `1px solid ${theme?.colors?.red}`,
        ':focus': {
            border: `1px solid ${theme?.colors?.red}`
        },
    })
}));
