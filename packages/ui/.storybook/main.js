const path = require('path');
const { loadConfigFromFile, mergeConfig } = require('vite');

module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        '@storybook/preset-scss',
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-vite"
    },
    "features": {
        "storyStoreV7": true,
        "emotionAlias": false,
        "buildStoriesJson": true,
    },
    async viteFinal(config, { configType }) {
        const { config: userConfig } = await loadConfigFromFile(
            path.resolve(__dirname, '../vite.config.js')
        );

        return mergeConfig(config, {
            ...userConfig,
            plugins: [
                userConfig.plugins[1],
                userConfig.plugins[2],
            ],
        });
    }
}