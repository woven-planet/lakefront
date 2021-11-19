import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SelectComponent, { SelectProps } from 'src/Select';
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

const Template: Story<SelectProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [value, setValue] = useState(args.value);
    const handleOnChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <div
                style={{
                    minHeight: 20,
                    backgroundColor: value && emerald,
                    padding: 8,
                    margin: '8px 0',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                {value && `The selected value is ${value}`}
            </div>
            <section style={{ display: 'inline-flex', height: '150px' }}>
                <SelectComponent options={args.options} value={value} onChange={handleOnChange} id={args.id}
                    isSearchable={args.isSearchable} disabled={args.disabled} className={args.className}
                    autoFocus={args.autoFocus} />
            </section>
        </>
    );
};

export const Select = Template.bind({});
Select.args = {
    options: [{ label: 'Km', value: 'metric' }, { label: 'Mi', value: 'imperial' }],
    value: 'imperial'
};
