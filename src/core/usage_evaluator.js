import { getUsageEvents } from "expo-android-usagestats";
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

    for(let i = 0; i < evenList.length; i++){
        const event = eventList[i];
        const currentApp = trackedApps[event.packageName];
        if(currentApp === undefined){continue;}

        else if(event.eventType === 1){//user open app
            currentApp.currentStatus = 1;
            currentApp.lastProcessed = event.timeStamp;
        }else if(event.eventType === 2){//user closed app
            currentApp.currentStatus = 0;
            const timePassed = event.timeStamp - currentApp.lastProcessed;
            trackingGroups[currentApp.groupID].usageTimer += timePassed;
        }else{
            continue;
        }
    }

    //grab any still running apps and count their time in
    const trackedProperties = trackedApps.values();
    for(const appProp of trackedProperties){
        if(appProp.currentStatus === 0){continue;}

        const timePassed = lastTimeStamp - appProp.lastProcessed;
        trackingGroups[appProp.groupID].usageTimer += timePassed;
    }

    // check if any group need send notification
    for(const appGroup of trackingGroups){
        const currentX = (1 / appGroup.notifyAmount) * appGroup.notifyUsed + 1;

        const intervalType = appGroup.notifyDeltaFnType;
        if(intervalType === 0){//linear
            
        }else if(intervalType === 1){//exponential

        }

    }

    // if(currentTimer > limit){
    //     sendTimerReminder("current limitation", 0, currentTimer);
    // }
    lastTimeStamp = Date.now();
}