import theme from 'src/styles/theme';

const themes = [theme];


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

