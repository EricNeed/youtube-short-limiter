const { withAndroidManifest } = require('@expo/config-plugins');

 const withForegroundService = (config) => withAndroidManifest(config, (config) => {
    const mainApplication = config?.modResults?.manifest?.application?.[0];

    //making sure application.service exsist
    if(!mainApplication['service']){
        mainApplication['service'] = [];
    }

    //there can be multiple service under the mainApplication['service'], can be accessed by ex: "mainApplication['service'][0]"
    //push in the 2 services
    mainApplication['service'].push({
        $: {
            'android:name': 'com.supersami.foregroundservice.ForegroundService',
            'android:foregroundServiceType': 'dataSync',
            'android:exported': 'false',
        },
    }, 
    {
        $: {
            'android:name': 'com.supersami.foregroundservice.ForegroundServiceTask',
            'android:foregroundServiceType': 'dataSync',
            'android:exported': 'false',
        },
    });

    //the meta-data requirements of the foreground service
    mainApplication['meta-data'].push({
        $: {
            'android:name': 'com.supersami.foregroundservice.notification_channel_name',
            'android:value': 'Sticky Title',
        },
    }, 
    {
        $: {
            'android:name': 'com.supersami.foregroundservice.notification_channel_description',
            'android:value': 'Sticky Description.',
        },
    },
    {
        $: {
            'android:name': 'com.supersami.foregroundservice.notification_color',
            'android:value': '#00C4D1',
        },
    });


    return config;
})

module.exports = withForegroundService;