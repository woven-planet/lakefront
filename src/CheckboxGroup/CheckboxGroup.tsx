import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import Checkbox from 'src/Checkbox/Checkbox';
import colors from 'src/styles/cloudColors';

const StyledDivider = styled.div({
    backgroundColor: colors.alto,
    height: 1,
    width: '95%',
    margin: '8px 0px'
});

interface Props {
    options: {
        value: string;
        label: string | ReactElement;
        color?: string;
    }[];
    allColor?: string;
    className?: string;
    classNameItem?: string;
    showAll?: boolean;
    onHandleChange(items: Set<string>): void;
    name: string;
    selected: Set<string>;
    allLabel?: string;
}

const CheckboxGroup: FC<Props> = props => {
    const isItemChecked = (value: string) => {
        const { selected } = props;

        return selected.has(value);
    };

    const onItemChange = (value: string) => {
        const { selected, onHandleChange } = props;
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
        const { selected, onHandleChange, options } = props;
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


    const { allColor, className, name, options, selected, showAll, allLabel } = props;
    const isAllSelected = selected.size === options.length;
    const allDisplayLabel = allLabel ? ` ${allLabel}` : '';

    return (
        <div className={className}>
            {showAll && (
                <>
                    <Checkbox
                        value="all"
                        label={`All${allDisplayLabel}`}
                        color={allColor}
                        id={`checkbox-${name}-all`}
                        onChange={onAllItemChange}
                        isSelected={isAllSelected}
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
                        onChange={onItemChange}
                        isSelected={isSelected}
                        color={option.color}
                    />
                );
            })}
        </div>
    );
};

CheckboxGroup.defaultProps = {
    showAll: true
};

export default CheckboxGroup;
