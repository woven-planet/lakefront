import { SelectProps } from 'src/components/Select/Select';

/**
 * Utility to extract native select props from SelectProps
 * @param props
 */
export const extractNativeSelectProps = (props: SelectProps) => {
  const {
    id,
    disabled,
    autoFocus,
    name,
    required,
    value,
    defaultValue,
    onChange,
    onBlur,
    placeholder,
    form,
    tabIndex,
    className,
    isMulti
  } = props;

  return {
    id,
    disabled,
    autoFocus,
    name,
    required,
    value,
    // Filter defaultValue to be compatible
    defaultValue: typeof defaultValue === 'string' || typeof defaultValue === 'number' || Array.isArray(defaultValue) ? defaultValue : undefined,
    multiple: isMulti,
    onChange,
    onBlur,
    placeholder,
    form,
    tabIndex,
    className,
  };
}