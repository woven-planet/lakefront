import { useRef } from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import dagreD3 from 'dagre-d3';
import * as d3 from 'd3';
import { getStates } from './stepFunction';
import { buildGraph } from './graph';

const StepFunctionRendererContainer = styled.div({
    height: 700,
    width: '100%',
    maxWidth: 1000,
    '.svgWrapper': { width: '100%', height: '100%', boxSizing: 'border-box' },
    '.clusters rect': { fill: 'white', stroke: '#999', strokeWidth: '1.5px' },
    text: {
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serf',
        fontSize: '14px'
    },
    '.node rect, .node circle': {
        stroke: '#999',
        fill: '#fff',
        strokeWidth: '1.5px'
    },
    '.edgePath path': { stroke: '#333', strokeWidth: '1.5px' },
    '.tooltip': {
        padding: '5px',
        backgroundColor: 'white',
        border: '1px solid grey',
        borderRadius: '5px',
        color: 'black'
    },
    'table, td, tr': { border: 'none', borderCollapse: 'collapse' },
    td: { padding: '5px' },
    '.tooltipTableRow:nth-child(odd)': { backgroundColor: '#DDD !important' }
});

function makeId() {
    return `${Math.random()}`;
}

function renderObject(data, object) {
    const rows = Object.keys(object).map((key) => {
        const value = object[key];
        const id = makeId();
        return `
        <tr class="tooltipTableRow">
          <td>${key}</td>
          <td>data: ${data}, key: ${key}, id: ${id}</td>
          <td><input id="${id}" value="${value}" /></td>
        </tr>
      `;
    });
    return `<table>
      ${rows.join('')}
    </table>`;
}

const StepFunctionRenderer = ({ stepFunctionJSON }) => {
    const outerSvgRef = useRef(null);
    const innerGroupRef = useRef(null);
    const serializedGraph = buildGraph(stepFunctionJSON);
    const states = getStates(stepFunctionJSON);
    const data = {
        serializedGraph,
        states
    };

    useEffect(() => {
       if (innerGroupRef.current && outerSvgRef.current) {
        const { serializedGraph, states } = data;

        const enhanceWithCurvedEgdes = (graph) => {
            (graph.edges || []).forEach((edge) => {
                edge.value = {
                    ...edge.value,
                    curve: d3.curveBasis
                };
            });
            return graph;
        };

        const g = new dagreD3.graphlib.json.read(enhanceWithCurvedEgdes(JSON.parse(serializedGraph)));

        const svg = d3.select(outerSvgRef.current);
        const inner = d3.select(innerGroupRef.current);

        // Clear any old group content
        inner.html('');

        // Set up zoom support
        const zoom = d3.zoom().on('zoom', function (event) {
            inner.attr('transform', event.transform);
        });

        svg.call(zoom).on('dblclick.zoom', null);

        // Create the renderer
        const render = new dagreD3.render();

        // Run the renderer. This is what draws the final graph.
        try {
            g.graph().transition = function (selection) {
                return selection.transition().duration(500);
            };

            let isTooltipOpened = false;

            // TODO.. tooltip should be done via react so it can be removed on unmount
            const tooltip = d3
                .select('body')
                .append('div')
                .style('position', 'absolute')
                .style('z-index', '10')
                .style('visibility', 'hidden')
                .style('backgroung-color', 'green')
                .attr('class', 'tooltip');

            render(inner, g);

            inner
                .selectAll('g.node')
                .style('cursor', 'pointer')
                .on('click', function (event, eventData) {
                    if (isTooltipOpened || !states[eventData]) {
                        tooltip.style('visibility', 'hidden');

                        isTooltipOpened = false;
                        return;
                    }

                    tooltip
                        .style('visibility', 'visible')
                        .style('top', event.pageY - 10 + 'px')
                        .style('left', event.pageX + 10 + 'px')
                        .html(renderObject(eventData, states[eventData]));

                    isTooltipOpened = true;
                });

            // Center the graph
            const initialScale = 1;

            const svgWidth = +svg.style('width').slice(0, -2);
            const svgHeight = +svg.style('height').slice(0, -2);

            svg.call(
                zoom.transform,
                d3.zoomIdentity
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
    }, [innerGroupRef, outerSvgRef, stepFunctionJSON]);

    return (
        <StepFunctionRendererContainer>
            <svg width="100%" height="100%" ref={outerSvgRef}>
                <g ref={innerGroupRef} />
            </svg>
        </StepFunctionRendererContainer>
    );
};

export default StepFunctionRenderer;
