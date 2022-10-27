import { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import DocBlock from '.storybook/DocBlock';
import StepFunctionRendererComponent from 'src/components/StepFunctionRenderer/StepFunctionRenderer';
import { StepFunction } from 'src/components/StepFunctionRenderer/types';

export default {
    title: 'Lakefront/StepFunctionRenderer',
    component: StepFunctionRendererComponent,
    argTypes: {},
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const STEP_FUNCTION = {
    Comment: 'Parallel Example.',
    StartAt: 'LookupCustomerInfo',
    States: {
        LookupCustomerInfo: {
            Type: 'Parallel',
            End: true,
            Branches: [
                {
                    StartAt: 'LookupAddress',
                    States: {
                        LookupAddress: {
                            Type: 'Task',
                            Resource: 'abc',
                            End: true
                        }
                    }
                },
                {
                    StartAt: 'LookupPhone',
                    States: {
                        LookupPhone: {
                            Type: 'Task',
                            Resource: 'arn:aws:lambda:us-east-1:123456789012:function:PhoneFinder',
                            End: true
                        }
                    }
                }
            ]
        }
    }
};

const Template: Story = (args) => {
    const [json, setJson] = useState(args.stepFunctionJSON);

    useEffect(() => {
        setJson(args.stepFunctionJSON);
    }, [args.stepFunctionJSON]);

    return (
        <div>
            <StepFunctionRendererComponent stepFunctionJSON={json as StepFunction} />
        </div>
    );
};

export const StepFunctionRenderer = Template.bind({});
StepFunctionRenderer.args = {
    stepFunctionJSON: STEP_FUNCTION
};
