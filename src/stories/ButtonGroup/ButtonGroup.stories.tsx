import { ComponentPropsWithoutRef, useState, MouseEventHandler } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import ButtonGroupComponent, { ButtonGroupProps } from 'src/components/ButtonGroup';

export default {
  title: 'Lakefront/ButtonGroup',
  component: ButtonGroupComponent,
} as Meta;

const Template: StoryFn<ButtonGroupProps & ComponentPropsWithoutRef<'div'>> = (args) => {
  const [selected, setSelected] = useState<string>(args.selectedId);

  const handleSelected: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelected(event.currentTarget.id);
  }

  const buttonConfigs = args.buttonConfigs.map(config => ({
    ...config,
    onClick: selected ? handleSelected : undefined,
  }));

  return (
    <ButtonGroupComponent {...args} buttonConfigs={buttonConfigs} selectedId={selected} />
  );
};

export const ButtonGroup = Template.bind({});
ButtonGroup.args = {
  mode: 'toggle',
  selectedId: 'left',
  buttonConfigs: [
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
  ]
};

export const ThreeButtonGroup = Template.bind({});
ThreeButtonGroup.args = {
  mode: 'toggle',
  selectedId: 'middle',
  buttonConfigs: [
    { id: 'left', label: 'Left' },
    { id: 'middle', label: 'Middle' },
    { id: 'right', label: 'Right' }
  ]
};

export const FourButtonGroup = Template.bind({});
FourButtonGroup.args = {
  mode: 'toggle',
  selectedId: 'right-middle',
  buttonConfigs: [
    { id: 'left', label: 'Left' },
    { id: 'left-middle', label: 'Middle-Left' },
    { id: 'right-middle', label: 'Middle-Right' },
    { id: 'right', label: 'Right' },
  ]
};

export const NoneSelectedGroup = Template.bind({});
NoneSelectedGroup.args = {
  mode: 'toggle',
  buttonConfigs: [
    { id: 'left', label: 'Left' },
    { id: 'middle', label: 'Middle' },
    { id: 'right', label: 'Right' }
  ]
};

export const GroupMode = Template.bind({});
GroupMode.args = {
  mode: 'group',
  buttonConfigs: [
    { id: 'left', label: 'Left' },
    { id: 'middle', label: 'Middle' },
    { id: 'right', label: 'Right' }
  ]
};
