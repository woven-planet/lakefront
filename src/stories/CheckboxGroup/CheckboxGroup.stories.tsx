import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import CheckboxGroupComponent, { CheckboxGroupProps } from 'src/CheckboxGroup/CheckboxGroup';
import DocBlock from '.storybook/DocBlock';
import { emerald } from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/CheckboxGroup',
    component: CheckboxGroupComponent,
    argTypes: {
        onHandleChange: {
            control: false
        },
        selected: {
            table: {
                disable: true
            }
        },
        allLabel: {
            table: {
                disable: true
            }
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

const Template: Story<CheckboxGroupProps & ComponentPropsWithoutRef<'input'>> = (args) => {
    const JOB_TYPES = [
        { label: 'Finished', value: 'finished' },
        { label: 'Cancelled', value: 'canceled' },
        { label: 'Failed', value: 'failed' },
        { label: 'Running', value: 'running' },
        { label: 'Pending', value: 'enqueued' }
    ];

    const [value, setValue] = useState(new Set(JOB_TYPES.map(item => item.value)));

    const handleClick = (option: any) => {
        setValue(option);
    };

    const getValue = (): any => {
        var values = [];
        value.forEach(function (element) {
            values.push(element + ' ');
        });
        return values;
    }

    return (
        <div>
            {value.size != 0 && <div
                style={{
                    minHeight: 20,
                    backgroundColor: emerald,
                    padding: 8,
                    margin: '8px 0',
                }}
            >
                Selected Values :    {getValue()}
            </div>}
            <CheckboxGroupComponent
                options={JOB_TYPES}
                name='checkBoxGrp'
                selected={value}
                allLabel='All'
                onHandleChange={handleClick}
            />
        </div>
    );
};

export const CheckboxGroup = Template.bind({});
