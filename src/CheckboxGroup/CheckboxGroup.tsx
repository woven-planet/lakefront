import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import Checkbox from 'src/Checkbox/Checkbox';
import colors from 'src/styles/lakefrontColors';

const StyledDivider = styled.div({
    backgroundColor: colors.alto,
    height: 1,
    width: '95%',
    margin: '8px 0px'
});

const CheckboxGroupWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column'
});

export interface CheckboxGroupOption {
    value: string;
    label: string | ReactElement;
    color?: string;
}

interface CheckboxGroupProps {
    options: CheckboxGroupOption[];
    allColor?: string;
    className?: string;
    classNameItem?: string;
    onHandleChange(items: Set<string>): void;
    name: string;
    selected: Set<string>;
    allLabel?: string;
}

const CheckboxGroup: FC<CheckboxGroupProps> = (
    {
        allColor,
        allLabel,
        className,
        name,
        onHandleChange,
        options,
        selected
    }) => {
    const isItemChecked = (value: string) => {
        return selected.has(value);
    };

    const onItemChange = (value: string) => {
        if (selected.has(value)) {
            // remove item
            selected.delete(value);
        } else {
            // add item
            selected.add(value);
        }
        onHandleChange(new Set(selected));
    };

    const onAllItemChange = () => {
        const isAllSelected = selected.size === options.length;

        let newSelection;
        if (isAllSelected) {
            // remove all items
            newSelection = new Set([]);
        } else {
            // add all items
            newSelection = new Set(options.map(item => item.value));
        }
        onHandleChange(newSelection);
    };

    const isAllSelected = selected.size === options.length;

    return (
        <CheckboxGroupWrapper className={className}>
            {allLabel && (
                <>
                    <Checkbox
                        value="all"
                        label={allLabel}
                        color={allColor}
                        id={`checkbox-${name}-all`}
                        onChange={onAllItemChange}
                        checked={isAllSelected}
                    />
                    <StyledDivider />
                </>
            )}

            {options.map(option => {
                const isSelected = isItemChecked(option.value);
                const checkBoxId = `checkbox-${name}-${option.value}`;
                return (
                    <Checkbox
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        id={checkBoxId}
                        onChange={(evt) => onItemChange(evt.target.value)}
                        checked={isSelected}
                        color={option.color}
                    />
                );
            })}
        </CheckboxGroupWrapper>
    );
};

export default CheckboxGroup;
