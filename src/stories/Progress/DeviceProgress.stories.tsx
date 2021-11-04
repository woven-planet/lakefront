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
            <DeviceProgressBarComponent used={args.used}
                available={args.available}
                total={args.total}
                capacity={args.capacity} />
        </section>
    );
};

export const DeviceProgressBar = Template.bind({});
DeviceProgressBar.args = {
    total: 1374389534720,
    used: 1175916642304,
    available: 198472892416,
    capacity: '86%'
};
