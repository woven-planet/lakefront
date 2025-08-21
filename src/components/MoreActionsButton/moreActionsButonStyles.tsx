import styled from '@emotion/styled';

interface ActionsMenuContainer {
    top: number,
    left: number
}

export const ActionsMenuContainer = styled.div<ActionsMenuContainer>(({theme, top, left}) => ({
    position: 'fixed',
    backgroundColor: theme.backgrounds.primary,
    border: `1px solid ${theme.borderColors.primary}`,
    borderRadius: 6,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    minWidth: 180,
    top,
    left
}));

interface ActionsMenuItem {
    disabled: boolean,
}

export const ActionsMenuItem = styled.div<ActionsMenuItem>(({ disabled, theme}) => ({
    padding: '8px 12px',
    fontSize: 14,
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: disabled ? theme.foregrounds.disabled : theme.foregrounds.primary,
    '&:hover': {
        backgroundColor: disabled ? 'transparent' : theme.backgrounds.hover
    },
}));
