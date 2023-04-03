const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-designs'],
    webpackFinal: async (config) => {
        config = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    'emotion-theming': toPath('node_modules/@emotion/react')
                }
            }
        };
        config.resolve.modules.push(process.cwd() + '/node_modules');
        config.resolve.modules.push(process.cwd() + '/');

        // this is needed for working w/ linked folders
        config.resolve.symlinks = false;

        // Add SVGR Loader
        config.module.rules.unshift({
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader']
        });

        return config;
    }
};
