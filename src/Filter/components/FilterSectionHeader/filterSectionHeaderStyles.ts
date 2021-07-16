import styled from '@emotion/styled';

export const ClearButton = styled.div({
    "#base": {
        background: "red",
        display: "inline-block",
        height: "55px",
        marginLeft: "20px",
        marginTop: "55px",
        position: "relative",
        width: "100px"
      },
      "#base:before": {
        borderBottom: "35px solid red",
        borderLeft: "50px solid transparent",
        borderRight: "50px solid transparent",
        content: '""',
        height: "0",
        left: "0",
        position: "absolute",
        top: "-35px",
        width: "0"
      }
});

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
