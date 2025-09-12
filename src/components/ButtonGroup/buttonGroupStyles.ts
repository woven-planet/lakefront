import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import Button from '../Button';

export const ButtonGroupContainer = styled('div')(({ theme }) => ({
  display: 'inline-block',
  borderRadius: 8,
  boxSizing: 'border-box',
  position: 'relative',
  '.primary': {
    zIndex: 1,
    boxShadow: `0 1px 4px ${theme.shadowColors.boxShadow}`
  }
}));

export const SelectedStylesButton = styled(Button)<{ selectedStyles: CSSProperties }>(({ selectedStyles }) => ({
  ...selectedStyles
}));
