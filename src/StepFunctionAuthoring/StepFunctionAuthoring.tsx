import { ChangeEvent, FC, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import StepFunctionGraph from '../StepFunctionGraph/Graph';
import { JSONBuilderUtil } from '../StepFunctionGraph/utils/JSONBuilder.util';
import styled from '@emotion/styled';
import { Button, Input, RadioGroup, theme } from '../index';
import Digraph from '../StepFunctionGraph/Digraph';
import { generateStepFunctionGraph, WorkFlowType } from '../StepFunctionGraph/StepFunctionUtil';

const typeOptions = [
    { label: WorkFlowType.TASK, value: WorkFlowType.TASK },
    { label: WorkFlowType.CHOICE, value: WorkFlowType.CHOICE },
    { label: WorkFlowType.SUCCEED, value: WorkFlowType.SUCCEED },
    { label: WorkFlowType.MAP, value: WorkFlowType.MAP },
    { label: WorkFlowType.PARALLEL, value: WorkFlowType.PARALLEL }
];

const Wrapper = styled.div({
    display: 'flex',
    '& > div:first-of-type': {
        height: 700,
        width: '100%',
        maxWidth: 1000
    }
});

const SubmitWrapper = styled.div({
    display: 'flex',
    marginTop: 32,
    'button:first-of-type': {
        marginRight: 8
    }
});

const EditForm = styled.div({
    backgroundColor: theme.colors.selago,
    borderLeft: theme.borders.primary,
    padding: 8
});

const TypeSpan = styled.span({
    display: 'block',
    marginBottom: 8
});

const StyledRadioGroup = styled(RadioGroup)({
   label: {
       marginBottom: 8
   }
});

const Menu = styled.ul({
    backgroundColor: theme.colors.white,
    border: theme.borders.primary,
    padding: 0,
    position: 'absolute',
    transform: 'translateX(-30%)',
    li: {
        listStyle: 'none',
        padding: '4px 8px',
        ':hover': {
            backgroundColor: theme.colors.mercury,
            cursor: 'pointer'
        }
    }
});

const StepFunctionAuthoring: FC = () => {
    const JSONBuilder = useRef(new JSONBuilderUtil());
    const [json, setJson] = useState({ States: {} });
    const graph = useMemo(() => generateStepFunctionGraph(json, new Digraph()), [json]);
    const [highlighted, setHighlighted] = useState<string | null>(null);
    const [contextNode, setContextNode] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [menuCoordinates, setMenuCoordinates] = useState<[number, number]>([0, 0]);
    const [formState, setFormState] = useState({ name: '', nodeType: '' });

    useEffect(() => {
        JSONBuilder.current.addTask('Task');
        setJson(JSONBuilder.current.getJson());
    }, []);

    const handleSelectedNode = (node: any) => {
        if (node) {
            const [key] = Object.keys(node);
            setHighlighted(key);

            setFormState(prevState => ({ ...prevState, ...{ name: key, nodeType: node[key].Type }}));
        } else {
            setHighlighted(null);
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
            const nextNodes = contextNodeOutdegrees.outVertices.map((vertex) => {
                const [key] = Object.keys(graph.getDataByVertex(vertex));
                return key;
            }).filter((next) => next !== 'End'); // End is reserved
            const newKey = `Node ${new Date().getTime().toString()}`;
            JSONBuilder.current.editNode(contextNode, {
                Next: newKey
            });
            JSONBuilder.current.addTask(newKey, nextNodes?.[0]);

            setJson(prevState => ({...prevState, ...JSONBuilder.current.getJson()}));
            setShowMenu(false);
        }
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
                    <li onClick={handleAddNode}>Add Node</li>
                    <li>Delete Node</li>
                </Menu>
            </div>
            <EditForm>
                <h3>Edit Node</h3>
                <Input onChange={handleNameChange} label='Name' value={formState.name} />
                <label>
                    <TypeSpan>Type</TypeSpan>
                    <StyledRadioGroup onChange={handleNodeTypeChange} name='Type' options={typeOptions} value={formState.nodeType} />
                </label>
                <SubmitWrapper>
                    <Button>Save</Button>
                    <Button color='destructive'>Cancel</Button>
                </SubmitWrapper>
            </EditForm>
        </Wrapper>
    );
};

export default StepFunctionAuthoring;
