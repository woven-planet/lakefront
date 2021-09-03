import { WorkFlowType } from 'src/StepFunctionGraph/StepFunctionUtil';
import { StephFunctionAuthoringFormState } from 'src/StepFunctionAuthoring';

export const TYPE_OPTIONS = [
    { label: WorkFlowType.TASK, value: WorkFlowType.TASK },
    { label: WorkFlowType.CHOICE, value: WorkFlowType.CHOICE },
    { label: WorkFlowType.SUCCEED, value: WorkFlowType.SUCCEED },
    { label: WorkFlowType.MAP, value: WorkFlowType.MAP },
    { label: WorkFlowType.PARALLEL, value: WorkFlowType.PARALLEL }
];

export const FORM_KEYS = {
    NAME: 'name',
    NEXT: 'next',
    NODE_TYPE: 'nodeType'
};

export const DEFAULT_FORM_STATE: StephFunctionAuthoringFormState = { name: '', next: '', nodeType: '' };

export const DEFAULT_GRAPH_STATE = { States: {} };

/**
 * Generates a unique node name.
 */
export const generateNodeName = () => `node_${new Date().getTime().toString()}`;

const COMPLEX_NODES = [WorkFlowType.PARALLEL, WorkFlowType.MAP, WorkFlowType.CHOICE];

/**
 * Returns `true` if the type of the node is known to have unique
 * fields, generally requiring special handling.
 */
export const isComplexNode = (nodeType: WorkFlowType | '') => {
    if (!nodeType) {
        return false;
    }

    return COMPLEX_NODES.includes(nodeType);
};
