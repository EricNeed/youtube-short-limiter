import { getInstalledApps, hasUsageStatsPermission, requestUsageStatsPermission } from "expo-android-usagestats";
import { useEffect, useState } from "react";
import { trackedApps } from "../settings/tracked_apps";



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
 * should only be used inside a conponent
 * @param selectedApps
 */
export const getAppListParsed = (selectedApps) =>{
    const allApps = getListHook();
    
    // console.log("selected apps from parser: ", selectedApps);


    //iterate through all the apps on the device and give it a "isTracked" lable
    for(let i = 0; i < allApps.length; i++){
        const app = allApps[i];
        const currentApp = selectedApps[app.packageName];
        app.isTracked = !(currentApp === undefined);
        app.groupID = currentApp?.groupID;
    }

    if(allApps === false){
        return [];
    }
    return allApps;
}



//i found better solution damn it, i could just filter em on the fly and just not display them if not in that group
const filterOtherGroup = (arrayOApps, groupID) =>{
    useEffect(()=>{
        //flipped because will remove item
        for(let i = arrayOApps.length-1; i <= 0 ; i++){
            const packageName = arrayOApps[i].packageName;
            const inAppList = trackedApps[packageName]?.groupID;
            //if its not in any other tracking group or is in this group, do nothing
            if(inAppList === undefined || inAppList === groupID){
                continue;
            }
            //remove it because its already in another group
            arrayOApps.splice(i, 1);
        }
    }, []);
}