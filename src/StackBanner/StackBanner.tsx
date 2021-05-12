import React, { ComponentPropsWithoutRef, FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { StackBannerListDiv } from './stackBannerStyles';
import StackBannerRow, { StackBannerRowProps } from './StackBannerRow';
import theme from '../styles/theme';

export interface StackBannerProps {
  /**
   * The rows to display in the stack banner.
   */
  rows: StackBannerRowProps[];
}

/**
 * StackBanner Component
 *
 * The StackBanner component is the container for StackBannerRows. As such,
 * rows are required to display any content.
 *
 */
const StackBanner: FC<StackBannerProps & ComponentPropsWithoutRef<'div'>> = ({ rows = [], ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <StackBannerListDiv {...props}>
        {rows.map((stackBannerRowProps: StackBannerRowProps) => {
          return <StackBannerRow {...stackBannerRowProps} />;
        })}
      </StackBannerListDiv>
    </ThemeProvider>
  );
};

export default StackBanner;
