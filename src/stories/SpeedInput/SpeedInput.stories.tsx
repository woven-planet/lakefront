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

const vehicleValue = {
    min: 1,
    max: 50,
    unit: null,
    mode: Mode.minmax
};

const Template: Story<SpeedInputProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [showBanner, setShowBanner] = useState(false);
    const [speedRange, setSpeedrange] = useState(null);

    const updateOnChange = (_speedRange: VehicleSpeed | null): void => {
        setSpeedrange(_speedRange);
        setShowBanner(true);
        setTimeout(() => {
            setShowBanner(false);
        }, 3000);
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
                The SeedRange value is min = {speedRange.min} and max= {speedRange.max}.
            </div>)}
            <SpeedInputComponent
                {...args}
                onChange={updateOnChange}
            />

        </>
    );
};

export const SpeedInput = Template.bind({});
SpeedInput.args = {
    value: vehicleValue,
    unitConversionRequired: true,
    allowNegativeInput: true,
    defaultUnits: SPEED_UNITS.milesPerHour,
    disabled: false
};
