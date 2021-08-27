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
    const [highlighted, setHighlighted] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<any | null>();
    const [contextNode, setContextNode] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [menuCoordinates, setMenuCoordinates] = useState<[number, number]>([0, 0]);
    const [formState, setFormState] = useState(DEFAULT_FORM_STATE);

    useEffect(() => {
        JSONBuilder.current.addTask('Task');
        setJson(JSONBuilder.current.getJson());
    }, []);
    
    const handleSelectedNode = (node: any) => {
        if (node) {
            const [key] = Object.keys(node);
            setHighlighted(key);
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

    const handleContextClickNode = (key: string, e: MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = e;
        setMenuCoordinates([clientX, clientY]);
        setContextNode(key);
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
            const contextVertex = graph.getVertexByData((datum: any) => {
                const [key] = Object.keys(datum);
                return key === contextNode;
            }) ?? -1;
            const contextNodeOutdegrees = graph.getOutdegree(contextVertex);
            
            // Get nodes the right-clicked node points to via outdegrees instead of Next since not every node has a Next
            const nextNodes = contextNodeOutdegrees.outVertices.map((vertex) => {
                const [key] = Object.keys(graph.getDataByVertex(vertex));
                return key;
            }).filter((next) => next !== 'End'); // End is reserved
            
            // Generate a unique node name
            const newKey = `Node ${new Date().getTime().toString()}`;
            
            // Point the right-clicked node to the new node
            JSONBuilder.current.editNode(contextNode, {
                Next: newKey
            });
            
            // Add the new node with a Next of what the right-clicked node pointed to so as to not orphan the rest of the graph
            JSONBuilder.current.addTask(newKey, nextNodes?.[0]);

            // Replace the old graph JSON to redraw
            setJson(prevState => ({...prevState, ...JSONBuilder.current.getJson()}));
            setShowMenu(false);
        }
    };

    const handleSave = () => {
    
    };
    
    const handleDelete = () => {
    
    };
    
    const handleCopy = () => {
        copy(JSONBuilder.current.toString());
    };
    
    const handleReset = () => {
        JSONBuilder.current.reset();
        JSONBuilder.current.addTask('Task');
        setJson(JSONBuilder.current.getJson());
    };
    
    const handleCancel = () => {
        handleSelectedNode(selectedNode);
    };
    
    const isFormValid = (): boolean => {
        return formState.name !== '' && formState.name !== 'End';
    };

    return (
        <Wrapper>
            <div>
                <StepFunctionGraph
                    highlightedKey={highlighted}
                    json={json}
                    handleContextClickNode={handleContextClickNode}
                    handleCloseContextMenu={handleCloseContextMenu}
                    handleSelectedNode={handleSelectedNode}
                />
                <Menu style={{ left: menuCoordinates[0], top: menuCoordinates[1]}} hidden={!showMenu}>
                    <li onClick={handleAddNode}>Add Node After</li>
                    <li>Delete Node</li>
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
                    <Button disabled={isFormValid()}>Save</Button>
                    <Button color='destructive' onClick={handleCancel}>Cancel</Button>
                </SubmitWrapper>
            </EditForm>
        </Wrapper>
    );
};

export default StepFunctionAuthoring;
