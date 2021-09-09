import { ChangeEvent, FC, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import StepFunctionGraph from 'src/StepFunctionGraph/Graph';
import { JSONBuilderUtil, JSONStateObject } from 'src/StepFunctionGraph/util/JSONBuilder.util';
import { Button, Input, RadioGroup } from '../index';
import Digraph from 'src/StepFunctionGraph/Digraph';
import { generateStepFunctionGraph, WorkFlowType } from 'src/StepFunctionGraph/StepFunctionUtil';
import { EditForm, Menu, StyledTypeLabel, SubmitWrapper, TypeSpan, Wrapper } from './stepFunctionAuthoringStyles';
import { DEFAULT_FORM_STATE, DEFAULT_GRAPH_STATE, FORM_KEYS, TYPE_OPTIONS, generateNodeName, isComplexNode } from './util';
import { StephFunctionAuthoringFormState, StepFunctionAuthoringSnapshot, StephFunctionAuthoringChangeType } from './types';

const StepFunctionAuthoring: FC = () => {
    // Graph State
    const JSONBuilder = useRef(new JSONBuilderUtil());
    const [json, setJson] = useState(DEFAULT_GRAPH_STATE);
    const [snapshots, setSnapshots] = useState<StepFunctionAuthoringSnapshot[]>([]);
    const graph = useMemo(() => generateStepFunctionGraph(json, new Digraph()), [json]);

    // Node State
    const [highlighted, setHighlighted] = useState<[key: string, vertex: number] | null>(null);
    const [selectedNode, setSelectedNode] = useState<any | null>();
    const [contextNode, setContextNode] = useState<[key: string, vertex: number] | null>(null);

    // Context Menu State
    const [showMenu, setShowMenu] = useState(false);
    const [menuCoordinates, setMenuCoordinates] = useState<[number, number]>([0, 0]);

    // Form State
    const [formState, setFormState] = useState<StephFunctionAuthoringFormState>(DEFAULT_FORM_STATE);

    useEffect(() => {
        // Initialize Graph Render
        JSONBuilder.current.addTask('Task');
        setJson(JSONBuilder.current.getJson());
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
            const vertex = graph.getVertexByKey(change.key);
            handleSelectedNode({ [change.key]: change.data }, vertex);
        }
    }, [graph]);

    const makeFormUpdateHandler = (key: string) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setFormState(prevState => ({...prevState, ...{ [key]: e.target.value }}));
        };
    };
    
    // Create a snapshot of current step function state
    const createSnapshot = (snapshotData: StepFunctionAuthoringSnapshot) => {
        setSnapshots(prevState => [
            {
                json,
                graph,
                highlighted,
                ...snapshotData
            },
            ...prevState
        ]);
    };
    
    const handleSelectedNode = (node: any, vertex?: number) => {
        if (node && vertex) {
            const [key] = Object.keys(node);

            setHighlighted([key, vertex]);
            setSelectedNode(node);

            setFormState(prevState => (
                {
                    ...prevState,
                    ...{ name: key, next: node[key].Next ?? '', nodeType: node[key].Type }
                }
            ));
        } else {
            setHighlighted(null);
            setSelectedNode(null);
    
            setFormState(prevState => ({ ...prevState, ...DEFAULT_FORM_STATE }));
        }
    };

    const handleContextClickNode = (key: string, vertex: number, nodeClick: MouseEvent<HTMLCanvasElement>, ctx: CanvasRenderingContext2D) => {
        const { clientX, clientY } = nodeClick;
        const { left, top } = ctx.canvas.getBoundingClientRect();

        setMenuCoordinates([clientX - left, clientY - top]);
        setContextNode([key, vertex]);
        setShowMenu(true);
    };

    const handleCloseContextMenu = () => {
        setShowMenu(false);
        setContextNode(null);
    };

    const handleAddNode = () => {
        if (contextNode) {
            const [contextState, contextVertex] = contextNode;
            const contextNodeOutdegrees = graph.getOutdegree(contextVertex);
            const contextNodeData = graph.getDataByVertex(contextVertex);
            const [key] = Object.keys(contextNodeData);
            const { Type: ContextNodeType, Next: ContextNodeNext } = contextNodeData[key];
            
            // Get nodes the right-clicked node points to via outdegrees instead of Next since not every node has a Next
            const nextNodes = contextNodeOutdegrees.outVertices.map((vertex) => {
                const [key] = Object.keys(graph.getDataByVertex(vertex));
                return key;
            }).filter((next) => next !== 'End'); // "End" is reserved
            
            // Generate a unique node name
            const newKey = generateNodeName();
            
            // Point the context (right-clicked) node to new target node
            JSONBuilder.current.editNode(contextState, {
                Next: newKey
            });
            
            const pointsToEndNode = contextNodeOutdegrees.outVertices.includes(graph.V - 1);
            const isParallelOrMap = ContextNodeType === WorkFlowType.PARALLEL || ContextNodeType === WorkFlowType.MAP;
            
            // Add the new node and set new node's "Next" property to context node's original "Next".
            // This avoids orphaning the rest of the graph.
            let nextNode: string | undefined;
            if (pointsToEndNode) {
                nextNode = undefined;
            } else {
                nextNode = isParallelOrMap ? ContextNodeNext : nextNodes?.[0];
            }
            JSONBuilder.current.addNode(
                newKey,
                {
                    Type: 'Task',
                    Next: nextNode
                },
                contextState
            );

            // Store change in snapshot history
            createSnapshot({
                change: {
                    type: StephFunctionAuthoringChangeType.ADD,
                    key: newKey,
                    data: JSONBuilder.current.getNodeJson(newKey)
                }
            });
            
            // Replace the old graph JSON to redraw
            setJson(prevState => ({...prevState, ...JSONBuilder.current.getJson()}));
            setShowMenu(false);

        }
        
        if (highlighted) {
            const [highlightedState] = highlighted;
            handleSelectedNode({ [highlightedState]: JSONBuilder.current.getNodeJson(highlightedState) });
        }
    };

    const addChoice = (parentKey: string, choiceKey: string = generateNodeName(), currentChoices: JSONStateObject[]) => {
        // New Choices will always point to the End until edited
        JSONBuilder.current.addTask(choiceKey, undefined, true);
    
        JSONBuilder.current.editNode(parentKey, {
            Choices: [...currentChoices, JSONBuilderUtil.getChoiceForAdd(choiceKey)]
        });
    };
    
    const handleAddChoice = () => {
        if (contextNode) {
            const [contextNodeState, contextNodeVertex] = contextNode;
            const data = graph.getDataByVertex(contextNodeVertex);
            const [key] = Object.keys(data);
            const { Choices = [] } = data[key];
            const newKey = generateNodeName();

            addChoice(contextNodeState, newKey, Choices);
    
            setJson(prevState => ({...prevState, ...JSONBuilder.current.getJson()}));
            setShowMenu(false);
        }
    };
    
    const handleAddNodeInside = () => {
         
    };

    const handleSave = () => {
        setShowMenu(false);

        if (highlighted) {
            const [highlightedNodeState, highlightedNodeVertex] = highlighted;
            const { name, next, nodeType } = formState;
            
            JSONBuilder.current.editNode(highlightedNodeState, {
                Type: nodeType,
                Next: next || undefined
            });
    
            // Complex nodes have unique fields in their objects and need to be handled separately
            if (isComplexNode(nodeType)) {
                const newTask = generateNodeName();
                const taskState = new JSONBuilderUtil().addTask(newTask, undefined, true).getJson();
    
                // Parallel has Branches
                if (nodeType === WorkFlowType.PARALLEL) {
                    JSONBuilder.current.editNode(highlightedNodeState, {
                        Branches: [taskState],
                        Choices: undefined,
                        Iterator: undefined
                    });
                }
                
                // Map has Iterator
                if (nodeType === WorkFlowType.MAP) {
                    JSONBuilder.current.editNode(highlightedNodeState, {
                        Branches: undefined,
                        Choices: undefined,
                        Iterator: taskState
                    });
                }
                
                // Choice has Choices
                if (nodeType === WorkFlowType.CHOICE) {
                    const outdegrees = graph.getOutdegree(highlightedNodeVertex);
                    const outdegreeStates = outdegrees.outVertices.map((vertex) => {
                        const [key] = Object.keys(graph.getDataByVertex(vertex));
                        return JSONBuilderUtil.getChoiceForAdd(key);
                    }).filter(({ Next }) => Next !== 'End');

                    JSONBuilder.current.editNode(highlightedNodeState, {
                        Branches: undefined,
                        Choices: outdegreeStates,
                        Iterator: undefined,
                        Next: undefined
                    });

                    if (outdegreeStates.length === 0) {
                        // Automatically add one choice if none exist to
                        // avoid orphan graph
                        addChoice(name || highlightedNodeState, undefined, outdegreeStates)
                    } 
                }
            }
    
            // Only update the name if it has changed
            if (name && name !== highlightedNodeState) {
                JSONBuilder.current.setNodeStateName(highlightedNodeState, name);

                // Get all parents of updated node
                const indegrees = graph.getIndegree(highlightedNodeVertex);
                const parentKeys = indegrees
                    .map((vertex) => {
                        const [key] = Object.keys(graph.getDataByVertex(vertex));
                        return key;
                    });

                // Redirect each parent to the new key name
                for (const parentKey of parentKeys) {
                    JSONBuilder.current.editNode(parentKey, {
                        Next: name
                    });
                }
            }

            // Store change in snapshot history
            createSnapshot({
                change: {
                    type: StephFunctionAuthoringChangeType.UPDATE,
                    key: name || highlightedNodeState,
                    data: JSONBuilder.current.getNodeJson(name || highlightedNodeState)
                }
            });
    
            setJson(prevState => ({...prevState, ...JSONBuilder.current.getJson()}));
        }
    };

    const handleCancel = () => {
        handleSelectedNode(selectedNode);
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
            const [,contextNodeVertex] = contextNode;
            const contextNodeData = graph.getDataByVertex(contextNodeVertex);
            
            const [key] = Object.keys(contextNodeData);
            const { Type } = contextNodeData[key];
            
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
        <Wrapper>
            <div>
                <StepFunctionGraph
                    highlightedKey={highlighted?.[0] ?? ''}
                    json={json}
                    handleContextClickNode={handleContextClickNode}
                    handleCloseContextMenu={handleCloseContextMenu}
                    handleSelectedNode={handleSelectedNode}
                />
                <Menu style={{ left: menuCoordinates[0], top: menuCoordinates[1]}} hidden={!showMenu}>
                    { getMenuItems() }
                </Menu>
            </div>
            <EditForm>
                <h3>Edit Node</h3>
                <Input onChange={makeFormUpdateHandler(FORM_KEYS.NAME)} label='Name' value={formState.name} />
                <Input onChange={makeFormUpdateHandler(FORM_KEYS.NEXT)} label='Next' value={formState.next} />
                <StyledTypeLabel>
                    <TypeSpan>Type</TypeSpan>
                    <RadioGroup onChange={makeFormUpdateHandler(FORM_KEYS.NODE_TYPE)} name='Type' options={TYPE_OPTIONS} value={formState.nodeType} />
                </StyledTypeLabel>
                <SubmitWrapper>
                    <Button disabled={!isFormValid()} onClick={handleSave}>Save</Button>
                    <Button color='destructive' onClick={handleCancel}>Cancel</Button>
                </SubmitWrapper>
            </EditForm>
        </Wrapper>
    );
};

export default StepFunctionAuthoring;
