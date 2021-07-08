import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    FC,
    ReactElement
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
     * The options of each radio button within the radio group.
     * Options include the `label` (appearance), `value` (returned on selection),
     * and whether the individual option is `disabled`.
     */
    options: {
        value: string;
        label: string | ReactElement;
        disabled?: boolean;
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
     * The action that should be run when a radio button is selected.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  /**
   * RadioGroup Component
   *
   * The RadioGroup component takes in native radio button props as well as its own RadioGroupProps.
   *
   */
  const RadioGroup: FC<RadioGroupProps & ComponentPropsWithoutRef<'input'>> = ({
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
          const checked = value === option.value;
          const disableOption = disabled || option.disabled;

          return (
            <StyledLabel disabled={disableOption}>
              <StyledRadioGroup
                {...props}
                name={name}
                options={options}
                value={option.value}
                disabled={disableOption}
                onChange={disableOption ? () => null : handleChange}
                type="radio"
                checked={checked}
              />
              {icon}
              {option.label && <div className="label">{option.label}</div>}
            </StyledLabel>
          );
        })
      }
      </ThemeProvider>
    );
  };

  export default RadioGroup;
