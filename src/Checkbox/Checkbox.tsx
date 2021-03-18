import React, {
  ComponentPropsWithoutRef,
  FC,
  ReactElement,
  useState,
} from "react";
import { StyledCheckbox, StyledLabel } from "./checkboxStyles";
import { ReactComponent as Check } from "./assets/check.svg";
import { ReactComponent as Indeterminate } from "./assets/indeterminate.svg";

export interface CheckboxProps {
  /**
   * The initial value to control whether the checkbox should be checked or not.
   */
  checked?: boolean;
  /**
   * The svg icon to display when checked is true. If left undefined, a check mark will be displayed.
   */
  checkedIcon?: ReactElement<SVGElement>;
  /**
   * A display state in which it is unknown whether checked should be true or false.
   */
  indeterminate?: boolean;
  /**
   * The (optional) text label for the checkbox.
   */
  label?: string;
  /**
   * HTML input element disabled prop.
   */
  disabled?: boolean;
  /**
   * The action that should be run when the checked state changes.
   */
  onChange?: (event: object) => void;
}

/**
 * Checkbox Component
 *
 * The Checkbox component takes in native checkbox props as well as its own CheckboxProps. The state is managed
 * in this component, but could be managed outside (not recommended) by forcing rerenders with new initial props
 * within the consuming app.
 *
 */
const Checkbox: FC<CheckboxProps & ComponentPropsWithoutRef<"input">> = ({
  checked = false,
  checkedIcon,
  indeterminate = false,
  label = "",
  disabled = false,
  onChange = () => null,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const showIcon = indeterminate || isChecked;
  const icon = indeterminate ? <Indeterminate /> : checkedIcon || <Check />;

  const handleChange = (event: object) => {
    if (!disabled) {
      onChange(event);
      setIsChecked(!isChecked);
    }
  };

  return (
    <StyledLabel disabled={disabled} indeterminate={indeterminate}>
      <StyledCheckbox
        {...props}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={handleChange}
        checked={isChecked}
        type="checkbox"
      />
      {showIcon && icon}
      {label && <span>{label}</span>}
    </StyledLabel>
  );
};

export default Checkbox;
