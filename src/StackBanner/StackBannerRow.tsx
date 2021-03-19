import { FC, ReactElement } from "react";
import { StackBannerRowDiv } from "./stackBannerStyles";

export interface StackBannerRowProps {
  /**
   * The main content to be displayed in in the banner.
   */
  content?: ReactElement<any>;
  /**
   * The svg icon to display. If left undefined, a flag will be displayed.
   * If false, no icon will be displayed.
   */
  icon?: ReactElement<SVGElement> | boolean;
  /**
   * The severity of the content that maps to varying background color levels.
   * If left undefined, the background will be transparent.
   */
  severity?: "normal" | "warning" | "error";
  /**
   * The action to run when the banner is clicked.
   */
  onClick?: (event: object) => void;
}

const StackBannerRow: FC<StackBannerRowProps> = ({
  content = '',
  icon,
  severity,
  onClick = () => null,
}) => {
  return (
    <StackBannerRowDiv severity={severity} onClick={onClick}>
      {icon}
      {content}
    </StackBannerRowDiv>
  );
};

export default StackBannerRow;
