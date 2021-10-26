import { FC, useEffect, useRef } from 'react';
import { graphlib } from 'dagre-d3';
import { buildGraph, getStates } from 'src/StepFunctionRenderer/util';
import { StepFunctionRendererProps } from 'src/StepFunctionRenderer/types';
import { JSONStateObject } from 'src/StepFunctionGraph/util/JSONBuilder.util';

const TestRenderer: FC<StepFunctionRendererProps> = ({
    stepFunctionJSON,
    handleContextClickNode,
    handleCloseContextMenu,
    handleSelectedNode,
    onGraphCreate
}) => {
    const outerSvgRef = useRef(null);

    const states = getStates(stepFunctionJSON);
    const serializedGraph = buildGraph(stepFunctionJSON);

    const nodeNames = Object.keys(states);

    useEffect(() => {
        if (outerSvgRef.current) {
            const g = graphlib.json.read(JSON.parse(serializedGraph));
            
            if (onGraphCreate) {
                onGraphCreate(g, states);
            }
        }
    }, [outerSvgRef, stepFunctionJSON]);

    const handleNodeClick = (event: string, data: any) => {
        if (handleSelectedNode) {
            handleSelectedNode(event, data);
        }

        if (handleCloseContextMenu) {
            handleCloseContextMenu();
        }
    };

    const handleContextMenuClick = (clickEvent: any, eventData: any, node: any) => {
        // Mock required PointerEvent properties
        const event = { ...clickEvent, pageX: 0, pageY: 0 };

        if (handleContextClickNode && node) {
            handleContextClickNode(eventData, node, event, outerSvgRef.current);
        }
    };

    return (
        <div>
            <svg ref={outerSvgRef}>
                {nodeNames.map((name) => {
                    const state = states[name] as JSONStateObject;

                    return (
                        <div
                            id={name}
                            key={name}
                            onClick={() => handleNodeClick(name, state)}
                            onContextMenu={(e) => handleContextMenuClick(e, name, state)}
                        >
                            <div className={'type'}>{state.Type}</div>
                            <div className={'nodePath'}>{state?.Metadata?.NodePath}</div>
                        </div>
                    );
                })}
            </svg>
        </div>
    );
};

export default TestRenderer;
