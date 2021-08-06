import { JSONBuilder } from './JSONBuilder';

export const setupGraph = () => {
    const stepFunctionJSON = new JSONBuilder()
        .addTask('StartNode', 'NodeTwo')
        .addTask('NodeTwo', 'EndNode')
        .addTask('EndNode', undefined, true)
        .toString();

    console.log(stepFunctionJSON);
};
