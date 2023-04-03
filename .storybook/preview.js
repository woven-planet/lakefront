import { addDecorator, addParameters } from '@storybook/react';
import { withThemes as withThemesProvider } from '@react-theming/storybook-addon';
import theme from 'src/styles/theme';
import GlobalStyleStorybookDecorator from './GlobalStyleStorybookDecorator';
import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as MaterialThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

const themes = [theme];

addDecorator(withThemesProvider(ThemeProvider, themes));
addDecorator(GlobalStyleStorybookDecorator);

const defaultTheme = createTheme(); // or your custom theme

const withThemeProvider2 = (Story, context) => {
    return (
        <Emotion10ThemeProvider theme={defaultTheme}>
            <MaterialThemeProvider theme={defaultTheme}>
                <Story {...context} />
            </MaterialThemeProvider>
        </Emotion10ThemeProvider>
    );
};

export const decorators = [withThemeProvider2];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
        default: 'default',
        values: [
            {
                name: 'default',
                value: theme.colors.white
            },
            {
                name: 'alternate',
                value: theme.colors.gunpowder
            }
        ]
    },
    controls: { expanded: true },
    previewTabs: {
        'storybook/docs/panel': {
            index: -1
        }
    }
};

addParameters({
    viewMode: 'docs'
});
