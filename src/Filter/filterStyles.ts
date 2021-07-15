import styled from '@emotion/styled';
import { FilterContainerProps } from './types';

const FILTER_BAR_HEIGHT = 48;

export const FilterContainer = styled.div<FilterContainerProps>(({ showJSONInput, isCollapsed, hideFilterBar }) => ({
    display: 'grid',
    gridTemplateColumns: '264px minmax(min-content, auto)',
    gridTemplateRows: hideFilterBar === true ?
        '1fr' :
        `${FILTER_BAR_HEIGHT}px auto`,
    ...(showJSONInput && {
        gridTemplateColumns: 'minmax(min-content, max-content) minmax(min-content, auto)'
    }),
    ...(isCollapsed && {
        gridTemplateColumns: '57px minmax(min-content, auto)',
        '.sidePanel': {
            padding: '1rem'
        },
        '.filterHeader': {
            borderBottom: 'none',
            '.filterMenuIcon': {
                transform: 'rotate(90deg)'
            }
        },
        '.filters, .jsonInputSection': {
            display: 'none'
        }
    })
}));

export const SidePanel = styled.div(({ theme }) => ({
    padding: '1rem',
    backgroundColor: theme?.colors?.white,
    borderRight: '1px solid #bdbdbd',
    gridRow: '1 / 3',
    h2: {
        fontFamily: '"Source Sans Pro", sans-serif',
        fontSize: 16,
        fontWeight: 700,
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        textTransform: 'uppercase',
        borderBottom: theme?.borders?.primary,
        height: 21,
        padding: '0 0 10px'
    },
    section: { padding: '16px 0', borderBottom: theme?.borders?.primary },
    'section h3': {
        fontSize: 16,
        fontWeight: 500,
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        textTransform: 'capitalize',
        cursor: 'pointer'
    },
    '.options': {
        paddingLeft: 14
    }
}));

export const FilterHeader = styled.h2({
    '.filterContextTriggerContent': {
        fontSize: 'inherit'
    },
    '.filterMenuIcon': {
        cursor: 'pointer',
        transform: 'rotate(-90deg)'
    }
});

export const FiltersSection = styled.div({
    position: 'relative',
    '> span': {
        position: 'absolute',
        top: 16,
        right: 0
    }
});

export const FilterSectionDescription = styled.p({
    color: '#757583',
    fontSize: 14,
    margin: '8px 0 4px'
});

export const FilterSectionBody = styled.div({
    marginTop: 8
});
