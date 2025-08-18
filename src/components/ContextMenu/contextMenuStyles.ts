import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface MenuContainerProps {
    top: number;
    left: number;
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

interface MenuItemElementProps {
  disabled: boolean
}

export const MenuItemElement = styled.li<MenuItemElementProps>(({theme, disabled}) => ({
  padding: '8px 12px',
  fontSize: 14,
  color: theme.foregrounds.primary,
  borderRadius: 6,
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  transition: 'background-color 0.15s ease-in-out',
  '&:hover': {
    backgroundColor: theme.foregrounds.secondary
  },
  opacity: disabled ? 0.5 : 1,
}));

export const Separator = styled.div(({ theme }) => ({
  height: '1px',
  backgroundColor: theme.borderColors.primary,
  margin: '4px -6px',
}));
