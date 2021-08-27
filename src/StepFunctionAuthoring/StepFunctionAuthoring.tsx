import { ChangeEvent, FC, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import StepFunctionGraph from '../StepFunctionGraph/Graph';
import { JSONBuilderUtil } from '../StepFunctionGraph/utils/JSONBuilder.util';
import { Button, Input, RadioGroup } from '../index';
import Digraph from '../StepFunctionGraph/Digraph';
import { generateStepFunctionGraph, WorkFlowType } from '../StepFunctionGraph/StepFunctionUtil';
import { EditForm, Menu, SpacedButtons, StyledTypeLabel, SubmitWrapper, TypeSpan, Wrapper } from './stepFunctionAuthoringStyles';
import copy from '../lib/util/copy';

const typeOptions = [
    { label: WorkFlowType.TASK, value: WorkFlowType.TASK },
    { label: WorkFlowType.CHOICE, value: WorkFlowType.CHOICE },
    { label: WorkFlowType.SUCCEED, value: WorkFlowType.SUCCEED },
    { label: WorkFlowType.MAP, value: WorkFlowType.MAP },
    { label: WorkFlowType.PARALLEL, value: WorkFlowType.PARALLEL }
];

const DEFAULT_FORM_STATE = { name: '', next: '', nodeType: '' };
const DEFAULT_GRAPH_STATE = { States: {} };

const StepFunctionAuthoring: FC = () => {
    const JSONBuilder = useRef(new JSONBuilderUtil());
    const [json, setJson] = useState(DEFAULT_GRAPH_STATE);
    const graph = useMemo(() => generateStepFunctionGraph(json, new Digraph()), [json]);
    const [highlighted, setHighlighted] = useState<[key: string, vertex: number] | null>(null);
    const [selectedNode, setSelectedNode] = useState<any | null>();
    const [contextNode, setContextNode] = useState<[key: string, vertex: number] | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [menuCoordinates, setMenuCoordinates] = useState<[number, number]>([0, 0]);
    const [formState, setFormState] = useState(DEFAULT_FORM_STATE);

    useEffect(() => {
        JSONBuilder.current.addTask('Task');
        setJson(JSONBuilder.current.getJson());
    }, []);
    
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
    
            setFormState(prevState => ({ ...prevState, ...DEFAULT_FORM_STATE}));
        }
    };

    const handleContextClickNode = (key: string, vertex: number, e: MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = e;
        setMenuCoordinates([clientX, clientY]);
        setContextNode([key, vertex]);
        setShowMenu(true);
    };

    const handleCloseContextMenu = () => {
        setShowMenu(false);
        setContextNode(null);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(prevState => ({...prevState, ...{ name: e.target.value }}));
    };
    
    const handleNextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(prevState => ({...prevState, ...{ next: e.target.value }}));
    };

    const handleNodeTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(prevState => ({...prevState, ...{ nodeType: e.target.value }}));
    };

    const handleAddNode = () => {
        if (contextNode) {
            const [contextState, contextVertex] = contextNode;
            const contextNodeOutdegrees = graph.getOutdegree(contextVertex);
            const contextNodeData = graph.getDataByVertex(contextVertex);
            const [key] = Object.keys(contextNodeData);
            const { Type } = contextNodeData[key];
            
            // Get nodes the right-clicked node points to via outdegrees instead of Next since not every node has a Next
            const nextNodes = contextNodeOutdegrees.outVertices.map((vertex) => {
                const [key] = Object.keys(graph.getDataByVertex(vertex));
                return key;
            }).filter((next) => next !== 'End'); // "End" is reserved
            
            // Generate a unique node name
            const newKey = `Node ${new Date().getTime().toString()}`;
            
            // Point the right-clicked node to the new node
            JSONBuilder.current.editNode(contextState, {
                Next: newKey
            });
            
            const pointsToEnd = contextNodeOutdegrees.outVertices.includes(graph.V - 1);
            const isParallelOrMap = Type === WorkFlowType.PARALLEL || Type === WorkFlowType.PARALLEL;
            
            // Add the new node with a Next of what the right-clicked node pointed to so as to not orphan the rest of the graph
            JSONBuilder.current.addTask(newKey, pointsToEnd || isParallelOrMap ? undefined : nextNodes?.[0]);

            // Replace the old graph JSON to redraw
            setJson(prevState => ({...prevState, ...JSONBuilder.current.getJson()}));
            setShowMenu(false);
        }
        
        if (highlighted) {
            const [highlightedState] = highlighted;
            handleSelectedNode({ [highlightedState]: JSONBuilder.current.getNodeJson(highlightedState) });
        }
    };
    
    const handleAddChoice = () => {
        if (contextNode) {
            const [contextNodeState, contextNodeVertex] = contextNode;
            const data = graph.getDataByVertex(contextNodeVertex);
            const [key] = Object.keys(data);
            const { Choices = [] } = data[key];
            const newKey = `Node ${new Date().getTime().toString()}`;
            
            // New Choices will always point to the End until edited
            JSONBuilder.current.addTask(newKey, undefined, true);
    
            JSONBuilder.current.editNode(contextNodeState, {
                Choices: [...Choices, JSONBuilderUtil.getChoiceForAdd(newKey)]
            });
    
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
                Next: next ? next : undefined
            });
    
            // These node types all have unique fields in their objects and need to be handled separately
            if (nodeType === WorkFlowType.PARALLEL || nodeType === WorkFlowType.MAP || nodeType === WorkFlowType.CHOICE) {
                const newTask = `Node ${new Date().getTime().toString()}`;
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
                    }).filter((next) => next !== 'End');

                    JSONBuilder.current.editNode(highlightedNodeState, {
                        Branches: undefined,
                        Choices: outdegreeStates,
                        Iterator: undefined,
                        Next: undefined
                    });
                }
            }
    
            // Only update the name if it has changed
            if (name && name !== highlightedNodeState) {
                JSONBuilder.current.setNodeStateName(highlightedNodeState, name);
            }
    
            setJson(prevState => ({...prevState, ...JSONBuilder.current.getJson()}));
        }
    };
    
    const handleDelete = () => {
        // Indegree fields to reconnect
        // Task, Success: Next
        // Choice: Choices.forEach( (choice) => choice.Next) || Choice.Default
        // Map, Parallel: Next
        // Add orphans to array after (no indegrees and not the Start node)
        if (contextNode) {
            const [,contextNodeVertex] = contextNode;
            const { Type } = graph.getDataByVertex(contextNodeVertex);
        }
    };
    
    const handleCopy = () => {
        copy(JSONBuilder.current.toString());
    };
    
    const handleReset = () => {
        JSONBuilder.current.reset();
        JSONBuilder.current.addTask('Task');
        setJson(JSONBuilder.current.getJson());
        setFormState(DEFAULT_FORM_STATE);
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
            <li onClick={handleDelete}>Delete Node</li>
        </>
    );
    
    const choiceContextMenu = () => (
        <>
            <li onClick={handleAddChoice}>Add Choice</li>
            <li onClick={handleDelete}>Delete Node</li>
        </>
    );
    
    const mapAndParallelContextMenu = () => (
        <>
            <li onClick={handleAddNode}>Add Task After</li>
            <li onClick={handleAddNodeInside}>Add Task Inside</li>
            <li onClick={handleDelete}>Delete Node</li>
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
                <SpacedButtons>
                    <Button color='secondary' onClick={handleCopy}>Copy JSON To Clipboard</Button>
                    <Button color='destructive' onClick={handleReset}>Reset</Button>
                </SpacedButtons>
                <hr />
                <h3>Edit Node</h3>
                <Input onChange={handleNameChange} label='Name' value={formState.name} />
                <Input onChange={handleNextChange} label='Next' value={formState.next} />
                <StyledTypeLabel>
                    <TypeSpan>Type</TypeSpan>
                    <RadioGroup onChange={handleNodeTypeChange} name='Type' options={typeOptions} value={formState.nodeType} />
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
