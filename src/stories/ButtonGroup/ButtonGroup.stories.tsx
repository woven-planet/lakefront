import { ComponentPropsWithoutRef } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import ButtonGroupComponent, { ButtonGroupProps } from 'src/components/ButtonGroup';

export default {
  title: 'Lakefront/ButtonGroup',
  component: ButtonGroupComponent,
} as Meta;

const Template: StoryFn<ButtonGroupProps & ComponentPropsWithoutRef<'div'>> = (args) => {
  return (
    <ButtonGroupComponent {...args} />
  );
};

export const ButtonGroup = Template.bind({});
ButtonGroup.args = {
  mode: 'toggle',
  selected: undefined,
  buttonConfigs: [
    { id: 'button1', label: 'Button 1' },
    { id: 'button2', label: 'Button 2' },
    { id: 'button3', label: 'Button 3' }
  ]
};

export const ThreeButtonGroup = Template.bind({});
ThreeButtonGroup.args = {
  mode: 'toggle',
  selected: undefined,
  buttonConfigs: [
    { id: 'button1', label: 'Button 1' },
    { id: 'button2', label: 'Button 2' },
    { id: 'button3', label: 'Button 3' }
  ]
};
