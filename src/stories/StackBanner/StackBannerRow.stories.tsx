import { ComponentPropsWithoutRef } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import {
  NORMAL_SEVERITY,
  WARNING_SEVERITY,
  ERROR_SEVERITY,
  StackBannerStoryContent,
} from 'src/components/StackBanner/stackBannerUtil';

import StackBannerRowComponent, {
  StackBannerRowProps,
} from 'src/components/StackBanner/StackBannerRow';
import DocBlock from '.storybook/DocBlock';

export default {
  title: 'Lakefront/Stack Banner/Stack Banner Row',
  component: StackBannerRowComponent,
  argTypes: {
    icon: {
      control: 'boolean'
    },
    content: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      page: DocBlock,
    },
  },
} as Meta;

const Template: StoryFn<StackBannerRowProps & ComponentPropsWithoutRef<'div'>> = (
  args
) => <StackBannerRowComponent {...args} />;

export const Error = Template.bind({});
Error.args = {
  content: <div>{StackBannerStoryContent.Error}</div>,
  severity: ERROR_SEVERITY,
  key: '1',
};

export const Warning = Template.bind({});
Warning.args = {
  content: <div>{StackBannerStoryContent.Warning}</div>,
  severity: WARNING_SEVERITY,
  key: '2',
};

export const Normal = Template.bind({});
Normal.args = {
  content: <div>{StackBannerStoryContent.Normal}</div>,
  severity: NORMAL_SEVERITY,
  key: '3',
};

export const Default = Template.bind({});
Default.args = {
  content: <div>{StackBannerStoryContent.Default}</div>,
  key: '4',
};
