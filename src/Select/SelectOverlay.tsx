import { FC, useMemo } from 'react';
import { SelectProps, SelectOption } from './Select';
import Select, { ValueType } from 'react-select';
import { SELECT_OVERLAY_STYLES } from './selectStyles';
import theme from 'src/styles/theme';
const SelectOverlay: FC<SelectProps> = ({ isSearchable = false, disabled, id, options, onChange, value, ...rest }) => {
    const { currentValue, defaultValue, selectId } = useMemo(
        () => ({
            currentValue: options.find((option) => option.value === value),
            defaultValue: options[0],
            selectId: id ? `select-overlay-${id}` : undefined
        }),
        [options, value]
    );

    const handleChange = (option: any) => {
        const newValue = option?.value;
        onChange({
            target: { value: newValue },
            currentTarget: { value: newValue }
        });
    };

    return (
        <Select
            isDisabled={disabled}
            id={selectId}
            defaultValue={defaultValue}
            value={currentValue}
            options={options}
            onChange={handleChange}
            styles={SELECT_OVERLAY_STYLES}
            theme={(defaultTheme) => ({
                ...defaultTheme,
                colors: {
                    ...theme.colors,
                    primary: theme.colors.white,
                    primary25: disabled ? theme.colors.white : theme.colors.mercury
                }
            })}
            isSearchable={isSearchable}
            {...rest}
        />
    );
};

export default SelectOverlay;
