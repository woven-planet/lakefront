import styled from '@emotion/styled';
import { TextAreaProps } from './TextArea';

export const StyledLabel = styled.label<TextAreaProps>(({ error, theme }) => ({
    color: theme?.colors?.cinder,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 600,
    span: {
        marginBottom: 4,
    },
    div: {
        marginTop: 4,
        minHeight: 14,
    },
    ...(error && {
        color: theme?.colors?.red,
    })
}));

export const StyledTextArea = styled.textarea<TextAreaProps>(({ error, theme, disabled }) => ({
    border: `1px solid ${theme?.colors?.mercury}`,
    borderRadius: 4,
    boxSizing: 'border-box',
    color: theme?.colors?.cinder,
    fontSize: 16,
    outline: 'none',
    padding: 12,
    height: 200,
    width: 300,
    ':focus': {
        border: `1px solid ${theme?.colors?.cinder}`
    },
    '::placeholder': {
        color: theme?.colors?.mercury
    },
    cursor: disabled ? 'not-allowed' : undefined,
    ...(error && {
        border: `1px solid ${theme?.colors?.red}`,
        ':focus': {
            border: `1px solid ${theme?.colors?.red}`
        },
    })
}));
