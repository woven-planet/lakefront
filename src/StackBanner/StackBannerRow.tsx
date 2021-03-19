import React, { FC, MouseEvent, ReactElement } from "react";
import { StackBannerRowDiv } from "./stackBannerStyles";
import { StackBannerIcon, getStackBannerIcon } from "./stackBannerUtil";

export interface StackBannerRowProps {
  /**
   * The main content to be displayed in in the banner.
   */
  content?: ReactElement<any>;
  /**
   * The svg icon to display. If an svg is provided, the svg will be used.
   * If explicity true or left undefined, a default flag icon will be displayed.
   * If explicitly false, no icon will be displayed.
   */
  icon?: StackBannerIcon;
  /**
   * The severity of the content that maps to varying background color levels.
   * If left undefined, the background will be transparent.
   */
  severity?: "normal" | "warning" | "error" | "default";
  /**
   * The action to run when the banner is clicked.
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * StackBannerRow Component
 *
 * The StackBannerRow component takes in content, icon, severity, and onClick props. It is
 * designed to be used with a StackBanner component, but can be used as a standalone component.
 *
 */
const StackBannerRow: FC<StackBannerRowProps> = ({
  content = "",
  icon = true,
  severity = "default",
  onClick = () => null,
}) => {
  const svg = getStackBannerIcon(icon);

  return (
    <StackBannerRowDiv
      className="stackBannerRow"
      severity={severity}
      onClick={onClick}
    >
      {svg}
      <div className="content">{content}</div>
    </StackBannerRowDiv>
  );
};

export default StackBannerRow;
