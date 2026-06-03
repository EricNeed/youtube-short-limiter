import { getUsageEvents } from "expo-android-usagestats";
import { sendTimerReminder } from "../utils/service_wrapper/notification";
import { lastTimeStamp, trackedApps, trackingGroups } from "../utils/settings/tracked_apps";



let dateThingy = new Date();//get the current time

export const appUsageProcess = async () => {
    //getting the times
    const timeNow = Date.now();


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
        if(appGroup.usageTimer < appGroup.nextNotify){continue;}

        //send message
        sendTimerReminder("current limitation", 0, currentTimer);

        //set timer for next interval

        const nextIntervalNormalized = normalTimerMath(appGroup.notifyFnType, appGroup.notifyFnCoeff, (appGroup.notifyUsed+=1) / appGroup.intervalAmount);
        appGroup.nextNotify += nextIntervalNormalized * appGroup.normalToLimit * 60000; // 60000 is to convert min to millis
        

    }


    lastTimeStamp = Date.now();
}


    //check if it has been more than a day to update the time
    // const timeSinceMidNight = (dateThingy.getHours()*60 + dateThingy.getMinutes())*60000;
    // if(timeSinceMidNight > 86400000){
    //     dateThingy = new Date();

    // }