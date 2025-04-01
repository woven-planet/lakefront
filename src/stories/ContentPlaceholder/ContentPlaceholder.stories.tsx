import { Meta, Story } from '@storybook/react';

import ContentPlaceholder, { ContentPlaceholderProps } from 'src/components/ContentPlaceholder/ContentPlaceholder';
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/ContentPlaceholder',
    component: ContentPlaceholder,
    argTypes: {
        // spinDirection: {
        //     control: {
        //         type: 'radio',
        //         options: ['LEFT', 'RIGHT']
        //     }
        // }
    },
    parameters: {
        docs: {
            page: DocBlock,
        }
    }
} as Meta;

const Template: Story<ContentPlaceholderProps> = (args) => (
    <div style={{ display: 'flex' }}>
        <ContentPlaceholder {...args} />
    </div>
);

export const ContentPlaceholderWithDefaults = Template.bind({});
ContentPlaceholderWithDefaults.args = {
    // prop1: true
};

export const ContentPlaceholderOtherPropsExample = Template.bind({});
ContentPlaceholderOtherPropsExample.args ={
    // prop1: false
};
