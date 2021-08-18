export type NodeType = 'Task' | 'Success' | 'Choice' | 'Map' | 'Parallel' | string;

export interface JSONStateObject {
    Type?: NodeType;
    Next?: string;
    End?: boolean;
    Branches?: StepFunctionJSON[];
    Choices?: JSONStateObject[];
    Iterator?: StepFunctionJSON;
}

export interface JSONState {
    [key: string]: JSONStateObject
}

export interface StepFunctionJSON {
    States: JSONState;
}

export class JSONBuilderUtil {
    json: StepFunctionJSON = { States: {} };

    constructor(json?: StepFunctionJSON) {
        if (json) {
            this.json = json;
        }
    }

    static getChoiceForAdd(next: string): JSONStateObject {
        return {
            Next: next
        };
    }

    addTask(state: string, next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Task',
            ...(next && { Next: next }),
            ...(end && { End: end })
        };

        return this;
    }

    addSuccess(state: string, next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Success',
            ...(next && { Next: next }),
            ...(end && { End: end })
        };

        return this;
    }

    addChoice(state: string, choices: JSONStateObject[], next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Choice',
            Choices: choices,
            ...(next && { Next: next }),
            ...(end && { End: end })
        };

        return this;
    }

    addMap(state: string, iterator: StepFunctionJSON, next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Map',
            Iterator: iterator,
            ...(next && { Next: next }),
            ...(end && { End: end })
        };

        return this;
    }

    addParallel(state: string, branches: StepFunctionJSON[], next?: string, end?: boolean): JSONBuilderUtil {
        this.json.States[state] = {
            Type: 'Parallel',
            Branches: branches,
            ...(next && { Next: next }),
            ...(end && { End: end })
        };

        return this;
    }

    editNode(state: string, content: JSONStateObject): JSONBuilderUtil {
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

    getNodeJson(state: string): JSONStateObject {
        return this.json.States[state];
    }

    toString() {
        return JSON.stringify(this.json);
    }
}
