import { getUsageStats } from "expo-android-usagestats";
import { trackedApps } from "../settings/global_var";

let dateThingy = new Date();

export const appUsageProcess = async () => {
    console.log("\ngetting data");
    //console.log(trackedApps);

    const timeSinceMidNight = (dateThingy.getHours()*60 + dateThingy.getMinutes())*60000;
    console.log(timeSinceMidNight);
    const timeNow = Date.now();

    const appList = await getUsageStats(timeNow-timeSinceMidNight, timeNow);

    let current_timer = 0;

    for(let i = 0; i < appList.length; i++){
        const appUsage = appList[i]
        if(trackedApps[appUsage.packageName] === undefined){continue;}
        current_timer += appUsage.totalTimeVisible/60000;

        console.log(appUsage.packageName + ": " + appUsage.totalTimeVisible/60000);
    }
}