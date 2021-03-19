import { FC } from "react";
import { StackBannerListDiv } from "./stackBannerStyles";
import StackBannerRow, { StackBannerRowProps } from "./StackBannerRow";

export interface StackBannerProps {
  /**
   * The rows to display in the stack banner.
   */
  rows: StackBannerRowProps[];
}

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
