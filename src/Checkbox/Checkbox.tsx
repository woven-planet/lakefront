import React, { ComponentPropsWithoutRef, FC } from "react";
import { StyledCheckbox, StyledLabel } from "./checkboxStyles";

export interface CheckboxProps {
  checked?: boolean;
  color?: "primary" | "secondary";
  indeterminate?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (event: object) => void;
}

const Checkbox: FC<CheckboxProps & ComponentPropsWithoutRef<"input">> = ({
  checked = false,
  color = "primary",
  indeterminate = false,
  label = "",
  disabled = false,
  onChange = () => null,
  ...props
}) => {
  return (
    <>
      {label ? (
        <StyledLabel>
          <StyledCheckbox {...props} type="checkbox" />
          <span>{label}</span>
        </StyledLabel>
      ) : (
        <StyledCheckbox {...props} type="checkbox" />
      )}
    </>
  );
};

export default Checkbox;
