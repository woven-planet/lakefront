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
      display: "inline-grid",
      gridTemplateColumns: "32px auto",
      gridTemplateRows: "auto",
      fontSize: 16,
      padding: 0,
      alignItems: "center",
      span: {
        gridColumn: "2 / span 1",
        gridRow: "1 / span 1",
      },
      svg: {
        gridColumn: "1 / span 1",
        gridRow: "1 / span 1",
        color: disabled ? disabledSvgColor : theme?.colors?.white,
        marginLeft: 2,
      },
      cursor: disabled ? 'not-allowed' : 'auto',
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
      WebkitAppearance: "none",
      backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
      fontSize: 16,
      height: 20,
      width: 20,
      gridColumn: "1 / span 1",
      gridRow: "1 / span 1",
      cursor: disabled ? 'not-allowed' : 'auto',
    };
  }
);
