import Digraph from 'src/StepFunctionGraph/Digraph';
import { WorkFlowType } from 'src/StepFunctionGraph/StepFunctionUtil';
import { JSONStateObject, StepFunctionJSON } from 'src/StepFunctionGraph/util/JSONBuilder.util';

export interface StephFunctionAuthoringFormState {
    name: string;
    next: string;
    nodeType: WorkFlowType | '';
}

export enum StephFunctionAuthoringChangeType {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete'
}

export interface StepFunctionAuthoringSnapshot {
    graph?: Digraph;
    json?: StepFunctionJSON;
    highlighted?: [key: string, vertex: number] | null;
    change?: {
        type: StephFunctionAuthoringChangeType,
        key: string;
        data: JSONStateObject
    };
}
