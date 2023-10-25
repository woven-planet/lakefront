import { Meta, Story } from '@storybook/react';
import TransferListComponent from 'src/components/TransferList';
import DocBlock from '../../../.storybook/DocBlock';

export default {
    title: 'LakeFront/TransferList',
    component: TransferListComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story = () => {
    return <TransferListComponent />;
};

export const TransferList = Template.bind({});