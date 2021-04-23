import styled from '@emotion/styled';
import { RadioGroupProps } from './RadioGroup';

interface StyledLabelProps {
  disabled?: boolean;
  checked?: boolean;
}

export const StyledLabel = styled.label<StyledLabelProps>(
  ({ theme, disabled }) => {

    return {
      color: disabled ? theme?.colors?.mercury : theme?.colors?.cinder,
      display: 'flex',
      flexDirection: 'row',
      fontSize: 16,
      padding: 0,
      marginBottom: 41,
      alignItems: 'center',
      span: {
        marginLeft: 12
      },
      svg: {
        color: disabled ? theme?.colors?.mercury : theme?.colors?.white,
        marginLeft: 2,
      },
      cursor: disabled ? 'not-allowed' : 'auto',
    };
  }
);

export const StyledRadioGroup = styled.input<RadioGroupProps>(
  ({ theme, disabled }) => {
    const backgroundColor =
      theme?.colors?.white;
    const disabledBackgroundColor = 
      theme?.colors?.mercury;

    return {
      display: 'flex',
      appearance: 'none',
      WebkitAppearance: 'none',
      backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
      fontSize: 16,
      outline: 'none',
      height: 20,
      width: 20,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };
  }
);
