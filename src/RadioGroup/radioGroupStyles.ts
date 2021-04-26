import styled from '@emotion/styled';
import { RadioGroupProps } from './RadioGroup';

export const StyledLabel = styled.label<RadioGroupProps>(
  ({ ...props }) => ({
      color: props.disabled ? props.theme?.colors?.mercury : props.theme?.colors?.cinder,
      display: 'flex',
      flexDirection: 'row',
      fontSize: 16,
      padding: 0,
      marginBottom: 41,
      alignItems: 'center',
      span: {
        marginLeft: 12,
        fontSize: 16
      },
      svg: {
        color: props.disabled ? props.theme?.colors?.mercury : props.theme?.colors?.white,
        marginLeft: 2,
      },
      cursor: props.disabled ? 'not-allowed' : 'auto',
  })
);

export const StyledRadioGroup = styled.input<RadioGroupProps>(
  ({ disabled }) => ({
      display: 'none',
      appearance: 'none',
      WebkitAppearance: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
  })
);
