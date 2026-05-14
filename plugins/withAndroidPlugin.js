import { withAndroidManifest } from 'expo/config-plugins';

export function withForegroundService(config){
    return withAndroidManifest(config, (config) => {
        
    })
}