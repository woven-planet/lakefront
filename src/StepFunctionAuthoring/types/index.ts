import { graphlib } from 'dagre-d3';
import { WorkFlowType } from 'src/StepFunctionGraph/StepFunctionUtil';
import { JSONStateObject, StepFunctionJSON } from 'src/StepFunctionGraph/util/JSONBuilder.util';

export interface StephFunctionAuthoringFormState {
    name: string;
    next: string;
    nodeType: WorkFlowType | '';
}

export enum StepFunctionAuthoringChangeType {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete',
    RESET = 'reset'
}

interface StepFunctionGeneralChange {
    type: StepFunctionAuthoringChangeType,
    key: string;
    data?: JSONStateObject | StepFunctionJSON
}

interface StepFunctionAddChange extends StepFunctionGeneralChange {
    type: StepFunctionAuthoringChangeType.ADD
}

export interface StepFunctionAuthoringSnapshot {
    graph?: graphlib.Graph | null;
    json?: StepFunctionJSON;
    highlighted?: { key: string; data: JSONStateObject } | null;
    change?: StepFunctionAddChange | StepFunctionGeneralChange;
}
