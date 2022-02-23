import { ChangeEvent, ComponentPropsWithoutRef, FC, MouseEventHandler, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import SpeedInput, { Props, SPEED_UNITS, VehicleSpeed } from 'src/SpeedInput/SpeedInput';
import DocBlock from '.storybook/DocBlock';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Lakefront/SpeedInput',
    component: SpeedInput,
    argTypes: {
        onChange: {
            action: 'changed',
            table: {
                disable: true
            }
        },
        children: {
            table: {
                disable: true
            }
        },
        disabled: {
            control: 'boolean',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            },
            description: 'HTML input element disabled prop.'
        }
    },

    parameters: {
        docs: {
            page: DocBlock,
            transformSource: (source: string) => {
                return source
                    .replace('onChange={function noRefCheck() {}}', '')
                    .replace(/\n/g, '')
                    .replace(/[ ]{2}/g, ' ');
            },
        }
    }
} as Meta;

// const Template: Story<Props & ComponentPropsWithoutRef<'input'>> = (...args) => {
const Template: Story<Props & ComponentPropsWithoutRef<'input'>> = (args) => {
    // const [isChecked, setIsChecked] = useState(false);

    // const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    //     setIsChecked(prevState => !prevState);
    //     action(`Checked changed to ${!isChecked}`)(event);
    // };
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
        return (
            <SpeedInput
                value={VehicleSpeed}
                onChange={handleUnitChange}
                unitConversionRequired={true}
                allowNegativeInput={true}
                defaultUnits={SPEED_UNITS}
                disabled={false}
            />
        );
    };
};
export const SpeedInputComponent = Template.bind({});
// export const Checkbox = Template.bind({});

// export const CheckboxWithLabel = Template.bind({});
// CheckboxWithLabel.args = {
//     label: 'Checkbox'
// };
