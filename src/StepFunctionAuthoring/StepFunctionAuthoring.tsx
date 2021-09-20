import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { JSONBuilderUtil, JSONStateObject, StepFunctionJSON } from 'src/StepFunctionGraph/util/JSONBuilder.util';
import { Button, Input, RadioGroup } from '../index';
import { addMetadata, WorkFlowType } from 'src/StepFunctionGraph/StepFunctionUtil';
import { EditForm, Menu, StyledTypeLabel, SubmitWrapper, TypeSpan, Wrapper } from './stepFunctionAuthoringStyles';
import StepFunctionRenderer from 'src/StepFunctionRenderer/StepFunctionRenderer';
import {
    DEFAULT_FORM_STATE,
    DEFAULT_GRAPH_STATE,
    FORM_KEYS,
    TYPE_OPTIONS,
    generateNodeName,
    isComplexNode
} from './util';
import {
    StephFunctionAuthoringFormState,
    StepFunctionAuthoringSnapshot,
    StephFunctionAuthoringChangeType
} from './types';
import omit from 'ramda/src/omit';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

interface StepFunctionAuthoringProps {
    /**
     * The initial Step Function JSON to supply to the graph. If left empty,
     * a configuration with a single task node will be used.
     */
    initialGraphState?: StepFunctionJSON;
}

/**
 * Step Function Authoring Component
 *
 * The Step Function Authoring component can be used to build AWS Step Function JSON using an interactive 2D canvas and editing form.
 * It is a layer on top of the [StepFunctionGraph Component](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stepfunctiongraph--simple-graph)
 * and includes all of the panning and highlighting functionality. Added to that functionality is right-click actions allowing
 * for contextual updates to the graph.
 */
