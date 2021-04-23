import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    FC
  } from 'react';
  import { ThemeProvider } from '@emotion/react';
  import { StyledRadioGroup, StyledLabel } from './radioGroupStyles';
  import { ReactComponent as Checked } from './assets/radioChecked.svg';
  import { ReactComponent as Unchecked } from './assets/radioUnchecked.svg';
  import theme from '../styles/theme';
  
  export interface RadioGroupProps {
    /**
     * The name of the radio button group.
     */
    name: string;
    /**
     * The labels and values of the available radio buttons to select within the radio group.
     */
    options: {
        value: string;
        label: string;
    }[];
    /**
     * The value of the selected radio button.
     */
    value: string;
    /**
     * HTML input element disabled prop.
     */
    disabled?: boolean;
    /**
     * The action that should be run when the selected radio button state changes.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }
  
  /**
   * RadioGroup Component
   *
   * The RadioGroup component takes in native radio button props as well as its own CheckboxProps.
   * The `checked` state is not managed in the component and should be received
   * via the `checked` prop from the consuming app.
   *
   */
  const RadioGroup: FC<RadioGroupProps & ComponentPropsWithoutRef<"input">> = ({
    name,
    options,
    value,
    disabled = false,
    onChange = () => null,
    ...props
  }) => {
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(event);
      }
    };
  
    return (
      <ThemeProvider theme={theme}>
      { 
        options.map((option) => {

          const icon = value === option.value ? <Checked /> : <Unchecked />;

          return (
            <StyledLabel disabled={disabled}>
                <StyledRadioGroup
                  {...props}
                  name={name}
                  options={options}
                  value={option.value}
                  disabled={disabled}
                  onChange={handleChange}
                  type="radio"
                />
                {icon}
                {option.label && <span>{option.label}</span>}
            </StyledLabel>
          )
        })
      }
      </ThemeProvider>
    );
  };
  
  export default RadioGroup;
  