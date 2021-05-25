import { Meta, Story } from '@storybook/react/types-6-0';

import LoadingComponent, { LoadingProps } from 'src/Loading/Loading';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/Loading',
    component: LoadingComponent,
    argTypes: {
        spinDirection: {
            control: {
                type: 'radio',
                options: ['LEFT', 'RIGHT']
            }
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
        }
    }
} as Meta;

const Template: Story<LoadingProps> = (args) => (
    <div style={{ display: 'flex' }}>
        <LoadingComponent {...args} />
    </div>
);

export const Loading = Template.bind({});

export const LoadingWithLabel = Template.bind({});
LoadingWithLabel.args = {
    label: 'Loading...'
};
