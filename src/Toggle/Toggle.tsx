import { FC } from 'react';
import { Bar, Icon, IconWrapper, Label, ToggleWrapper } from './toggleStyles';

export interface ToggleOption {
    name: string;
    value: string;
}

export interface ToggleProps {
    options: ToggleOption[];
    onChange: (value: string) => void;
    value: string;
}

const Toggle: FC<ToggleProps> = ({ options, onChange, value }) => {
    const [leftOption, rightOption] = options;
    const iconPosition = value === leftOption.value ? 0 : 8;

    const handleToggleClick = () => {
        const newValue = value === leftOption.value ? rightOption.value : leftOption.value;
        onChange(newValue);
    }

    return (
        <ToggleWrapper>
            <Label onClick={handleToggleClick}>{leftOption?.name}</Label>
            <IconWrapper onClick={handleToggleClick}>
                <Bar />
                <Icon style={{ left: iconPosition }} />
            </IconWrapper>
            <Label>{rightOption?.name}</Label>
        </ToggleWrapper>
    );
};

export default Toggle;
