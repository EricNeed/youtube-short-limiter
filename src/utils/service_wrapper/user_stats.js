import { getInstalledApps, hasUsageStatsPermission, requestUsageStatsPermission } from "expo-android-usagestats";
import { useEffect, useState } from "react";



//ask for perm
export const requestUsagePerm = async () => {
    if(!(await hasUsageStatsPermission())){
        requestUsageStatsPermission();
    }
}



/**
 * basically, it will return some trash data when is called, while the async function run in the background, and when the async function got the actual data, it calls "setReadyState" and triggered a re-execution of the main function and return the actual app list
 * @returns false if not ready, the list of apps if data is fetched
 */
export const getListHook = () => {
    //this will turn the function to a hook
    const [dataIsReady, setReadyState] = useState(false);//data is not ready at first

    useEffect(() => {
        //the getter function that will trigger a re-eecution
        const listGetter = async () => {
            const app_list = await getInstalledApps();
            //console.log("data received");
            setReadyState(app_list);
        }
        listGetter();
    }, []);

    return dataIsReady;
}



/**
 * a function that return a list of all the apps, with a "isTracked" propertie being either true or false depend on if user configure to track this app
 * @param selectedApps
 */
export function getAppListParsed(selectedApps){
    const allApps = getListHook();
    
    //iterate through all the apps on the device and give it a "isTracked" lable
    for(let i = 0; i < allApps.length; i++){
        const app = allApps[i];
        app.isTracked = !(selectedApps[app.packageName] === undefined);
    }

    if(allApps === false){
        return [];
    }
    return allApps;
}