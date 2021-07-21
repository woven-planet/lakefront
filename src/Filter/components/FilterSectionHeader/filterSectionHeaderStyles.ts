import styled from '@emotion/styled';
import { ReactComponent as CloseLabel } from 'src/Filter/assets/closeLabel.svg';

export const FilterValueChip = styled.div(({ theme }) => ({
    border: `solid 1px ${theme?.colors?.akoya}`,
    padding: 2,
    margin: 2,
    color: theme?.colors?.storm,
    borderRadius: 2
}));

export const ClearButton = styled(CloseLabel)(({ theme }) => ({
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
