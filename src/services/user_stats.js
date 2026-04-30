import { getInstalledApps, hasUsageStatsPermission } from "expo-android-usagestats";

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
get the app usage of specified apps
@param timeMin the interval in minute before now that i want to check the usage
@param appList the list of package names of app in string
@returns the list of minutes the same order of appList
*/
export async function getStatsFiltered(timeMin, appList){
    return 
}



export async function getAppFromList(){
    return await getInstalledApps();
}