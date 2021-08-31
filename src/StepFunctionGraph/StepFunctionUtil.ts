import Digraph from './Digraph';
import DigraphDFS from './DigraphDFS';

export enum WorkFlowType {
    TASK = 'Task',
    CATCH = 'Catch',
    CHOICE = 'Choice',
    PARALLEL = 'Parallel',
    MAP = 'Map',
    SUCCEED = 'Succeed',
    START = 'Start',
    END = 'End'
}

const isTopLevel = (json: any, key: string) => {
    const { States } = json;
    const keys = Object.keys(States);
    return keys.includes(key);
};

// The start node needs to be added separately since it isn't captured in the paths
const addStart = (graph: Digraph) => {
    const startNode = {
        Start: {
            Type: WorkFlowType.START
        }
    };

    const vertex = {
        vertex: graph.V,
        data: startNode
    };

    graph.addVertex(vertex);
};

// The end node needs to be added separately since it isn't captured in the paths
const addEnd = (graph: Digraph): number => {
    const endNode = {
        End: {
            Type: WorkFlowType.END
        }
    };

    const vertex = {
        vertex: graph.V,
        data: endNode
    };

    return graph.addVertex(vertex);
};

// Connects vertices that need to connect to the End vertex together
const connectEnds = (graph: Digraph, endVertex: number, lastTopLevelVertex: number, json: any) => {
    const adjacencyMatrix = graph.getAdjacencyMatrix();
    const paths: number[][] = DigraphDFS.getAllDfsPaths(adjacencyMatrix, [0]);
    paths.forEach((path: number[]) => {
        path.forEach((vertex: number) => {
            const node = graph.getDataByVertex(vertex);
            const [key] = Object.keys(node);
            const { Type, Next } = node[key];
            const isTerminal = isTopLevel(json, key) && !Next && Type !== WorkFlowType.CHOICE;

            if (isTerminal) {
                graph.addEdge(vertex, endVertex);
            }
        });
    });
};

// Parallel nodes just feed all branch objects back into the parser
const handleParallel = (node: any, graph: Digraph, addedVertex: number, lastStateKey: string): Digraph => {
    const [key] = Object.keys(node);
    const { Branches } = node[key];

    Branches.forEach((branch: any) => {
        generateStepFunctionGraph(branch, graph, addedVertex, lastStateKey);
    });

    return graph;
};

const handleMap = (node: any, graph: Digraph, addedVertex: number, lastStateKey: string): Digraph => {
    const [key] = Object.keys(node);
    const { Iterator } = node[key];

    generateStepFunctionGraph(Iterator, graph, addedVertex, lastStateKey);

    return graph;
};

