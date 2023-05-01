import { Meta, Story } from '@storybook/react';

import DateRange, { DateRangeProps } from 'src/components/DateRange/DateRange';
import DocBlock from '.storybook/DocBlock';
import moment from 'moment-timezone';

export default {
    title: 'Lakefront/DateRange',
    component: DateRange,
    argTypes: {
        children: {
            table: {
                disable: true
            }
        },
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<DateRangeProps> = (args) => <DateRange {...args} />;

export const Regular = Template.bind({});
Regular.args = {
    startDate: moment(),
    endDate: moment()
};