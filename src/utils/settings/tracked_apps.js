import { createContext, useContext, useState } from "react";
import { normalTimerMath } from "../shared_utils";
//later for loading config: check all app in trackedApps exsist



// a list of all the apps selected by user to track time
export const trackingGroups = [];

// create a new group, and return the index in trackingGroups
const createTrackGroup = () => {
    const index = trackingGroups.length;
    trackingGroups[index] = {
        dailyLimit: Infinity,
        usageTimer: 0,
        name: "",
        notifyFnType: 0,  //0:linear, 1:expenential
        notifyFnCoeff: 0, //slope in decimal or exponential decay value

        nextNotify: Infinity, //the time you should notify the user
        notifyUsed: 0, //the message already sent
        normalToLimit: 0, //from 0-1 to 0-dailyLimit
        intervalAmount: 0, //amount of message in total
    };
    return index;
}
createTrackGroup();


//all the apps tracked
export const trackedApps = {};
//trackedApps = {{appName: "", category: "", groupID: num, lastProcessed: num, currentStatus: num}}



//the timestamp of last time getting the usage
export let lastTimeStamp = Date.now();



//a new components for provide the context
const SelectedAppContext = createContext();
export const SelectedAppProvider = ({children}) => {
    //subscribe to the event, and always trigger setAppUpdate() if trackedApps changed
    const [refreshListener, setAppUpdate] = useState(false);
    //flip the true or false in the app
    const updateUIApps = () => setAppUpdate(draft => (!draft));

    return <SelectedAppContext.Provider value={{refreshListener, updateUIApps, trackingGroups, trackedApps}}>
        {children}
    </SelectedAppContext.Provider>
}
export const getSelectedApps = () => useContext(SelectedAppContext);



// get the usage of a app before it start getting tracked or before program launch
const getUsageBeforeStart = (packageName) => {

}



/**
 * configure a group's notification interval using the users config input
 * @param {number} groupID 
 * @param {number} intervalAmount 
 * @param {number} coefficient cannot be negative if fnType is 1
 * @param {number} fnType 0: linear, 1: exponential, 2: constant(user configured interval), 3: constant(user configure amount of interval)
 * @param {number} limitTime the time limit of a group that user set
 */
const configureGroup = (groupID, intervalAmount, coefficient, fnType, limitTime) => {
    // console.log("configuring");
    const currentApp = trackingGroups[groupID]
    currentApp.intervalAmount = intervalAmount;
    currentApp.notifyFnType = fnType;
    currentApp.dailyLimit = limitTime;

    if(3){
        currentApp.notifyFnCoeff = limitTime/intervalAmount;
    }else{
        //basically, total up how big a slice of cake each interval want, and map that sum to the configured limit to slice the limit for each interval
        //(after 2 days, only god shall understand this code)
        currentApp.notifyFnCoeff = coefficient;
        let total = 0;
        for(let x = 0; x <= 1; x+=1/intervalAmount){
            total += normalTimerMath(fnType, coefficient, x);
            // console.log(total);
        }
        currentApp.normalToLimit = limitTime/total;
    }
}