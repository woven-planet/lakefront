import styled from '@emotion/styled';

export const FilterBarContainer = styled.div(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderBottom: `1px solid ${theme.colors.selago}`,
    padding: '0 1rem',
    '.filterItem': {
        borderRadius: 2,
        border: `solid 1px ${theme.colors.selago}`,
        backgroundColor: '$akoya',
        color: theme.colors.gunpowder,
        padding: '4px 6px',
        display: 'inline-flex',
        marginRight: 8,
        alignItems: 'center',
        '.filterItemLabel': {
            maxWidth: 325,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        '.filterItemClose': {
            borderLeft: `1px solid ${theme.colors.pavement}`,
            marginLeft: 8,
            paddingLeft: 8,
            fontSize: 20,
            cursor: 'pointer'
        }
    },
    '.clearAll': {
        color: theme.colors.saturatedBlue,
        cursor: 'pointer'
    }
}));
