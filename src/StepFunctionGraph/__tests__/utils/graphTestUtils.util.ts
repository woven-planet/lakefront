import { JSONBuilderUtil } from './JSONBuilder.util';

export const setupGraph = () => {
    const stepFunctionJSON = new JSONBuilderUtil()
        .addTask('StartNode', 'NodeTwo')
        .addTask('NodeTwo', 'EndNode')
        .addTask('EndNode', undefined, true)
        .toString();

    console.log(stepFunctionJSON);
};
