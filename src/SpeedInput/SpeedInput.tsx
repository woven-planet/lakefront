import { FC, useState, ChangeEvent } from 'react';
import RadioGroup from 'src/RadioGroup/RadioGroup';
import MinMaxInput from 'src/Filter/modules/DurationFilter/MinMaxInput';

import { speedInputStyles } from 'src/SpeedInput/speedInputStyles';
import { RadioGroupWrapper } from 'src/SpeedInput/speedInputStyles';

import styled from '@emotion/styled';
import { StyledRadioGroup, StyledLabel } from 'src/RadioGroup/radioGroupStyles';
import { ReactComponent as Checked } from './assets/radioChecked.svg';
import { ReactComponent as Unchecked } from './assets/radioUnchecked.svg';


// import { FC, useState, ChangeEvent } from 'react';
// import { RadioGroup, MinMaxInput } from '@toyota-research-institute/lakefront';
// import { Mode, SPEED_UNITS, VehicleSpeed } from './VehicleSpeedUtil';

// import styles from './vehicleSpeedFilter.module.scss';

// import styled from '@emotion/styled';
// import theme from 'core/styles/theme';

export enum Mode {
    minmax = 'minmax',
    presets = 'presets'
}

export interface VehicleSpeed {
    min?: number;
    max?: number;
    unit: SPEED_UNITS;
    mode: Mode;
    preset?: string;
}

/**
 * Enumerator for units of speed abbreviations
 */
export enum SPEED_UNITS {
    kilometersPerHour = 'kph',
    milesPerHour = 'mph',
    metersPerSecondSquared = 'm/s²'
}
const unitOptions = [
    { value: SPEED_UNITS.kilometersPerHour, label: 'Kph' },
    { value: SPEED_UNITS.milesPerHour, label: 'Mph' }
];


export interface Props {
    value: VehicleSpeed | null;
    onChange(speedRange: VehicleSpeed | null): void;
    unitConversionRequired: boolean;
    allowNegativeInput: boolean;
    defaultUnits: SPEED_UNITS;
    disabled: boolean;
}
const SpeedInput: FC<Props> = ({ value, onChange, unitConversionRequired, allowNegativeInput, defaultUnits }) => {
    const [unit, setUnit] = useState<string>(() => {
        if (unitConversionRequired) {
            return value && value.unit ? value.unit : defaultUnits;
        }
        return SPEED_UNITS.metersPerSecondSquared;
    });
    const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUnit(event.target.value);
        const speedRange: VehicleSpeed = {
            ...value,
            unit: unit as SPEED_UNITS,
            mode: Mode.minmax
        };
        onChange(speedRange);
    };

    const submitSearch = ({ min, max }: { min: any, max: any }) => {
        if (min && min !== '.' && max && max !== '.' && min !== '-' && max !== '-') {
            const parsedMin = parseFloat(min);
            const parsedMax = parseFloat(max);
            const speedRange: VehicleSpeed = {
                min: parsedMin,
                max: parsedMax,
                unit: unit as SPEED_UNITS,
                mode: Mode.minmax
            };
            onChange(speedRange);
        } else {
            onChange(null);
        }
    };
    return (
        <div>
            <MinMaxInput value={value} onChange={submitSearch} allowNegativeInput={allowNegativeInput} />
            {unitConversionRequired && (
                <>
                    <div className='unitOfSpeed'>Unit of Speed</div>
                    <RadioGroupWrapper>
                        <RadioGroup
                            name="SpeedUnits"
                            options={unitOptions}
                            value={unit}
                            disabled={false}
                            onChange={handleUnitChange}
                        />
                    </RadioGroupWrapper>
                </>
            )}
        </div>
    );
};
export default SpeedInput;