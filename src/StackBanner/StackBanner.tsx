import { FC } from "react";
import { StackBannerListDiv } from "./stackBannerStyles";
import StackBannerRow, { StackBannerRowProps } from "./StackBannerRow";

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
const StackBanner: FC<StackBannerProps> = ({ rows }) => {
  return (
    <StackBannerListDiv>
      {rows.map((stackBannerRowProps: StackBannerRowProps) => {
        return <StackBannerRow {...stackBannerRowProps} />;
      })}
    </StackBannerListDiv>
  );
};

export default StackBanner;
