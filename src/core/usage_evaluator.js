import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { getUsageEvents, hasUsageStatsPermission } from "expo-android-usagestats";
import { sendTimerReminder } from "../utils/service_wrapper/notification";
import { usageTaskDefaultConfig } from "../utils/settings/the_ultimate_circular_deps_solver";
import { lastTimeStamp, trackedApps, trackingGroups, updateTimeStamp } from "../utils/settings/tracked_apps";
import { normalTimerMath } from "../utils/shared_math";

// check if user turn off their phone, the more times check as throttled, the longer the task sleeps
let throttledCount = 0;

let smallestTimeLeft = Infinity;
let lastUpdateInterval = usageTaskDefaultConfig.delay;

//after change the delay of foreground task, it will immediately fire a rerun, so use this to skip the immediate rerun
let changedInterval = true;

export const appUsageProcess = async () => {
    if(changedInterval){changedInterval = false; return;}

    //getting the times
    const timeNow = Date.now();
    

    console.log("getting app usage");

    //check if permission has returned
    if(!!throttledCount){
        if(await hasUsageStatsPermission()){
            throttledCount = 0;
            lastUpdateInterval = usageTaskDefaultConfig.delay/2; // force it to reconfigure the interval
            console.log("permission granted again, back on track");
        }else{
            const nextUpdateTime = (throttledCount>15?15:throttledCount)*30000; //thruttle start at 30 second and increase as thruttle for longer time, to a max of 15
            changeUpdateInterval(nextUpdateTime);
            throttledCount++;
            console.log(`screen is off, usage update thruttled, next update in ${nextUpdateTime} millis`);
            return;
        }
    }
    //if the screen is off, it will deny userstats permission, and cause a error
    let eventList;
    try{
        eventList = await getUsageEvents(lastTimeStamp, timeNow);
    }catch(error){
        console.log("throttled, count is now 1");
        throttledCount = 1;
        return;
    }


    for(let i = 0; i < eventList.length; i++){
        const event = eventList[i];
        const currentApp = trackedApps[event.packageName];
        if(currentApp === undefined){continue;}
        else if(event.eventType === 1){//user open app
            currentApp.currentStatus = 1;
            currentApp.lastProcessed = event.timeStamp;
            // console.log(`user opened ${event.packageName}`);
        }else if(event.eventType === 2){//user closed app
            currentApp.currentStatus = 0;
            const timePassed = event.timeStamp - currentApp.lastProcessed;
            trackingGroups[currentApp.groupID].usageTimer += timePassed;
            // console.log(`user closed ${event.packageName}, used for  ${timePassed}`);   
        }else{
            continue;
        }
    }


    //grab any still running apps and count their time in
    for(const appProp of Object.values(trackedApps)){
        if(appProp.currentStatus === 0){continue;}

        const timePassed = timeNow - appProp.lastProcessed;
        appProp.lastProcessed = timeNow;
        trackingGroups[appProp.groupID].usageTimer += timePassed;
        console.log(`used ${appProp.appName} for ${timePassed}`);
    }


    //did this so the for loop can re-configure if the usageTimer is more than one interval ahead of nextNotify
    const updateNextNotify = (appGroup) => {
        const nextIntervalNormalized = normalTimerMath(appGroup.notifyFnType, appGroup.notifyFnCoeff, (appGroup.notifyUsed+=1) / appGroup.intervalAmount);
        const nextInterval = nextIntervalNormalized * appGroup.normalToLimit * 60000;// 60000 is to convert min to millis
        // console.log(`next interval: ${nextIntervalNormalized * appGroup.normalToLimit * 60000}, lastNotify: ${appGroup.nextNotify}, nextNotify: ${appGroup.nextNotify + nextInterval}`);
        appGroup.nextNotify += nextInterval;
    }


    // check if any group need send notification
    for(const appGroup of trackingGroups){
        console.log(`currentTimer: ${appGroup.usageTimer}, notifyTimer: ${appGroup.nextNotify}`);
        const timeRemain = appGroup.nextNotify - appGroup.usageTimer;
        if(!appGroup.isActive){
            continue;
        //check if the notification need smaller interval
        }else if(timeRemain > 0){
            smallestTimeLeft = timeRemain<smallestTimeLeft?timeRemain:smallestTimeLeft;
            continue;
        }

        //send message
        const currentUsage = Math.floor(appGroup.usageTimer/60000)
        sendTimerReminder(appGroup.name, appGroup.dailyLimit-currentUsage, currentUsage);


        //set timer for next interval
        while(appGroup.usageTimer >= appGroup.nextNotify){
            updateNextNotify(appGroup);
        }
    }

    //shorten the delay if a group need to send message early
    if(smallestTimeLeft < usageTaskDefaultConfig.delay){
        changeUpdateInterval(smallestTimeLeft);
        lastUpdateInterval = smallestTimeLeft;
    }else if(lastUpdateInterval < usageTaskDefaultConfig.delay){
        changeUpdateInterval();
        lastUpdateInterval = usageTaskDefaultConfig.delay;
    }

    updateTimeStamp();
}



const changeUpdateInterval = (newDelay=null) => {
    console.log(`update interval changed to ${newDelay===null?usageTaskDefaultConfig.delay:newDelay} millis`);
    if(newDelay === null){
        ReactNativeForegroundService.update_task(()=>appUsageProcess(), usageTaskDefaultConfig);
    }else{
        ReactNativeForegroundService.update_task(()=>appUsageProcess(), {...usageTaskDefaultConfig, delay: newDelay});
    }
    changedInterval = true;
}