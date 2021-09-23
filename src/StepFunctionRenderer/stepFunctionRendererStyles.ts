import styled from '@emotion/styled';

export const StepFunctionRendererContainer = styled.div(({ theme }) => ({
    height: 700,
    width: '100%',
    maxWidth: 1000,
    '.svgWrapper': { width: '100%', height: '100%', boxSizing: 'border-box' },
    '.clusters rect': { fill: theme?.colors?.white, stroke: theme?.colors?.bombay, strokeWidth: 1.5 },
    text: {
        fontWeight: 300,
        fontSize: 14
    },
    '.node rect, .node circle': {
        stroke: theme?.colors?.bombay,
        fill: theme?.colors?.white,
        strokeWidth: 1.5
    },
    '.edgePath path': { stroke: theme?.colors?.storm, strokeWidth: 1.5 },
    'table, td, tr': { border: 'none', borderCollapse: 'collapse' },
    td: { padding: 5 },
    'div.renderError': {
        color: theme?.colors?.red,
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export const OuterSvg = styled.svg({
    width: '100%',
    height: '100%'
});
