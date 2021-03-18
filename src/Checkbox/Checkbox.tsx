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
  checked?: boolean;
  checkedIcon?: ReactElement<SVGElement>;
  indeterminate?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (event: object) => void;
}

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
  const icon = indeterminate ? <Indeterminate /> : (checkedIcon || <Check />);

  const handleChange = (event: object) => {
    if (!disabled) {
        onChange(event);
        setIsChecked(!isChecked);
    }
  };

  return (
    <StyledLabel>
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
