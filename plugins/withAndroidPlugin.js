import { withAndroidManifest } from '@expo/config-plugins';
;

 const withForegroundService = (config) => withAndroidManifest(config, (config) => {
    const mainApplication = config?.modResults?.manifest?.application?.[0];

    console.log(mainApplication);

    return config;
})



export default withForegroundService;