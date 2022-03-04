import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SpeedInputComponent, { Mode, SpeedInputProps, SPEED_UNITS, VehicleSpeed } from 'src/SpeedInput/SpeedInput';
import { emerald } from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/SpeedInput',
    component: SpeedInputComponent,
    argTypes: {
        value: {
            control: 'VehicleSpeed',
            table: {
                defaultValue: { summary: 'VehicleSpeed' },
                type: { summary: null }
            }
        },
        unitConversionRequired: {
            control: 'boolean',
            table: {
                defaultValue: { summary: true },
                type: { summary: 'boolean' }
            }
        },
        allowNegativeInput: {
            control: 'boolean',
            table: {
                defaultValue: { summary: true },
                type: { summary: 'boolean' }
            }
        },
        defaultUnits: {
            control: SPEED_UNITS,
            table: {
                defaultValue: { summary: 'Mph' },
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: 'boolean',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        }
    },
} as Meta;

const Template: Story<SpeedInputProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [speedRange, setSpeedrange] = useState(null);
    const [showBanner, setShowBanner] = useState(false);

    let vehicleValue = {
        min: speedRange?.min || 1,
        max: speedRange?.max || 50,
        unit: null,
        mode: Mode.minmax
    };

    const handleUnitChange = (speedRange: VehicleSpeed) => {
        setShowBanner(true);
        setSpeedrange(speedRange);
        setTimeout(() => {
            setShowBanner(false);
        }, 10000);
    };

    return (
        <>
            {showBanner && (<div
                style={{
                    minHeight: 20,
                    backgroundColor: emerald,
                    padding: 8,
                    margin: '8px 0',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                The SpeedRange value is min = {speedRange.min} {speedRange.unit} and max = {speedRange.max} {speedRange.unit}.
            </div>)}
            <SpeedInputComponent
                {...args}
                onChange={handleUnitChange}
                value={vehicleValue}
            />

        </>
    );
};

export const SpeedInput = Template.bind({});

SpeedInput.args = {

    unitConversionRequired: true,
    allowNegativeInput: true,
    defaultUnits: SPEED_UNITS.milesPerHour,
    disabled: false
};
