module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    config.resolve.modules.push(process.cwd() + "/node_modules");
    config.resolve.modules.push(process.cwd() + "/");

    // this is needed for working w/ linked folders
    config.resolve.symlinks = false;

    // Add SVGR Loader
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"]
    });

    return config;
  }
}
