import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import SelectComponent, { SelectProps } from 'src/components/Select';
import DocBlock from '.storybook/DocBlock';
import { emerald } from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/Select',
    component: SelectComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: StoryFn<SelectProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [value, setValue] = useState(args.value);
    const handleOnChange = (event) => {
        setValue(event.target.value);
    };

    const areValuesSelected = () => {
        if (!args.isMulti){
            return value !== undefined;
        }
        else {
            return value != undefined && value.length > 0;
        }
    };

    return (
        <>
            <div
                style={{
                    minHeight: 20,
                    backgroundColor: areValuesSelected() && emerald,
                    padding: 8,
                    margin: '8px 0',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                {areValuesSelected() && !args.isMulti && `The selected value is ${value}`}
                {areValuesSelected() && value.length > 0 && args.isMulti && `The selected values are: ${value.map(v => ` ${v}`)}`}
            </div>
            <section style={{ display: 'inline-flex', height: '150px' }}>
                <SelectComponent options={args.options} value={value} onChange={handleOnChange} id={args.id}
                    isSearchable={args.isSearchable} disabled={args.disabled} className={args.className}
                    autoFocus={args.autoFocus} isMulti={args.isMulti} multiDefaultValue={args.multiDefaultValue} />
            </section>
        </>
    );
};

export const Select = Template.bind({});
Select.args = {
    options: [{ label: 'Km', value: 'metric' }, { label: 'Mi', value: 'imperial' }],
    value: 'imperial',
    isMulti: false
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    options: [{ label: 'Km', value: 'metric' }, { label: 'Mi', value: 'imperial' }, {label: 'Made up system', value: 'made up'}],
    value: '',
    isMulti: true
};

export const MultiSelectWithDefaultValues = Template.bind({});
MultiSelectWithDefaultValues.args = {
  options: [{ label: 'Km', value: 'metric' }, { label: 'Mi', value: 'imperial' }, {label: 'Made up system', value: 'made up'}],
  multiDefaultValue: [{ label: 'Mi', value: 'imperial' }, {label: 'Made up system', value: 'made up'}],
  isMulti: true
};
