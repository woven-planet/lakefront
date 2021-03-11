import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-emotion-theme';
import theme from '../src/styles/theme';

const themes = [theme];
addDecorator(withThemesProvider(themes));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: theme.colors.white,
      },
      {
        name: 'alternate',
        value: theme.colors.gunpowder,
      },
    ],
  }
}