import styled from '@emotion/styled';

export const StyledSelectPopoverWrapper = styled.div({
    display: 'inline',
    position: 'relative'
});

export const StyledSelectPopover = styled.div(({ theme }) => ({
    backgroundColor: theme?.colors?.white,
    border: `1px solid ${theme?.colors?.cinder}`,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-55%)',
    zIndex: 2
}));

export const SelectPopoverItem = styled.div(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: theme?.colors?.white,
    color: theme?.colors?.storm,
    cursor: 'pointer',
    display: 'flex',
    fontSize: 16,
    height: 40,
    minWidth: 160,
    padding: '10px 12px',
    userSelect: 'none',
    zIndex: 2,
    ':hover': {
        backgroundColor: theme?.colors?.mercury
    }
}));
