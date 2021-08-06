export type NodeType = 'Task' | 'Choice' | 'Map' | 'Parallel';

export interface JSONState {
    [key: string]: {
        Type: NodeType;
        Next?: string;
        End?: boolean;
        Branches?: StepFunctionJSON[];
        Choices?: JSONState[];
        Iterator?: StepFunctionJSON;
    }
}

export interface StepFunctionJSON {
    States: JSONState;
}

export class JSONBuilderUtil {
    json: StepFunctionJSON;

    constructor() {
        this.json = { States: {} };
    }

    addTask(state: string, next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Task',
            ...(next && { Next: next }),
            ...(end && { End: end })
        };

        return this;
    }

    addChoice(state: string, choices: JSONState[], next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Choice',
            ...(next && { Next: next }),
            Choices: choices,
            ...(end && { End: end })
        };

        return this;
    }

    addMap(state: string, iterator: StepFunctionJSON, next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Map',
            ...(next && { Next: next }),
            Iterator: iterator,
            ...(end && { End: end })
        };

        return this;
    }

    addParallel(state: string, branches: StepFunctionJSON[], next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Parallel',
            ...(next && { Next: next }),
            Branches: branches,
            ...(end && { End: end })
        };

        return this;
    }

    editNode(state: string, content: JSONState): JSONBuilderUtil {
        const original = { ...this.json.States[state] };

        this.json.States[state] = {
            ...original,
            ...content
        };

        return this;
    }

    getJson() {
        return this.json;
    }

    toString() {
        return JSON.stringify(this.json);
    }
}
