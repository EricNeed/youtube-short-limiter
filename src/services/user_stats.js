import { getUsageStats, hasUsageStatsPermission } from "expo-android-usagestats";

export async function getUserStatsTest(){
    console.log("getting the permission info...");
    console.log( await hasUsageStatsPermission());

    // console.log("getting the app list...");
    // console.log( await getInstalledApps());

    console.log("getting all user stats...");
    let time_now = Date.now();
    let apptime = await getUsageStats(time_now - 600000, time_now);
    //for(const app of apptime){}
    console.log(apptime);
}

export async function getAppFromList(){

}