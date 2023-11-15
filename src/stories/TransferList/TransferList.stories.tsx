import { Meta, StoryFn } from '@storybook/react';
import TransferListComponent, { ListItem, TransferListProps } from 'src/components/TransferList';
import DocBlock from '.storybook/DocBlock';
import { useState } from 'react';

const JOB_TYPES_1: ListItem[] = [
    // { label: 'Finished', value: 'finished' },
    // { label: 'Cancelled', value: 'canceled' },
    // { label: 'Failed', value: 'failed' },
    // { label: 'Running', value: 'running' },
    {
        label: 'oad-guardian-virtual',
        description: 'virtual (generated) Guardian Dual Cockpit',
        value: 'oad-guardian-virtual virtual (generated) Guardian Dual Cockpit'
    },
    {
        label: 'oad-ollr',
        description: 'virtual (generated) p4a',
        value: 'oad-ollr virtual (generated) p4a'
    }
];

const JOB_TYPES_2: ListItem[] = [{ label: 'Pending', description: 'pending', value: 'enqueued' }];

export default {
    title: 'LakeFront/TransferList',
    component: TransferListComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: StoryFn<TransferListProps> = (args) => {
    const [currentJobStateList, setCurrentJobStateList] = useState<ListItem[]>(args.leftListData);
    const [availableJobStateList, setAvailableJobStateList] = useState<ListItem[]>(args.rightListData);

    const handleListChange = (leftList: ListItem[], rightList: ListItem[]) => {
        setCurrentJobStateList(leftList);
        setAvailableJobStateList(rightList);
    };

    return (
        <TransferListComponent
            leftListData={currentJobStateList}
            leftListName={args.leftListName}
            rightListData={availableJobStateList}
            rightListName={args.rightListName}
            onListChange={handleListChange}
        />
    );
};

export const TransferList = Template.bind({});
TransferList.args = {
    leftListData: JOB_TYPES_1,
    leftListName: 'Current Job States',
    rightListData: JOB_TYPES_2,
    rightListName: 'Available Job States'
};
