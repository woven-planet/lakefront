import styled from "@emotion/styled";
import { CheckboxProps } from "./Checkbox";

interface StyledLabelProps {
  disabled?: boolean;
  indeterminate?: boolean;
}

export const StyledLabel = styled.label<StyledLabelProps>(
  ({ theme, disabled, indeterminate }) => {
    const disabledSvgColor = indeterminate
      ? theme?.colors?.white
      : theme?.colors?.mercury;

    return {
      color: disabled ? theme?.colors?.mercury : theme?.colors?.cinder,
      display: "inline-flex",
      flexDirection: "row",
      fontSize: 16,
      padding: 0,
      alignItems: "center",
      svg: {
        position: "absolute",
        left: 14,
        color: disabled ? disabledSvgColor : theme?.colors?.white,
      },
    };
  }
);

export const StyledCheckbox = styled.input<CheckboxProps>(
  ({ theme, checked, indeterminate, disabled }) => {
    const backgroundColor =
      indeterminate || checked ? theme?.colors?.storm : theme?.colors?.white;
    const disabledBackgroundColor = indeterminate
      ? theme?.colors?.mercury
      : theme?.colors?.white;

    return {
      border: `2px solid ${
        disabled ? theme?.colors?.mercury : theme?.colors?.storm
      }`,
      borderRadius: 2,
      "-webkit-appearance": "none",
      backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
      fontSize: 16,
      margin: "0 12px 0 0",
      height: 20,
      width: 20,
    };
  }
);
