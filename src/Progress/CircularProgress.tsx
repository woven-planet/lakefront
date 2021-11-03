import { FC, ReactNode, useRef, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import customTheme from 'src/styles/theme';
import { arc as d3arc, pie as d3pie } from 'd3-shape';
import { event, select } from 'd3-selection';
import { CircularProgressStyle, CenterTextStyle } from './circularProgressStyles';
export interface CircularProgressProps {
    /** 
     * This is to set the width of the pie chart. 
     * */
    width: number;
    /** 
     * This is to set the text that would appear inside the pie chart. 
     * */
    text?: ReactNode;
    /**
     * The data that is passed to the Circular Progress Component to render different arcs for each value provided.
     */
    data: {
        label: string;
        value: number;
        tooltip?: boolean;
        key?: string;
    }[];
    /**
     * This is to render the background color for each label that is being passed.
     */
    theme: {
        [key: string]: {
            bgColor: string;
            fgColor: string;
        };
    };
}

/**
 * Circular Progress Component
 * 
 * The Circular Progress component is used to render the arcs depending on the value provided for each label.
 */
const CircularProgress: FC<CircularProgressProps> = ({ width, text, data, theme }) => {

    const svgRef = useRef<SVGSVGElement>(null);
    const htmlRef = useRef<HTMLDivElement>(null);
    const radius = width / 2;
    const circleRadius = radius - 5;

    const drawCircularProgress = () => {
        if (!svgRef.current) {
            return;
        }

        const svg = select(svgRef.current);
        const html = select(htmlRef.current);

        // for tooltips later
        const div = html
            .select('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        const g = svg.select('g');
        const radius = width / 2;

        const arc = d3arc().outerRadius(radius).innerRadius(radius - 10).padAngle(0);

        const paths: any = g.selectAll('path').data(d3pie()(data.map(d => d.value)));
        paths
            .enter()
            .append('path')
            .merge(paths)
            // draw the arcs
            .attr('d', arc)
            .attr('fill', (d: any, i: any) => {
                const key = data[i].key || data[i].label;
                return theme[key] ? theme[key].bgColor : 'transparent';
            })
            // have a mouse tooltip effect
            .on('mouseover', function (d: any) {
                if (d.data.tooltip === undefined || d.data.tooltip === true) {
                    div.transition()
                        .duration(200)
                        .style('opacity', 0.9);
                    div.html(`${d.data.label}: ${d.value}`)
                        .style('left', `${event.pageX}px`)
                        .style('top', `${event.pageY - 28}px`);
                }
            })
            .on('mouseout', function (d: any) {
                div.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        paths.exit().remove();
    };

    useEffect(() => {
        drawCircularProgress();
    });

    return (
        <ThemeProvider theme={customTheme}>
            <CircularProgressStyle width={width} ref={htmlRef}>
                <svg width={width} height={width} ref={svgRef}>
                    <circle cx={radius} cy={radius} r={circleRadius} fill="transparent" stroke={customTheme?.colors.selago} />
                    <g transform={`translate(${width / 2} ,  ${width / 2})`} />
                </svg>
                <CenterTextStyle>{text}</CenterTextStyle>
                <div />
            </CircularProgressStyle>
        </ThemeProvider>
    );
}

export default CircularProgress;
