import { JSONBuilderUtil, StepFunctionJSON } from './JSONBuilder.util';
import Digraph from '../../Digraph';
import { generateStepFunctionGraph } from '../../StepFunctionUtil';

export const CANVAS_DEFAULTS = {
    pan: {
        offset: {
            x: 0,
            y: 0
        }
    },
    scale: 2,
    height: 1000,
    width: 1000
};

export const generateGraph = (json: StepFunctionJSON): Digraph => {
    const digraph = new Digraph();
    return generateStepFunctionGraph(json, digraph);
};
