import { assocPath, has, last, omit, path as rPath, pipe } from 'ramda';

export type NodeType = 'Task' | 'Success' | 'Choice' | 'Map' | 'Parallel' | 'Catch' | string;

export interface CatchJSON {
    ErrorEquals: string[];
    Next: string;
}

export interface JSONStateObject {
    Type?: NodeType;
    Next?: string;
    End?: boolean;
    Catch?: CatchJSON[];
    Branches?: StepFunctionJSON[];
    Choices?: JSONStateObject[];
    Iterator?: StepFunctionJSON;
    Metadata?: {
        SortOrder?: number;
        NodePath?: string;
    }
}

export interface JSONState {
    [key: string]: JSONStateObject;
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

    addTaskAtPath(path: string, next?: string, end?: boolean): JSONBuilderUtil {
        const original = { ...this.json.States };
        const nodePath = Array.isArray(path) ? path : path.split('.');


        this.json.States = assocPath(nodePath, {
            Type: 'Task',
            ...(next && { Next: next }),
            ...(end && { End: end })
        }, original);

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

    addChoiceAtPath(state: string, choices: JSONStateObject[], next?: string, end?: boolean): JSONBuilderUtil {
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

    addNode(name: string, value: JSONStateObject, after: string): JSONBuilderUtil {
        const original = { ...this.json.States };

        const newState = Object.entries(original).reduce<[key: string, value: JSONStateObject][]>(
            (accum, current, idx) => {
                const [k, v] = current;

                if (k === after) {
                    return [
                        ...accum,
                        [k, { ...v, Metadata: { ...v?.Metadata, SortOrder: idx } }],
                        [name, { ...value, Metadata: { ...value?.Metadata, SortOrder: idx + 0.1 } }]
                    ];
                }

                return [...accum, [k, { ...v, Metadata: { ...v?.Metadata, SortOrder: idx } }]];
            },
            []
        );

        this.json.States = Object.fromEntries(newState);

        return this;
    }

    addNodeAfterPath(name: string, value: JSONStateObject, afterPath: string): JSONBuilderUtil {
        const original = { ...this.json.States };
        const parentPath = this.getNodeParentPath(afterPath);
        const parentValue = rPath<JSONState>(parentPath, original);

        if (parentValue) {
            const newState = Object.entries(parentValue).reduce<[key: string, value: JSONStateObject][]>(
                (accum, current, idx) => {
                    const [k, v] = current;
    
                    if (k === afterPath) {
                        return [
                            ...accum,
                            [k, { ...v, Metadata: { ...v?.Metadata, SortOrder: idx } }],
                            [name, { ...value, Metadata: { ...value?.Metadata, SortOrder: idx + 0.1 } }]
                        ];
                    }
    
                    return [...accum, [k, { ...v, Metadata: { ...v?.Metadata, SortOrder: idx } }]];
                },
                []
            );
    
            this.json.States = assocPath(parentPath, Object.fromEntries(newState), original);
        }


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

    editNameAtPath(path: string | string[], name: string): JSONBuilderUtil {
        const original = { ...this.json.States };
        const nodePath = Array.isArray(path) ? path : path.split('.');
        const nodeValue = rPath<JSONStateObject>(nodePath, original);
        const parentPath = this.getNodeParentPath(path);
        const parentValue = rPath<JSONStateObject>(parentPath, original);
        const oldName = last(nodePath);

        if (oldName && nodeValue) {
            const newParentValue = {
                ...omit([oldName], parentValue),
                [name]: nodeValue
            };

            this.json.States = assocPath(parentPath, newParentValue, original);
        }

        return this;
    }

    editNodeAtPath(path: string | string[], content: JSONStateObject): JSONBuilderUtil {
        const original = { ...this.json.States };
        const nodePath = Array.isArray(path) ? path : path.split('.');
        const nodeValue = rPath<JSONStateObject>(nodePath, original);

        const newStates = assocPath(
            nodePath,
            {
                ...nodeValue,
                ...content
            },
            original
        );

        this.json.States = newStates;

        return this;
    }

    getJson() {
        return this.json;
    }

    getNodeParentPath(path: string | string[]): string[] {
        const nodePath = Array.isArray(path) ? path : path.split('.');
        return nodePath.slice(0, nodePath.length - 1);
    }

    getNodeJson(state: string): JSONStateObject {
        return this.json.States[state];
    }

    getNodeJsonAtPath(path: string | string[]): JSONStateObject | undefined {
        const nodePath = Array.isArray(path) ? path : path.split('.');
        return rPath(nodePath, this.json.States);
    }

    setNodeStateName(state: string, newState: string) {
        this.json.States[newState] = { ...this.json.States[state] };
        delete this.json.States[state];
    }

    reset() {
        this.json = { States: {} };
    }

    toString() {
        return JSON.stringify(this.json);
    }
}
