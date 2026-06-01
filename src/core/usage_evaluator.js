import { getAggregatedUsageStats, getUsageEvents } from "expo-android-usagestats";
import { lastTimeStamp, trackedApps, trackingGroups } from "../utils/settings/tracked_apps";



let dateThingy = new Date();//get the current time

export const appUsageProcess = async () => {
    //getting the times
    const timeNow = Date.now();

    //check if it has been more than a day to update the time
    // const timeSinceMidNight = (dateThingy.getHours()*60 + dateThingy.getMinutes())*60000;
    // if(timeSinceMidNight > 86400000){
    //     dateThingy = new Date();

    // }

    const eventList = await getUsageEvents(lastTimeStamp, timeNow);
    getAggregatedUsageStats()
    console.log(evenList);

    //save some cpu if user are not even using their phone
    let eventProcessed = false;

    for(let i = 0; i < evenList.length; i++){
        const event = eventList[i];
        const currentApp = trackedApps[event.packageName];
        if(currentApp === undefined){continue;}
        else if(event.eventType === 1){//user open app
            currentApp.lastOpened = event.timeStamp;
        }else if(event.eventType === 2){//user closed app
            const timeSpent = event.timeStamp - currentApp.lastOpened;
            trackingGroups.usageTimer += timeSpent;

            //todo: if notification requirement met then send notification
        }
        eventProcessed = true;
    }



    // if(currentTimer > limit){
    //     sendTimerReminder("current limitation", 0, currentTimer);
    // }
    lastTimeStamp = Date.now();
}