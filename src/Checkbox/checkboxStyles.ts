import styled from '@emotion/styled';
import { CheckboxProps } from './Checkbox';

export const StyledLabel = styled.label(({ theme }) => ({
    color: theme?.colors?.cinder,
    display: 'inline-flex',
    flexDirection: 'row',
    fontSize: 16,
    padding: 0,
    alignItems: 'center',
    svg: {
        position: 'absolute',
        left: 14,
        color: theme?.colors?.white,
    }
}));

export const StyledCheckbox = styled.input<CheckboxProps>(({ theme, checked, indeterminate }) => ({
    border: `2px solid ${theme?.colors?.storm}`,
    borderRadius: 2,
    '-webkit-appearance': 'none',
    backgroundColor: (indeterminate || checked) ? theme?.colors?.storm : theme?.colors?.white,
    fontSize: 16,
    margin: '0 12px 0 0',
    height: 20,
    width: 20
}));
