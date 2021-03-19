import { ComponentPropsWithoutRef } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import StackBannerRowComponent, {
  StackBannerRowProps,
} from "src/StackBanner/StackBannerRow";
import DocBlock from ".storybook/DocBlock";

export default {
  title: "Lakefront/StackBanner/StackBannerRow",
  component: StackBannerRowComponent,
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
    content: {
      control: "text",
    },
  },
  parameters: {
    docs: {
      page: DocBlock,
    },
  },
} as Meta;

const Template: Story<
  StackBannerRowProps & ComponentPropsWithoutRef<"div">
> = (args) => <StackBannerRowComponent {...args} />;

export const StackBannerRow = Template.bind({});
StackBannerRow.args = {
  content: <div>Stack Banner</div>,
  severity: "error",
};
