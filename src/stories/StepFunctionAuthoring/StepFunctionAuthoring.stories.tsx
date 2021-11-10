import { useEffect, useState } from 'react';
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

const Template: Story = (args) => {
    // Use copy of args.initialGraphState since authoring
    // currently mutates data.
    const [json, setJson] = useState(args.initialGraphState ? { ...args.initialGraphState } : args.initialGraphState);

    useEffect(() => {
        // Force rerender if user changes args
        setJson(args.initialGraphState ? { ...args.initialGraphState } : args.initialGraphState);
    }, [args.initialGraphState]);

    return <StepFunctionAuthoring initialGraphState={json} />;
};

export const NewStepFunction = Template.bind({});
NewStepFunction.args = {
    initialGraphState: undefined
};

export const InitializedStepFunction = Template.bind({});
InitializedStepFunction.args = {
    initialGraphState: choiceJson
};
