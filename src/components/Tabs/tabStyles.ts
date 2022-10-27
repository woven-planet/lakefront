import styled from '@emotion/styled';

export const TabBar = styled.div<any>(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    backgroundColor: theme?.colors?.white
}));


export const TabStyle = styled.span<any>(({ theme, isSelected }) => ({
    color: theme?.colors?.pavement,
    padding: '0.5rem 0 0.625rem 0',
    cursor: 'pointer',
    '& + span': {
        marginLeft: '2.5rem',
    },
    ...(isSelected) && {
        color: theme?.colors?.cinder,
        paddingBottom: '0.5rem',
        borderBottom: '0.25rem solid black',
        fontWeight: 500
    }
}));
