import { FC, useState, ChangeEvent } from 'react';
import RadioGroup from 'src/RadioGroup/RadioGroup';
import MinMaxInput from 'src/Filter/modules/DurationFilter/MinMaxInput';
import { speedInputStyles } from 'src/SpeedInput/speedInputStyles';
import { RadioGroupWrapper } from 'src/SpeedInput/speedInputStyles';

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

export interface SpeedInputProps {
    /**
    *  // TODO: insert description. 
    */
    value: VehicleSpeed | null;
    /**
    * The function that should run when a radio button is selected.
    */
    onChange(speedRange: VehicleSpeed | null): void;
    /**
    * Toggle true, to have speed units validated for selected unit.
    */
    unitConversionRequired: boolean;
    /**
    * Toggle to accept negative input values or not.  
    */
    allowNegativeInput: boolean;
    /**
    * We can set our defaultUnits with (kilometersPerHour(kph), milesPerHour(mph), metersPerSecondSquared(m/s²)). 
    */
    defaultUnits: SPEED_UNITS;
    /**
    * If true, this prop will disable the component. 
    */
    disabled: boolean;
}
const SpeedInput: FC<SpeedInputProps> = ({ value, onChange, unitConversionRequired, allowNegativeInput, defaultUnits, disabled }) => {
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
                            disabled={disabled}
                            onChange={handleUnitChange}
                        />
                    </RadioGroupWrapper>
                </>
            )}
        </div>
    );
};
export default SpeedInput;