import styled from '@emotion/styled';
import { CheckboxProps } from './Checkbox';

export const StyledLabel = styled.label(({ theme }) => ({
    color: theme?.colors?.cinder,
    display: 'inline-flex',
    border: '1px solid red',
    flexDirection: 'row',
    fontSize: 16,
    span: {
        marginBottom: 4
    },
    padding: 0,
    alignItems: 'center'
}));

export const StyledCheckbox = styled.input<CheckboxProps>(({ theme, checked }) => ({
    border: `2px solid ${theme?.colors?.storm}`,
    borderRadius: 4,
    backgroundColor: checked ? theme?.colors?.storm : theme?.colors?.white,
    color: theme?.colors?.white,
    fontSize: 16,
    marginRight: 12,
    outline: 'none',
    height: 20,
    width: 20
}));
