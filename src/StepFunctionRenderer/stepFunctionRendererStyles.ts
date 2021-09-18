import styled from '@emotion/styled';

export const StepFunctionRendererContainer = styled.div({
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

export const OuterSvg = styled.svg({
    width: '100%',
    height: '100%'
});
