import { ComponentPropsWithoutRef } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import {
  NORMAL_SEVERITY,
  WARNING_SEVERITY,
  ERROR_SEVERITY,
  StackBannerStoryContent,
} from "src/StackBanner/stackBannerUtil";

import StackBannerComponent, {
  StackBannerProps,
} from "src/StackBanner/StackBanner";
import DocBlock from ".storybook/DocBlock";

export default {
  title: "Lakefront/Stack Banner",
  component: StackBannerComponent,
  argTypes: {
    rows: {
      control: false
    },
  },
  parameters: {
    docs: {
      page: DocBlock,
    },
  },
} as Meta;

const Template: Story<StackBannerProps & ComponentPropsWithoutRef<"div">> = (
  args
) => <StackBannerComponent {...args} />;

export const StackBanner = Template.bind({});
StackBanner.args = {
  rows: [
    {
      content: <div>{StackBannerStoryContent.Error}</div>,
      severity: ERROR_SEVERITY,
    },
    {
      content: <div>{StackBannerStoryContent.Warning}</div>,
      severity: WARNING_SEVERITY,
    },
    {
      content: <div>{StackBannerStoryContent.Normal}</div>,
      severity: NORMAL_SEVERITY,
    },
    {
      content: <div>{StackBannerStoryContent.Default}</div>,
    },
  ],
};
