import { getUsageStats } from "expo-android-usagestats";
import { sendTimerReminder } from "../utils/service_wrapper/notification";
import { allTrackingGroups } from "../utils/settings/global_var";




let dateThingy = new Date();//get the current time
export const appUsageProcess = async () => {
    //getting the times
    const timeSinceMidNight = (dateThingy.getHours()*60 + dateThingy.getMinutes())*60000;
    const timeNow = Date.now();

    //check if it has been more than a day to update the time
    if(timeSinceMidNight > 86400000){
        dateThingy = new Date();
    }

    const appList = await getUsageStats(timeNow-timeSinceMidNight, timeNow);

    let currentTimer = 0;


    const currentTrackList = allTrackingGroups[0]["appList"];
    const limit = allTrackingGroups[0]["dailyLimit"]
    for(let i = 0; i < appList.length; i++){
        const appUsage = appList[i]
        if(currentTrackList[appUsage.packageName] === undefined){continue;}
        currentTimer += appUsage.totalTimeVisible/60000;

        console.log(appUsage.packageName + ": " + appUsage.totalTimeVisible/60000);
    }

    console.log(limit);

    if(currentTimer > limit){
        sendTimerReminder("current limitation", 0, currentTimer);
    }
}