import { getUsageEvents } from "expo-android-usagestats";
import { lastTimeStamp, trackedApps, trackingGroups, updateTimeStamp } from "../utils/settings/tracked_apps";
import { normalTimerMath } from "../utils/shared_math";


export const appUsageProcess = async () => {
    //getting the times
    const timeNow = Date.now();


    const eventList = await getUsageEvents(lastTimeStamp, timeNow);

    for(let i = 0; i < eventList.length; i++){
        const event = eventList[i];
        const currentApp = trackedApps[event.packageName];
        if(currentApp === undefined){continue;}
        else if(event.eventType === 1){//user open app
            currentApp.currentStatus = 1;
            currentApp.lastProcessed = event.timeStamp;
            console.log(`user opened ${currentApp.packageName}`);
        }else if(event.eventType === 2){//user closed app
            currentApp.currentStatus = 0;
            const timePassed = event.timeStamp - currentApp.lastProcessed;
            trackingGroups[currentApp.groupID].usageTimer += timePassed;
            console.log(`user closed ${event.packageName}, used for  ${timePassed}`);
        }else{
            continue;
        }
        console.log(`app ${event.packageName} had a event`);
    }


    //grab any still running apps and count their time in
    for(const appProp of Object.values(trackedApps)){
        if(appProp.currentStatus === 0){continue;}

        const timePassed = lastTimeStamp - appProp.lastProcessed;
        trackingGroups[appProp.groupID].usageTimer += timePassed;
    }


    // check if any group need send notification
    for(const appGroup of trackingGroups){
        if(!appGroup.isActive || appGroup.usageTimer < appGroup.nextNotify){continue;}

        //send message
        // sendTimerReminder("current limitation", 0, currentTimer);

        //set timer for next interval

        const nextIntervalNormalized = normalTimerMath(appGroup.notifyFnType, appGroup.notifyFnCoeff, (appGroup.notifyUsed+=1) / appGroup.intervalAmount);
        appGroup.nextNotify += nextIntervalNormalized * appGroup.normalToLimit * 60000; // 60000 is to convert min to millis
        

    }


    updateTimeStamp();
}

    // let dateThingy = new Date();//get the current time
    //check if it has been more than a day to update the time
    // const timeSinceMidNight = (dateThingy.getHours()*60 + dateThingy.getMinutes())*60000;
    // if(timeSinceMidNight > 86400000){
    //     dateThingy = new Date();

    // }