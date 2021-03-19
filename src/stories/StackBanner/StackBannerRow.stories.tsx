import { ComponentPropsWithoutRef } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import StackBannerRowComponent, {
  StackBannerRowProps,
} from "src/StackBanner/StackBannerRow";
import DocBlock from ".storybook/DocBlock";

export default {
  title: "Lakefront/Stack Banner/Stack Banner Row",
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

export const Error = Template.bind({});
Error.args = {
  content: <div>Stack Banner</div>,
  severity: "error",
};

export const Warning = Template.bind({});
Warning.args = {
  content: <div>Stack Banner</div>,
  severity: "warning",
};

export const Normal = Template.bind({});
Normal.args = {
  content: <div>Stack Banner</div>,
  severity: "normal",
};

export const Default = Template.bind({});
Default.args = {
  content: <div>Stack Banner</div>,
};
