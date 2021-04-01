import { Meta, Story } from '@storybook/react/types-6-0';

import SelectPopover from 'src/SelectPopover/SelectPopover';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/SelectPopover',
    component: SelectPopover,
    argTypes: {
        children: {
            table: {
                disable: true
            }
        }
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story = (args) => <SelectPopover {...args} />;

export const PopoverOpen = Template.bind({});
PopoverOpen.args = {

};
