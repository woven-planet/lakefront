import { WorkFlowType } from 'src/StepFunctionGraph/StepFunctionUtil';

export interface StephFunctionAuthoringFormState {
    name: string;
    next: string;
    nodeType: WorkFlowType | '';
}
