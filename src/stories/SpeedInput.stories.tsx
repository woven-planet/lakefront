import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SpeedInputComponent, { SpeedInputProps, SPEED_UNITS, VehicleSpeed } from 'src/SpeedInput/SpeedInput';

export default {
    title: 'Lakefront/SpeedInput',
    component: SpeedInputComponent,
    argTypes: {
        // Set value
        value: {
            control: '',
            table: {
                defaultValue: { summary: '' },
                type: { summary: 'string' }
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
    const updateOnChange = (speedRange: VehicleSpeed | null): void => {
        //TODO: Remove when done using.
        console.log('speedRange', speedRange);
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
    value: SPEED_UNITS.milesPerHour,
    unitConversionRequired: true,
    allowNegativeInput: true,
    defaultUnits: SPEED_UNITS.kilometersPerHour,
    disabled: false
};
