import { FC, useRef } from 'react';
import { useEffect } from 'react';
import { graphlib, render } from 'dagre-d3';
import { select as d3Select, Selection } from 'd3-selection';
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from 'd3-zoom';
import { buildGraph, getStates } from './util';
import { StepFunctionRendererProps } from './types';
import { StepFunctionRendererContainer, OuterSvg } from './stepFunctionRendererStyles';
import { enhanceWithCurvedEgdes } from './util/graphStyles';

const StepFunctionRenderer: FC<StepFunctionRendererProps> = ({ stepFunctionJSON, handleContextClickNode, handleCloseContextMenu, handleSelectedNode, onGraphCreate }) => {
    const containerRef = useRef(null);
    const outerSvgRef = useRef(null);
    const innerGroupRef = useRef(null);
    const toolTipsToRemove = useRef<Selection<any, any, any, any>[]>([]);
    const serializedGraph = buildGraph(stepFunctionJSON);
    const states = getStates(stepFunctionJSON);
    const data = {
        serializedGraph,
        states
    };

    useEffect(() => {
        if (containerRef.current && innerGroupRef.current && outerSvgRef.current) {
            const { serializedGraph, states } = data;

            const g = graphlib.json.read(enhanceWithCurvedEgdes(JSON.parse(serializedGraph)));
            const graph = g.graph() as any;

            if (onGraphCreate) {
                onGraphCreate(g, states);
            }

            const container = d3Select<Element, HTMLElement>(containerRef.current);
            const svg = d3Select<Element, HTMLElement>(outerSvgRef.current);
            const inner = d3Select<Element, HTMLElement>(innerGroupRef.current);

            // Clear any old group content
            inner.html('');

            // Set up zoom support
            const zoom = d3Zoom<Element, HTMLElement>().on('zoom', function (event) {
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

                let isTooltipOpened = false;

                // Create tooltip and store for unmount
                const tooltip = d3Select('body')
                    .append('div')
                    .style('position', 'absolute')
                    .style('z-index', '10')
                    .style('visibility', 'hidden')
                    .style('background-color', 'green')
                    .attr('class', 'tooltip');
                toolTipsToRemove.current.push(tooltip);

                // Render graph
                graphRenderer(inner, g);

                container.on('click', (event, eventData) => {
                    if (handleCloseContextMenu) {
                        handleCloseContextMenu();
                    }
                });

                inner
                    .selectAll('g.node')
                    .style('cursor', 'pointer')
                    .on('click', (event: PointerEvent, eventData: string) => {
                        // Handle left-click actions
                        event.stopPropagation();
                        const node = states[eventData];

                        if (handleSelectedNode) {
                            handleSelectedNode(eventData, node);
                        }

                        if (handleCloseContextMenu) {
                            handleCloseContextMenu();
                        }

                        if (isTooltipOpened || !node) {
                            tooltip.style('visibility', 'hidden');

                            isTooltipOpened = false;
                            return;
                        }
                    })
                    .on('contextmenu', (event: PointerEvent, eventData: string) => {
                        // Handle right-click actions
                        event.stopPropagation();
                        event.preventDefault();

                        const node = states[eventData];

                        if (handleContextClickNode && node) {
                            handleContextClickNode(eventData, node, event, outerSvgRef.current);
                        }

                        return;
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
                console.log(error);
            }
        }

        return () => {
            // Remove any remaining tooltips from document
            toolTipsToRemove.current.forEach((tooltip) => {
                tooltip.remove();
            });
        };
    }, [containerRef, innerGroupRef, outerSvgRef, stepFunctionJSON]);

    return (
        <StepFunctionRendererContainer ref={containerRef}>
            <OuterSvg ref={outerSvgRef}>
                <g ref={innerGroupRef} />
            </OuterSvg>
        </StepFunctionRendererContainer>
    );
};

export default StepFunctionRenderer;
