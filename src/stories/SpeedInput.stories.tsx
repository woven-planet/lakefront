import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SpeedInputComponent, { SpeedInputProps, SPEED_UNITS, VehicleSpeed } from 'src/SpeedInput/SpeedInput';

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
                defaultValue: { summary: 'Kph' },
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

    const updateOnChange = (speedRange: VehicleSpeed | null): void => {
    };
    return (
        <SpeedInputComponent
            {...args}
            onChange={updateOnChange}
        />
    );
};
export const SpeedInput = Template.bind({});
SpeedInput.args = {
    value: null,
    unitConversionRequired: true,
    allowNegativeInput: true,
    defaultUnits: SPEED_UNITS.kilometersPerHour,
    disabled: false
};
