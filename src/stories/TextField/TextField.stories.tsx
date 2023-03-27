import { Meta, storiesOf, Story } from '@storybook/react';
import TextFieldComponent from 'src/material-components/TextField/TextField';

// storiesOf('', module).add('', () => <TextFieldPage />, {
//     design: {
//         Type: 'figma',
//         url: 'https://www.figma.com/file/YQpGAN4DHCHu0H0sEjXGoA/Lakefront--%3E-Figma-Lib-Test?node-id=51294-25727&t=46b4bX6nbwpZhtZ3-4'
//     }
// });

export default {
    title: 'Lakefront-Material-io/TextField',
    component: TextFieldComponent
} as Meta;

const Template: Story = (args) => <TextFieldComponent />;

export const Text = Template.bind({});
