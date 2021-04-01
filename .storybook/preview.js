import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-emotion-theme';
import theme from 'src/styles/theme';
import { addParameters } from '@storybook/react';
import GlobalStyleStorybookDecorator from './GlobalStyleStorybookDecorator';

const themes = [theme];

addDecorator(withThemesProvider(themes));
addDecorator(GlobalStyleStorybookDecorator);

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
  },
  controls: { expanded: true },
  previewTabs: {
    'storybook/docs/panel': {
      index: -1
    }
  }
};

addParameters({
  viewMode: 'docs',
});
