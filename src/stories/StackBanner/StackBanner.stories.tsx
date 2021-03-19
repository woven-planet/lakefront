import { ComponentPropsWithoutRef } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import StackBannerComponent, {
  StackBannerProps,
} from "src/StackBanner/StackBanner";
import DocBlock from ".storybook/DocBlock";

export default {
  title: "Lakefront/StackBanner",
  component: StackBannerComponent,
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
      content: <div>Banner 1 (Error)</div>,
      severity: "error",
    },
    {
      content: <div>Banner 2 (Warning)</div>,
      severity: "warning",
    },
    {
      content: <div>Banner 3 (Normal)</div>,
      severity: "normal",
    },
    {
      content: <div>Banner 4 (Undefined)</div>,
    },
  ],
};