// Main parsing function for populating a Digraph from a given step function JSON
export const generateStepFunctionGraph = (json: any, graph: Digraph, connectFrom?: number, lastStateKey?: string) => {
    let isLastNode = false;

    // Add the start node if we don't have any vertices yet. V is the vertex count in the graph
    if (graph.V === 0) {
        addStart(graph);
    }

    const nodeKeys = Object.keys(json.States);
    const nodes = nodeKeys.map((key) => ({
        [key]: json.States[key]
    }));
    const lastNode = lastStateKey || nodeKeys[nodeKeys.length - 1];

    // Add vertices to graph and set the data for each
    nodes.forEach((node) => {
        const [key] = Object.keys(node);
        const vertex = {
            vertex: graph.V,
            data: node
        };

        const addedVertex = graph.addVertex(vertex);

        if (graph.V === 2) {
            graph.addEdge(0, 1);
        }

        // This is left open-ended as a switch to facilitate more types in the future that might need special handling
        // eslint-disable-next-line dot-notation
        switch (node[key]['Type']) {
            case WorkFlowType.PARALLEL:
                handleParallel(node, graph, addedVertex, lastNode);
                break;
            case WorkFlowType.MAP:
                handleMap(node, graph, addedVertex, lastNode);
                break;
            default:
                break;
        }

        // We need a special flag to determine the last node so we can properly add the end node
        if (key === lastNode) {
            isLastNode = true;
        }
    });

    // Handle Choice Type
    nodes.forEach((node) => {
        const [key] = Object.keys(node);
        const currentFindFn = (datum: any) => {
            const [dataKey] = Object.keys(datum);
            return dataKey === key;
        };

        const currentVertex = graph.getVertexByData(currentFindFn);

        // eslint-disable-next-line dot-notation
        if (node[key]['Type'] === WorkFlowType.CHOICE) {
            const { Choices, Default } = node[key];

            const choiceDefaultFindFn = (datum: any) => {
                const [dataKey] = Object.keys(datum);
                return dataKey === Default;
            };

            const choiceDefaultVertex = graph.getVertexByData(choiceDefaultFindFn);

            if (typeof currentVertex === 'number' && typeof choiceDefaultVertex === 'number') {
                graph.addEdge(currentVertex, choiceDefaultVertex);
            }

            Choices.forEach((choice: any) => {
                const { Next: choiceNext } = choice;

                const choiceNextFindFn = (datum: any) => {
                    const [dataKey] = Object.keys(datum);
                    return dataKey === choiceNext;
                };

                const choiceNextVertex = graph.getVertexByData(choiceNextFindFn);

                if (typeof currentVertex === 'number' && typeof choiceNextVertex === 'number') {
                    graph.addEdge(currentVertex, choiceNextVertex);
                }
            });
        }
    });

    const connectedFromNext = nodes.reduce((accum, node) => {
        const [key] = Object.keys(node);
        const d = node[key] || {};
        const { Next } = d;

        const nextVertexFindFn = (datum: any) => {
            const [dataKey] = Object.keys(datum);
            return dataKey === Next;
        };
        const nextVertex = graph.getVertexByData(nextVertexFindFn);
        return nextVertex ? accum.concat(nextVertex) : accum;
    }, []);

    // Connect the rest of the edges
    nodes.forEach((node) => {
        const [key] = Object.keys(node);
        const d = node[key] || {};
        const { Catch, Next } = d;

        const currentFindFn = (datum: any) => {
            const [dataKey] = Object.keys(datum);
            return dataKey === key;
        };

        const destinationFindFn = (datum: any) => {
            const [dataKey] = Object.keys(datum);
            return dataKey === Next;
        };

        const currentVertex = graph.getVertexByData(currentFindFn);
        const foundDestinationVertex = graph.getVertexByData(destinationFindFn);
        const destinationVertex = connectFrom ? currentVertex : foundDestinationVertex;

        Catch?.forEach((catchNode: any) => {
            const catchNext = catchNode.Next;
            const catchFindFn = (datum: any) => {
                const [dataKey] = Object.keys(datum);
                return dataKey === catchNext;
            };

            const foundCatchVertex = graph.getVertexByData(catchFindFn);

            if (foundCatchVertex && typeof currentVertex === 'number') {
                const catchData = graph.getDataByVertex(foundCatchVertex);
                graph.setVertexData(
                    {
                        vertex: foundCatchVertex,
                        data: {
                            ...{ [catchNext]: {
                                ...catchData[catchNext],
                                    Type: WorkFlowType.CATCH,
                                    ErrorEquals: catchNode.ErrorEquals
                            }}
                        }
                    }
                );
                graph.addEdge(currentVertex, foundCatchVertex);
            }
        });

        if (typeof destinationVertex === 'number' && typeof currentVertex === 'number') {
            const isVertexConnectedFromNext = connectedFromNext.includes(currentVertex);

            // Connect current vertex to a "Next" vertex if a Next is present
            if (Next && foundDestinationVertex) {
                graph.addEdge(currentVertex, foundDestinationVertex);
            }

            // Connect all vertices not connected from a "Next" field either to a previously connected
            // vertex or the current vertex
            if (!isVertexConnectedFromNext) {
                graph.addEdge(connectFrom ? connectFrom - 1 : currentVertex, destinationVertex);
            }
        }
    });

    const lastTopLevel = nodeKeys[nodeKeys.length - 1];
    const lastTopLevelFindFn = (datum: any) => {
        const [dataKey] = Object.keys(datum);
        return dataKey === lastTopLevel;
    };

    if (isLastNode) {
        const endVertex = addEnd(graph);
        const lastTopLevelVertex = graph.getVertexByData(lastTopLevelFindFn) || endVertex;
        connectEnds(graph, endVertex - 1, lastTopLevelVertex, json);
    }

    return graph;
};
