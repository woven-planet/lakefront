import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DeviceProgressBarComponent, { DeviceProgressProps } from 'src/Progress/DeviceProgressBar';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Progress/DeviceProgress',
    component: DeviceProgressBarComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<DeviceProgressProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    return (
        <section style={{ display: 'inline-flex' }}>
            <DeviceProgressBarComponent {...args} />
        </section>
    );
};

export const DefaultProgressBar = Template.bind({});
DefaultProgressBar.args = {
    total: 1374389534720,
    used: 1175916642304,
    available: 198472892416,
    capacity: '86%'
};

export const BarWithCapacityAndSubTextBelow = Template.bind({});
BarWithCapacityAndSubTextBelow.args = {
    total: 1374389534720,
    used: 1175916642304,
    available: 198472892416,
    capacity: '86%',
    capacityLocation: 'below',
    capacitySubText: 'Full'
};
