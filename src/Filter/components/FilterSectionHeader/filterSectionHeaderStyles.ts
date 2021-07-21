import styled from '@emotion/styled';
import { ReactComponent as CloseLabel } from 'src/Filter/assets/closeLabel.svg';

export const FilterValueChip = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme?.colors?.mercury}`,
    padding: 2,
    margin: 2,
    borderRadius: 2,
    backgroundColor: theme?.colors?.akoya,
    flexGrow: 1,
    maxWidth: '50%',
    fontSize: 12,
    fontWeight: 600,
    color: theme?.colors?.gunpowder,
    height: 24,
    div: {
        maxWidth: '90%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }
}));

export const FilterValueChipsContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2
});

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
