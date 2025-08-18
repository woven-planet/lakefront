import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

interface MenuContainerProps {
    top: number;
    left: number;
    theme: Theme;
}

const fadeIn = css`
  @keyframes fadeInAnimation {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

/**
 * The main container for the context menu list.
 * It's positioned absolutely based on the user's click.
 */
export const MenuContainer = styled.ul<MenuContainerProps>(({theme, top, left}) => ({
  position: 'fixed',
  top: top,
  left: left,
  minWidth: 200,
  backgroundColor: theme.backgrounds.primary,
  border: `1px solid ${theme.borderColors.primary}`,
  borderRadius: 8,
  padding: 6,
  listStyle: 'none',
  margin: 0,
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
  zIndex: 1000,
  animation: `${fadeIn} 0.1s ease-out`,
}));

/**
 * An individual item within the context menu.
 */
export const MenuItemElement = styled.li(({theme}) => ({
  padding: '8px 12px',
  fontSize: 14,
  color: theme.foregrounds.primary,
  borderRadius: 6,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  transition: 'background-color 0.15s ease-in-out',
  '&:hover': {
    backgroundColor: theme.foregrounds.secondary
  }
}));

/**
 * A visual separator to group related menu items.
 */
export const Separator = styled.div(({ theme }) => ({
  height: '1px',
  backgroundColor: theme.borderColors.primary,
  margin: '4px -6px',
}));
