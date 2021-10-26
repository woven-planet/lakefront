import { FC } from 'react';
import { getStates } from 'src/StepFunctionRenderer/util';
import { StepFunctionRendererProps } from 'src/StepFunctionRenderer/types';
import { JSONStateObject } from 'src/StepFunctionGraph/util/JSONBuilder.util';


const TestRenderer: FC<StepFunctionRendererProps> = ({
    stepFunctionJSON,
    handleContextClickNode,
    handleCloseContextMenu,
    handleSelectedNode,
    onGraphCreate
}) => {
    const states = getStates(stepFunctionJSON);
    const nodeNames = Object.keys(states);

    const handleNodeClick = (event: string, data: any) => {
        if (handleSelectedNode) {
            handleSelectedNode(event, data);
        }

        if (handleCloseContextMenu) {
            handleCloseContextMenu();
        }
    };

    const handleContextMenuClick = (event: any, eventData: any, node: any) => {
        // make a simple rectangle
        let newRect: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        if (handleContextClickNode && node) {
            handleContextClickNode(eventData, node, event, newRect);
        }

    }

    return (
        <div>
            {nodeNames.map(name => {
                const state = states[name] as JSONStateObject;

                return (
                    <div id={name} key={name} onClick={() => handleNodeClick(name, state)}
                        onContextMenu={(e) => handleContextMenuClick(e, name, state)}>
                        <div className={'type'}>{state.Type}</div>
                        <div className={'nodePath'}>{state?.Metadata?.NodePath}</div>
                    </div>
                )
            })}
        </div>
    )
};

export default TestRenderer;

