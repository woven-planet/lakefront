import { Meta, Story } from '@storybook/react';


import DocBlock from '.storybook/DocBlock';
import Preview, { PreviewProps } from './Preview';

export default {
    title: 'Lakefront/Theme/Colors',
    component: Preview,
    parameters: {
        docs: {
            page: DocBlock
        }
    },
    argTypes: {
        sortBy: {
            table: {
                disable: true
            }
        }
    }
} as Meta;

const Template: Story<PreviewProps> = ({ sortBy }) => <Preview sortBy={sortBy} />;

export const SortedByColor = Template.bind({});
SortedByColor.args = {
    sortBy: 'color'
};

export const SortedByName = Template.bind({});
SortedByName.args = {
    sortBy: 'name'
}
