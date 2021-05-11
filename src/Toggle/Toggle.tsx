import { FC } from 'react';
import { Bar, Icon, IconWrapper, Label, ToggleWrapper } from './toggleStyles';

export interface ToggleOption {
    name: string;
    value: string;
}

export interface ToggleProps {
    disabled?: boolean;
    options: ToggleOption[];
    onChange: (value: string) => void;
    position: 'LEFT' | 'RIGHT';
    value: string;
}

const Toggle: FC<ToggleProps> = ({ disabled, options, onChange, position = 'RIGHT', value }) => {
    const [firstOption, secondOption] = options;
    const isFirstOption = value === firstOption.value;
    const iconPosition = isFirstOption ? 0 : 16;
    const label = isFirstOption ? firstOption.name : secondOption.name;
    const labelOrder = position === 'LEFT' ? 0 : 2;

    const handleToggleClick = () => {
        if (!disabled) {
            const newValue = value === firstOption.value ? secondOption.value : firstOption.value;
            onChange(newValue);
        }
    }

    if (!options || options.length === 0) {
        return null;
    }

    return (
        <ToggleWrapper>
            <Label disabled={disabled} style={{ order: labelOrder }} onClick={handleToggleClick}>{label}</Label>
            <IconWrapper disabled={disabled} onClick={handleToggleClick}>
                <Bar disabled={disabled} options={options} value={value} />
                <Icon disabled={disabled} style={{ left: iconPosition }} />
            </IconWrapper>
        </ToggleWrapper>
    );
};

export default Toggle;
