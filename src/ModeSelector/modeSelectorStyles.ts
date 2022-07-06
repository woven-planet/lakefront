import styled from '@emotion/styled';

export const ModeSelectorContainer = styled.div(({ theme }) => ({
    backgroundColor: theme.colors.white,
    borderRadius: 2,
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 50%)',
    padding: '12px 16px',

    h3: {
        color: theme.colors.dolphin,
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: '1em',
        textTransform: 'uppercase'
    }
}));

interface LegendRowProps {
    color: string;
}

export const LegendRow = styled.div<LegendRowProps>(({ color }) => ({
    '.row-key': {
        backgroundColor: color,
        height: 20,
        width: 20,
        marginRight: 4
    }
}));
