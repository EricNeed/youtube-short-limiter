import { getInstalledApps, hasUsageStatsPermission } from "expo-android-usagestats";
import { useEffect, useState } from "react";

export async function getUserStatsTest(){
    console.log("getting the permission info...");
    console.log( await hasUsageStatsPermission());

    console.log("getting the app list...");
    console.log( await getInstalledApps());

    // console.log("getting all user stats...");
    // let time_now = Date.now();
    // let apptime = await getUsageStats(time_now - 600000, time_now);
    // //for(const app of apptime){}
    // console.log(apptime);
}


/** 
get the app usage of selected app
@param timeMin the interval in minute before now that i want to check the usage
@param appList the list of package names of app in string
@returns the list of minutes the same order of appList
*/
export async function getStats(timeMin){
    return 
}


//basically, it will return some trash data when is called, while the async function run in the background, and when the async function got the actual data, it calls "setReadyState" and triggered a re-execution of the main function and return the actual app list
export const getListParsedhook = async() => {
    //this will turn the function to a hook
    const [dataIsReady, setReadyState] = useState(false);//data is not ready at first

    useEffect(async () => {

    }, [])

    return await getInstalledApps();
}