const StepFunctionAuthoring: FC<StepFunctionAuthoringProps> = ({ initialGraphState }) => {
    // Graph State
    const JSONBuilder = useRef(new JSONBuilderUtil(initialGraphState));
    const [json, setJson] = useState<StepFunctionJSON>(DEFAULT_GRAPH_STATE);
    const [snapshots, setSnapshots] = useState<StepFunctionAuthoringSnapshot[]>([]);

    const [_graph, _setGraph] = useState(null);
    const [_states, _setStates] = useState(null);

    // Node State
    const [highlighted, setHighlighted] = useState<{ key: string; data: JSONStateObject } | null>(null);
    const [selectedNode, setSelectedNode] = useState<{ key: string; data: JSONStateObject } | null>(null);
    const [contextNode, setContextNode] = useState<{ key: string; data: JSONStateObject } | null>(null);

    // Context Menu State
    const [showMenu, setShowMenu] = useState(false);
    const [menuCoordinates, setMenuCoordinates] = useState<[number, number]>([0, 0]);

    // Form State
    const [formState, setFormState] = useState<StephFunctionAuthoringFormState>(DEFAULT_FORM_STATE);

    useEffect(() => {
        // Initialize Graph Render
        if (!initialGraphState) {
            JSONBuilder.current.addTask('Task', undefined, true);
            JSONBuilder.current.editRootJSON({ ...JSONBuilder.current.json, StartAt: 'Task' });
        }
        updateJson(JSONBuilder.current.getJson());
    }, []);

    useEffect(() => {
        // Update graph with any post draw configuration
        if (!snapshots.length) {
            return;
        }

        // Detect any stored changes
        const [{ change }] = snapshots;

        // Highlight and select added node for editing
        if (change?.type === StephFunctionAuthoringChangeType.ADD) {
            handleSelectedNode(change.key, change.data || null);
        }
    }, [json, snapshots]);

    const updateJson = (origJson: StepFunctionJSON) => {
        // Add JSON Metadata
        const RESERVED_KEYS = ['StartAt', 'End'];
        /**
         * Returns `true` if the name provided is a Reserved
         * key name.
         */
        const isReservedKeyName = (name: string) => {
            return RESERVED_KEYS.includes(name);
        };
        const nodeKeys = Object.keys(origJson.States);
        nodeKeys
            .filter((key) => !isReservedKeyName(key))
            .map((key) => {
                // if (updateMetaData) {
                addMetadata('', key, origJson.States[key]);
                // }

                return {
                    [key]: origJson.States[key]
                };
            })
            .sort((nodeA: JSONStateObject, nodeB: JSONStateObject) => {
                if (nodeA?.Metadata?.SortOrder && nodeB?.Metadata?.SortOrder) {
                    return nodeA.Metadata.SortOrder - nodeB.Metadata.SortOrder;
                }

                return 0;
            });

        setJson(() => ({ ...origJson }));
    };

    const makeFormUpdateHandler = (key: string) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setFormState((prevState) => ({ ...prevState, ...{ [key]: e.target.value } }));
        };
    };

    // Create a snapshot of current step function state
    const createSnapshot = (snapshotData: StepFunctionAuthoringSnapshot) => {
        setSnapshots((prevState) => [
            {
                json,
                graph: _graph,
                highlighted,
                ...snapshotData
            },
            ...prevState
        ]);
    };

    const handleSelectedNode = (key: string, node: JSONStateObject | null) => {
        if (node) {
            setHighlighted({
                data: node,
                key
            });
            setSelectedNode({
                data: node,
                key
            });

            const { Next, Type } = node;

            setFormState((prevState) => ({
                ...prevState,
                ...{ name: key, next: Next ?? '', nodeType: Type as WorkFlowType }
            }));
        } else {
            setHighlighted(null);
            setSelectedNode(null);

            setFormState((prevState) => ({ ...prevState, ...DEFAULT_FORM_STATE }));
        }
    };

    const handleContextClickNode = (
        key: string,
        node: JSONStateObject,
        event: PointerEvent,
        graphContainer: SVGElement
    ) => {
        const { view, pageX, pageY } = event;
        const { left, top } = graphContainer.getBoundingClientRect();
        const scrollY = view?.scrollY || 0;
        const scrollX = view?.scrollX || 0;

        setMenuCoordinates([pageX + 50 - left - scrollX, pageY + 10 - top - scrollY]);
        setContextNode({
            data: node,
            key
        });
        setShowMenu(true);
    };

    const handleCloseContextMenu = () => {
        setShowMenu(false);
        setContextNode(null);
    };

    const handleAddNode = () => {
        if (contextNode && contextNode.data?.Metadata?.NodePath && _graph) {
            const nodePath = contextNode.data.Metadata.NodePath;
            const { Type: ContextNodeType, Next: ContextNodeNext } = contextNode.data;

            // Lookup nodes the right-clicked node points to
            const nextNodes = Object.keys(_graph._edgeObjs)
                .filter((k) => k.startsWith(contextNode.key))
                .map((k) => {
                    return _graph._edgeObjs[k].w;
                });

            // Generate a unique node name
            const newKey = generateNodeName();

            // Point the context (right-clicked) node to new target node
            JSONBuilder.current.editNodeAtPath(nodePath, {
                Next: newKey
            });

            const [endNodeKey] = Object.entries(_graph._nodes).find(([, value]) => value.label === 'End');
            const pointsToEndNode = nextNodes.includes(endNodeKey);
            const isParallelOrMap = ContextNodeType === WorkFlowType.PARALLEL || ContextNodeType === WorkFlowType.MAP;

            // Add the new node and set new node's "Next" property to context node's original "Next".
            // This avoids orphaning the rest of the graph.
            let nextNode: string | undefined;
            if (pointsToEndNode) {
                nextNode = undefined;
            } else {
                nextNode = isParallelOrMap ? ContextNodeNext : nextNodes?.[0];
            }
            JSONBuilder.current.addOrderedNode(
                newKey,
                {
                    Type: 'Task',
                    Next: nextNode
                },
                {
                    siblingPath: nodePath
                }
            );

            // Store change in snapshot history
            createSnapshot({
                change: {
                    type: StephFunctionAuthoringChangeType.ADD,
                    key: newKey,
                    data: JSONBuilder.current.getNodeJsonAtPath(nodePath)
                }
            });

            // Replace the old graph JSON to redraw
            // TODO: Might need to create a function version of this.
            // updateJson((prevState) => ({ ...prevState, ...JSONBuilder.current.getJson() }));
            updateJson(JSONBuilder.current.getJson());
            setShowMenu(false);
        }

        if (highlighted) {
            const [highlightedState] = highlighted;
            handleSelectedNode({ [highlightedState]: JSONBuilder.current.getNodeJson(highlightedState) });
        }
    };

    const addChoiceAtPath = (
        path: string,
        choiceKey: string = generateNodeName(),
        currentChoices: JSONStateObject[]
    ) => {
        // New Choices will always point to the End until edited
        JSONBuilder.current.addTaskAtPath([...JSONBuilderUtil.getNodeParentPath(path), choiceKey], undefined, true);

        JSONBuilder.current.editNodeAtPath(path, {
            Choices: [...currentChoices, JSONBuilderUtil.getChoiceForAdd(choiceKey)],
            End: undefined
        });
    };

    const handleAddChoice = () => {
        if (contextNode && contextNode?.data?.Metadata?.NodePath) {
            const { Choices = [] } = contextNode.data;
            const newKey = generateNodeName();

            addChoiceAtPath(contextNode.data.Metadata.NodePath, newKey, Choices);

            updateJson(JSONBuilder.current.getJson());
            setShowMenu(false);
        }
    };

    const handleAddNodeInside = () => {
        // setShowMenu(false);
        // if (contextNode) {
        //     const [, contextNodeVertex] = contextNode;
        //     const contextNodeData = graph.getDataByVertex(contextNodeVertex);
        //     const [key] = Object.keys(contextNodeData);
        //     const { Type } = contextNodeData[key];
        //     // Generate a unique node name
        //     const newKey = generateNodeName();
        //     if (Type === WorkFlowType.MAP) {
        //         const [[firstMapNodeKey]] = Object.entries<JSONStateObject>(contextNodeData[key].Iterator.States).sort(
        //             ([, nodeA], [, nodeB]) => {
        //                 {
        //                     if (nodeA?.Metadata?.SortOrder && nodeB?.Metadata?.SortOrder) {
        //                         return nodeA.Metadata.SortOrder - nodeB.Metadata.SortOrder;
        //                     }
        //                     return 0;
        //                 }
        //             }
        //         );
        //         const firstMapNode = contextNodeData[key].Iterator.States[firstMapNodeKey];
        //         const newNode = {
        //             Type: 'Task',
        //             Next: firstMapNodeKey
        //         };
        //         JSONBuilder.current.addOrderedNode(newKey, newNode, {
        //             siblingPath: firstMapNode.Metadata.NodePath,
        //             after: false
        //         });
        //         JSONBuilder.current.editNodeAtPath(`${contextNodeData[key].Metadata.NodePath}.Iterator`, {
        //             StartAt: newKey
        //         });
        //         // Store change in snapshot history
        //         createSnapshot({
        //             change: {
        //                 type: StephFunctionAuthoringChangeType.ADD,
        //                 key: newKey,
        //                 data: newNode
        //             }
        //         });
        //     }
        //     if (Type === WorkFlowType.PARALLEL) {
        //         const currentBranches = contextNodeData[key].Branches;
        //         const taskBuilder = new JSONBuilderUtil({ StartAt: '', States: {} }).addTask(newKey, undefined, true);
        //         const taskBase = {};
        //         addMetadata(
        //             `${contextNodeData[key].Metadata.NodePath}.Branches.${currentBranches.length}.States`,
        //             newKey,
        //             taskBase
        //         );
        //         taskBuilder.editNodeAtPath(newKey, taskBase);
        //         JSONBuilder.current.editNodeAtPath(contextNodeData[key].Metadata.NodePath, {
        //             Branches: [...currentBranches, { ...taskBuilder.getJson(), StartAt: newKey }],
        //             Choices: undefined,
        //             Iterator: undefined
        //         });
        //         // Store change in snapshot history
        //         createSnapshot({
        //             change: {
        //                 type: StephFunctionAuthoringChangeType.ADD,
        //                 key: newKey,
        //                 data: taskBuilder.getJson()
        //             }
        //         });
        //     }
        // TODO: Might need to create a function version of this.
        //     updateJson((prevState) => ({ ...prevState, ...JSONBuilder.current.getJson() }));
        //     updateJson(JSONBuilder.current.getJson());
        // }
    };

    const handleSave = () => {
        setShowMenu(false);

        if (selectedNode && selectedNode?.data?.Metadata?.NodePath) {
            const { name, next, nodeType } = formState;
            const {
                data: {
                    Metadata: { NodePath }
                }
            } = selectedNode;

            JSONBuilder.current.editNodeAtPath(NodePath, {
                Type: nodeType,
                Next: next || undefined
            });

            // Complex nodes have unique fields in their objects and need to be handled separately
            if (isComplexNode(nodeType)) {
                const newTask = generateNodeName();
                const taskBuilder = new JSONBuilderUtil({ StartAt: '', States: {} }).addTask(newTask, undefined, true);
                const taskBase = {};

                // Parallel has Branches
                if (nodeType === WorkFlowType.PARALLEL) {
                    addMetadata(`${NodePath}.Branches.0.States`, newTask, taskBase);
                    taskBuilder.editNodeAtPath(newTask, taskBase);

                    JSONBuilder.current.editNodeAtPath(NodePath, {
                        Branches: [{ ...taskBuilder.getJson(), StartAt: newTask }],
                        Choices: undefined,
                        Iterator: undefined
                    });
                }

                // Map has Iterator
                if (nodeType === WorkFlowType.MAP) {
                    addMetadata(`${NodePath}.Iterator.States`, newTask, taskBase);
                    taskBuilder.editNodeAtPath(newTask, taskBase);

                    JSONBuilder.current.editNodeAtPath(NodePath, {
                        Branches: undefined,
                        Choices: undefined,
                        Iterator: { ...taskBuilder.getJson(), StartAt: newTask }
                    });
                }

                // Choice has Choices
                if (nodeType === WorkFlowType.CHOICE) {
                    const nextNodes = Object.keys(_graph._edgeObjs)
                        .filter((k) => k.startsWith(selectedNode.key))
                        .map((k) => {
                            return _graph._edgeObjs[k].w;
                        });
                    const [endNodeKey] = Object.entries(_graph._nodes).find(([, value]) => value.label === 'End');
                    const outdegreeStates = nextNodes
                        .map((name, idx) => {
                            const choiceForAdd = JSONBuilderUtil.getChoiceForAdd(name);
                            addMetadata(`${NodePath}.Choices`, idx, choiceForAdd);

                            return choiceForAdd;
                        })
                        .filter(({ Next }) => Next !== endNodeKey);

                    JSONBuilder.current.editNodeAtPath(NodePath, {
                        Branches: undefined,
                        Choices: outdegreeStates,
                        Iterator: undefined,
                        Next: undefined
                    });

                    if (outdegreeStates.length === 0) {
                        // Automatically add one choice if none exist to
                        // avoid orphan graph
                        addChoiceAtPath(NodePath, undefined, outdegreeStates);
                    }
                }
            }

            // Only update the name if it has changed
            if (name && name !== selectedNode.key) {
                JSONBuilder.current.editNameAtPath(NodePath, name);

                // Get all parents of updated node
                const previousNodes = Object.keys(_graph._edgeObjs)
                    .filter((k) => k.endsWith(selectedNode.key))
                    .map((k) => {
                        return _graph._edgeObjs[k].v;
                    });
                const parentPaths = !_states
                    ? []
                    : previousNodes.map((name) => {
                          return _states[name]?.Metadata?.NodePath;
                      });

                // Redirect each parent to the new key name
                for (const path of parentPaths) {
                    if (path) {
                        JSONBuilder.current.editNodeAtPath(path, {
                            Next: name
                        });
                    }
                }
            }

            // Store change in snapshot history
            createSnapshot({
                change: {
                    type: StephFunctionAuthoringChangeType.UPDATE,
                    key: name || selectedNode.key,
                    data: JSONBuilder.current.getNodeJsonAtPath(NodePath)
                }
            });
            // TODO: Might need to create a function version of this.

            // updateJson((prevState) => ({ ...omit(selectedNode.key, prevState), ...JSONBuilder.current.getJson() }));
            updateJson(JSONBuilder.current.getJson());
        }
    };

    const handleCancel = () => {
        handleSelectedNode(selectedNode);
    };

    const _handleGraphCreate = (g: any, states: any) => {
        _setGraph(g);
        _setStates(states);
    };

    const isFormValid = (): boolean => {
        return highlighted !== null && formState.name !== '' && formState.name !== 'End';
    };

    const taskContextMenu = () => (
        <>
            <li onClick={handleAddNode}>Add Task After</li>
        </>
    );

    const choiceContextMenu = () => (
        <>
            <li onClick={handleAddChoice}>Add Choice</li>
        </>
    );

    const mapAndParallelContextMenu = () => (
        <>
            <li onClick={handleAddNode}>Add Task After</li>
            <li onClick={handleAddNodeInside}>Add Task Inside</li>
        </>
    );

    const getMenuItems = () => {
        if (contextNode) {
            const { Type } = contextNode.data;

            switch (Type) {
                case WorkFlowType.CHOICE:
                    return choiceContextMenu();
                case WorkFlowType.PARALLEL:
                    return mapAndParallelContextMenu();
                case WorkFlowType.MAP:
                    return mapAndParallelContextMenu();
                default:
                    return taskContextMenu();
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <div>
                    <StepFunctionRenderer
                        stepFunctionJSON={json}
                        highlightedKey={highlighted?.[0] ?? ''}
                        handleContextClickNode={handleContextClickNode}
                        handleCloseContextMenu={handleCloseContextMenu}
                        handleSelectedNode={handleSelectedNode}
                        onGraphCreate={_handleGraphCreate}
                    />
                    <Menu style={{ left: menuCoordinates[0], top: menuCoordinates[1] }} hidden={!showMenu}>
                        {getMenuItems()}
                    </Menu>
                </div>
                <EditForm>
                    <h3>Edit Node</h3>
                    <Input onChange={makeFormUpdateHandler(FORM_KEYS.NAME)} label="Name" value={formState.name} />
                    <Input onChange={makeFormUpdateHandler(FORM_KEYS.NEXT)} label="Next" value={formState.next} />
                    <StyledTypeLabel>
                        <TypeSpan>Type</TypeSpan>
                        <RadioGroup
                            onChange={makeFormUpdateHandler(FORM_KEYS.NODE_TYPE)}
                            name="Type"
                            options={TYPE_OPTIONS}
                            value={formState.nodeType}
                        />
                    </StyledTypeLabel>
                    <SubmitWrapper>
                        <Button disabled={!isFormValid()} onClick={handleSave}>
                            Save
                        </Button>
                        <Button color="destructive" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </SubmitWrapper>
                </EditForm>
            </Wrapper>
        </ThemeProvider>
    );
};

export default StepFunctionAuthoring;
