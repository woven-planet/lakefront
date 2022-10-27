import { FC, useRef, useState } from 'react';
import { useEffect } from 'react';
import { graphlib, render } from 'dagre-d3';
import { select as d3Select } from 'd3-selection';
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from 'd3-zoom';
import { buildGraph, getStates } from './util';
import { StepFunctionRendererProps } from './types';
import { StepFunctionRendererContainer, OuterSvg } from './stepFunctionRendererStyles';
import { enhanceWithCurvedEgdes } from './util/graphStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

/**
 * Step Function Renderer Component
 *
 * The Step Function Renderer takes AWS Step Function JSON and renders an interactive 2D visualization of how its states connect together.
 * It can be panned by clicking in empty space and moving the mouse. The scroll wheel can be used for zoom-in and zoom-out functionality.
 * This component does not allow cycles, or nodes that connect such that a circular path is formed.
 */
const StepFunctionRenderer: FC<StepFunctionRendererProps> = ({
    stepFunctionJSON,
    handleContextClickNode,
    handleCloseContextMenu,
    handleSelectedNode,
    onGraphCreate
}) => {
    const [renderError, setRenderError] = useState(false);
    const containerRef = useRef(null);
    const outerSvgRef = useRef(null);
    const innerGroupRef = useRef(null);
    const serializedGraph = buildGraph(stepFunctionJSON);
    const states = getStates(stepFunctionJSON);
    const data = {
        serializedGraph,
        states
    };

    useEffect(() => {
        setRenderError(false);

        if (containerRef.current && innerGroupRef.current && outerSvgRef.current) {
            const { serializedGraph, states } = data;

            const g = graphlib.json.read(enhanceWithCurvedEgdes(JSON.parse(serializedGraph)));
            const graph = g.graph() as any;

            if (onGraphCreate) {
                onGraphCreate(g, states);
            }

            const container = d3Select<any, any>(containerRef.current);
            const svg = d3Select<any, any>(outerSvgRef.current);
            const inner = d3Select<any, any>(innerGroupRef.current);

            // Clear any old group content
            inner.html('');

            // Set up zoom support
            const zoom = d3Zoom<SVGElement, any>().on('zoom', function (event) {
                inner.attr('transform', event.transform);
            });

            svg.call(zoom).on('dblclick.zoom', null);

            // Create the renderer
            const graphRenderer = new render();

            // Run the renderer. This is what draws the final graph.
            try {
                graph.transition = function (selection: any) {
                    return selection.transition().duration(500);
                };

                // Render graph
                graphRenderer(inner as any, g as any);

                container.on('click', (event, eventData) => {
                    if (handleCloseContextMenu) {
                        handleCloseContextMenu();
                    }
                });

                inner
                    .selectAll('g.node')
                    .style('cursor', 'pointer')
                    .on('click', (event: PointerEvent, eventData: unknown) => {
                        if (typeof eventData === 'string') {
                            // Handle left-click actions
                            event.stopPropagation();
                            const node = states[eventData];

                            if (handleSelectedNode) {
                                handleSelectedNode(eventData, node);
                            }

                            if (handleCloseContextMenu) {
                                handleCloseContextMenu();
                            }
                        }
                    })
                    .on('contextmenu', (event: PointerEvent, eventData: unknown) => {
                        if (typeof eventData === 'string') {
                            // Handle right-click actions
                            const node = states[eventData];

                            if (handleContextClickNode && node) {
                                event.stopPropagation();
                                event.preventDefault();
                                handleContextClickNode(eventData, node, event, outerSvgRef.current);
                            }
                        }
                    });

                // Center the graph
                const initialScale = 1;

                const svgWidth = +svg.style('width').slice(0, -2);
                const svgHeight = +svg.style('height').slice(0, -2);

                svg.call(
                    zoom.transform,
                    d3ZoomIdentity
                        .translate(
                            (svgWidth - graph.width * initialScale) / 2,
                            (svgHeight - graph.height * initialScale) / 2
                        )
                        .scale(initialScale)
                );
            } catch (error) {
                setRenderError(true);
            }
        }
    }, [containerRef, innerGroupRef, outerSvgRef, stepFunctionJSON]);

    return (
        <ThemeProvider theme={theme}>
            <StepFunctionRendererContainer ref={containerRef}>
                {!renderError && (
                    <OuterSvg ref={outerSvgRef}>
                        <g ref={innerGroupRef} />
                    </OuterSvg>
                )}
                {renderError && <div className="renderError">Error encountered rendering step function</div>}
            </StepFunctionRendererContainer>
        </ThemeProvider>
    );
};

export default StepFunctionRenderer;
