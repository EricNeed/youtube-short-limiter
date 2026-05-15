const { withAndroidManifest } = require('@expo/config-plugins');

 const withForegroundService = (config) => withAndroidManifest(config, (config) => {
    const mainApplication = config?.modResults?.manifest?.application?.[0];

    console.log(mainApplication);

    return config;
})

module.exports = withForegroundService;