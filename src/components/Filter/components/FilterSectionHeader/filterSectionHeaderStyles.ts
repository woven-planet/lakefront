import styled from '@emotion/styled';
import { ReactComponent as CloseLabel } from '../../assets/closeLabel.svg';
import { colors } from '../../../../index';

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

export const FilterValueHeaderChip = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    margin: 2,
    backgroundColor: theme?.colors?.akoya,
    flexGrow: 1,
    maxWidth: '90%',
    fontSize: 14,
    fontWeight: 600,
    color: theme?.colors?.gunpowder,
    height: 24,
    div: {
        maxWidth: '90%',
        width: 100,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }
}));

export const SvgCloseStyles = styled.div(({ theme }) => ({

    'button': {
        borderRadius: 2,
        border: `solid 1px ${theme.colors.selago}`,
        backgroundColor: theme.colors.akoya,
        color: theme.colors.gunpowder,


        'div.filterItem': {
            display: 'grid',
            gridTemplateColumns: '1fr 20px',

            '.filterItemClose': {
                gridArea: '1 / 2'
            }
        },
        transform: 'scale(0.8)',
        '&:hover': {
            backgroundColor: colors.akoya
        },
        '&::before': {
            backgroundImage: 'unset'
        },
        '&::after': {
            backgroundImage: 'unset'
        },
        'span': {

            display: 'flex',
            justifyContent: 'center',
            height: 40,
            alignItems: 'center',
            width: 150
        }
    }
}));

export const FilterValueChipsContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
