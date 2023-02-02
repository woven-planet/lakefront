import styled from '@emotion/styled';
import { ReactComponent as CloseLabel } from '../../assets/closeLabel.svg';

export const FilterValueChip = styled.div(({ theme }) => ({
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 2px ${theme?.colors?.mercury}`,
    padding: 2,
    borderRadius: 3,
    backgroundColor: theme?.colors?.akoya,
    flexGrow: 1,
    maxWidth: '45%',
    fontSize: 12,
    fontWeight: 600,
    color: theme?.colors?.gunpowder,
    minHeight: 28,
    div: {
        maxWidth: '100%',
        width: 'auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    'span': {
        display: 'flex',
        alignItems: 'flex-start',
        gridArea: '1 / 2',
        cursor: 'pointer',
        fontWeight: 100,
        paddingLeft: 10,
        'svg': {
            height: 10,
            width: 10,
            padding: 2
        }
    }
}));

export const FilterLabels = styled.div(({ theme }) => ({
    color: theme?.colors?.gunpowder,
    fontWeight: 400,
    width: 80,
    fontSize: 10
}));

export const ClearButton = styled(CloseLabel)(({ theme }) => ({
    marginRight: 8,
    'path:first-of-type': {
        fill: theme?.colors?.akoya
    },
    'path:last-of-type': {
        fill: theme?.colors?.mercury
    },
    text: {
        fill: theme?.colors?.storm
    }
}));

export const FilterActions = styled.div({
    display: 'flex',
    alignItems: 'center'
});

export const FilterBadge = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
    marginLeft: 6,
    width: 24,
    height: 24,
    borderRadius: 14,
    border: `solid 1px ${theme?.colors?.mercury}`,
    backgroundColor: theme?.colors?.akoya
}));

export const FilterDetails = styled.div({
    display: 'flex',
    alignItems: 'center'
});

export const FilterSectionHeaderContainer = styled.h3({
    fontSize: 16,
    fontWeight: 500,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    cursor: 'pointer'
});
