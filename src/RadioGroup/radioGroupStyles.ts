import styled from '@emotion/styled';
import { RadioGroupProps } from './RadioGroup';

interface StyledLabelProps {
  disabled?: boolean;
}

export const StyledLabel = styled.label<StyledLabelProps>(
  ({ theme, disabled }) => ({
      color: disabled ? theme?.colors?.mercury : theme?.colors?.cinder,
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
        color: disabled ? theme?.colors?.mercury : theme?.colors?.white,
        marginLeft: 2,
      },
      cursor: disabled ? 'not-allowed' : 'auto',
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
