import { FC, useMemo, useState } from 'react';
import { SelectProps } from './Select';
import Select from 'react-select';
import { SELECT_OVERLAY_STYLES } from './selectStyles';
import theme from 'src/styles/theme';
const SelectOverlay: FC<SelectProps> = ({ isSearchable = false, disabled, id, options, onChange, value, isMulti, ...rest }) => {
    const [multiValues, setMultiValues] = useState([]);

    const { currentValue, defaultValue, selectId } = useMemo(
        () => {
            return {
                currentValue: !isMulti ? options.find((option) => option.value === value) : multiValues,
                defaultValue: options[0],
                selectId: id ? `select-overlay-${id}` : undefined
            };
        },
        [options, value, multiValues]
    );

    const handleChange = (option: any) => {
        if (!isMulti) {
            const newValue = option?.value;
            onChange({
                target: { value: newValue },
                currentTarget: { value: newValue }
            });
        }
        else {
            const eventTargetValues = option.map((o: { value: any; }) => o.value);
            onChange({
                target: {value: eventTargetValues},
                currentTarget: {value: eventTargetValues}
            });
            setMultiValues(option);
        }
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
                    ...defaultTheme.colors,
                    ...theme.colors,
                    primary: theme.colors.white,
                    primary25: disabled ? theme.colors.white : theme.colors.mercury
                }
            })}
            isSearchable={isSearchable}
            isMulti={isMulti}
            {...rest}
        />
    );
};

export default SelectOverlay;
