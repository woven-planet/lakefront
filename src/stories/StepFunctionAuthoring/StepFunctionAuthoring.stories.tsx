import { Meta, Story } from '@storybook/react/types-6-0';

import DocBlock from '.storybook/DocBlock';
import StepFunctionAuthoring from 'src/StepFunctionAuthoring/StepFunctionAuthoring';
import { choiceJson } from '../StepFunctionGraph/stepFunctionGraphData';

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

const Template: Story = (args) => <StepFunctionAuthoring {...args} />;

export const NewStepFunction = Template.bind({});
export const InitializedStepFunction = Template.bind({});

InitializedStepFunction.args = {
    initialGraphState: choiceJson
}
