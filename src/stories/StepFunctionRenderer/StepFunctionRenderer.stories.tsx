import { Meta, Story } from '@storybook/react/types-6-0';

import DocBlock from '.storybook/DocBlock';
import StepFunctionRenderer from 'src/StepFunctionRenderer/StepFunctionRenderer';
import { useState } from 'react';
import Button from 'src/Button/Button';

export default {
    title: 'Lakefront/StepFunctionRenderer',
    component: StepFunctionRenderer,
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

const SECOND_FUNCTION = {
    "StartAt": "Generate dataset",
    "States": {
      "Generate dataset": {
        "Resource": "arn:aws:lambda:us-west-2:123456789012:function:TrainAndBatchTransform-SeedingFunction-17RNSOTG97HPV",
        "Type": "Task",
        "Next": "Train model (XGBoost)"
      },
      "Train model (XGBoost)": {
        "Resource": "arn:aws:states:::sagemaker:createTrainingJob.sync",
        "Parameters": {
          "AlgorithmSpecification": {
            "TrainingImage": "433757028032.dkr.ecr.us-west-2.amazonaws.com/xgboost:latest",
            "TrainingInputMode": "File"
          },
          "OutputDataConfig": {
            "S3OutputPath": "s3://trainandbatchtransform-s3bucket-1jn1le6gadwfz/models"
          },
          "StoppingCondition": {
            "MaxRuntimeInSeconds": 86400
          },
          "ResourceConfig": {
            "InstanceCount": 1,
            "InstanceType": "ml.m4.xlarge",
            "VolumeSizeInGB": 30
          },
          "RoleArn": "arn:aws:iam::123456789012:role/TrainAndBatchTransform-SageMakerAPIExecutionRole-Y9IX3DLF6EUO",
          "InputDataConfig": [
            {
              "DataSource": {
                "S3DataSource": {
                  "S3DataDistributionType": "ShardedByS3Key",
                  "S3DataType": "S3Prefix",
                  "S3Uri": "s3://trainandbatchtransform-s3bucket-1jn1le6gadwfz/csv/train.csv"
                }
              },
              "ChannelName": "train",
              "ContentType": "text/csv"
            }
          ],
          "HyperParameters": {
            "objective": "reg:logistic",
            "eval_metric": "rmse",
            "num_round": "5"
          },
          "TrainingJobName.$": "$$.Execution.Name"
        },
        "Type": "Task",
        "Next": "Save Model"
      },
      "Save Model": {
        "Parameters": {
          "PrimaryContainer": {
            "Image": "433757028032.dkr.ecr.us-west-2.amazonaws.com/xgboost:latest",
            "Environment": {},
            "ModelDataUrl.$": "$.ModelArtifacts.S3ModelArtifacts"
          },
          "ExecutionRoleArn": "arn:aws:iam::123456789012:role/TrainAndBatchTransform-SageMakerAPIExecutionRole-Y9IX3DLF6EUO",
          "ModelName.$": "$.TrainingJobName"
        },
        "Resource": "arn:aws:states:::sagemaker:createModel",
        "Type": "Task",
        "Next": "Batch transform"
      },
      "Batch transform": {
        "Type": "Task",
        "Resource": "arn:aws:states:::sagemaker:createTransformJob.sync",
        "Parameters": {
          "ModelName.$": "$$.Execution.Name",
          "TransformInput": {
            "CompressionType": "None",
            "ContentType": "text/csv",
            "DataSource": {
              "S3DataSource": {
                "S3DataType": "S3Prefix",
                "S3Uri": "s3://trainandbatchtransform-s3bucket-1jn1le6gadwfz/csv/test.csv"
              }
            }
          },
          "TransformOutput": {
            "S3OutputPath": "s3://trainandbatchtransform-s3bucket-1jn1le6gadwfz/output"
          },
          "TransformResources": {
            "InstanceCount": 1,
            "InstanceType": "ml.m4.xlarge"
          },
          "TransformJobName.$": "$$.Execution.Name"
        },
        "End": true
      }
    }
  }
  
  

const Template: Story = (args) => {
    const [json, setJson] = useState(args.stepFunctionJSON);
    const [useFirst, setUseFirst] = useState(false);

    const handleChangeJson = () => {
        setJson(useFirst ? STEP_FUNCTION : SECOND_FUNCTION);
        console.log(useFirst, json)
        setUseFirst(prev => !prev);
    };

    return <div>
        <Button onClick={handleChangeJson}>Change JSON</Button>
        <StepFunctionRenderer stepFunctionJSON={json} />
    </div>;
};

export const RenderExample = Template.bind({});
RenderExample.args = {
    stepFunctionJSON: STEP_FUNCTION
}
