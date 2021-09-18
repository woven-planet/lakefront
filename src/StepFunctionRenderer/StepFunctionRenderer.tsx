import { FC, useRef } from 'react';
import { useEffect } from 'react';
import dagreD3 from 'dagre-d3';
import { select as d3Select, Selection } from 'd3-selection';
import { curveBasis } from 'd3-shape';
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from 'd3-zoom';
import { buildGraph, getStates, renderObject } from './util';
import { StepFunctionRendererProps } from './types';
import { StepFunctionRendererContainer, OuterSvg } from './stepFunctionRendererStyles';

const StepFunctionRenderer: FC<StepFunctionRendererProps> = ({ stepFunctionJSON }) => {
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

            const enhanceWithCurvedEgdes = (graph) => {
                (graph.edges || []).forEach((edge) => {
                    edge.value = {
                        ...edge.value,
                        curve: curveBasis
                    };
                });
                return graph;
            };

            const g = new dagreD3.graphlib.json.read(enhanceWithCurvedEgdes(JSON.parse(serializedGraph)));

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
            const render = new dagreD3.render();

            // Run the renderer. This is what draws the final graph.
            try {
                g.graph().transition = function (selection: any) {
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
                render(inner, g);

                container.on('click', (event, eventData) => {
                    if (isTooltipOpened || !states[eventData]) {
                        tooltip.style('visibility', 'hidden');

                        isTooltipOpened = false;
                        return;
                    }
                });

                inner
                    .selectAll('g.node')
                    .style('cursor', 'pointer')
                    .on('click', function (event, eventData) {
                        event.stopPropagation();
                        if (isTooltipOpened || !states[eventData]) {
                            tooltip.style('visibility', 'hidden');

                            isTooltipOpened = false;
                            return;
                        }
                    })
                    .on('contextmenu', (event: PointerEvent, eventData: string) => {
                        event.stopPropagation();
                        event.preventDefault();
                        tooltip
                            .style('visibility', 'visible')
                            .style('top', event.pageY - 10 + 'px')
                            .style('left', event.pageX + 10 + 'px')
                            .html(renderObject(eventData, states[eventData]));

                        isTooltipOpened = true;

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
                            (svgWidth - g.graph().width * initialScale) / 2,
                            (svgHeight - g.graph().height * initialScale) / 2
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
