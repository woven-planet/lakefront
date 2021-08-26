import { Meta, Story } from '@storybook/react/types-6-0';

import DocBlock from '.storybook/DocBlock';
import StepFunctionAuthoring from 'src/StepFunctionAuthoring/StepFunctionAuthoring';

export default {
    title: 'Lakefront/StepFunctionAuthoring',
    component: StepFunctionAuthoring,
    argTypes: {},
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story = (args) => <StepFunctionAuthoring />;

export const NewStepFunction = Template.bind({});
