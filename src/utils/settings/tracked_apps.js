import { createContext, useContext, useState } from "react";
import { normalTimerMath } from "../shared_math";
//later for loading config: check all app in trackedApps exsist



// a list of all the apps selected by user to track time
export const trackingGroups = [];

// create a new group, and return the index in trackingGroups
export const createTrackGroup = () => {
    const index = trackingGroups.length;
    trackingGroups[index] = {
        dailyLimit: Infinity,
        usageTimer: 0,
        name: "un-named group",

        notifyFnType: 2,  //0:linear, 1:expenential
        notifyFnCoeff: 1, //slope in decimal or exponential decay value
        nextNotify: 0, //the time you should notify the user
        notifyUsed: 0, //the message already sent
        normalToLimit: 0, //from 0-1 to 0-dailyLimit
        intervalAmount: 0, //amount of message in total
        isActive: false, //this group are not successfully configured
    };
    return index;
}
createTrackGroup();


//all the apps tracked
export const trackedApps = {};
//trackedApps = {{appName: "", category: "", groupID: num, lastProcessed: num, currentStatus: num}}



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



//the timestamp of last time getting the usage
export let lastTimeStamp = Date.now();
export const updateTimeStamp = () => {
    lastTimeStamp = Date.now();
}



/**
 * configure a group's notification interval using the users config input
 * @param {number} groupID 
 * @param {number} intervalAmount 
 * @param {number} coefficient cannot be negative if fnType is 1
 * @param {number} fnType 0: linear, 1: exponential, 2: constant(user configured interval), 3: constant(user configure amount of interval)
 * @param {number} limitTime the time limit of a group that user set
 */
export const configureGroup = (groupID, intervalAmount, coefficient, fnType, limitTime) => {
    // console.log("configuring");
    const currentApp = trackingGroups[groupID]
    currentApp.intervalAmount = intervalAmount;
    currentApp.notifyFnType = fnType;
    currentApp.dailyLimit = limitTime;

    switch(fnType){  
    case 2: 
        intervalAmount = Math.floor(limitTime/coefficient);
        break;
    case 3:
        coefficient = limitTime/intervalAmount;
        break;
    }
    currentApp.notifyFnCoeff = coefficient;

    // console.log(`interval set to: ${intervalAmount}, ${fnType}, ${coefficient}, ${limitTime}, ${equasionPreview(intervalAmount, fnType, coefficient, limitTime)}, `);
    currentApp.normalToLimit = equasionPreview(intervalAmount, fnType, coefficient, limitTime);

    currentApp.isActive = groupHaveAppStill(groupID);

    return true;
}

// return the scale factor from normalized value to actual value in minute
export const equasionPreview = (intervalAmount, fnType, coefficient, limitTime) => {
    let total = 0;
    const normalXFactor = 1/intervalAmount;
    //basically, total up how big a slice of cake each interval want, and map that sum to the configured limit to slice the limit for each interval
    //(after 2 days, only god shall understand this code)
    for(let x = 0; x < intervalAmount; x++){
        total += normalTimerMath(fnType, coefficient, x*normalXFactor);
        // console.log(total + ", " + x);
    }
    return limitTime/total    
   
}


//make sure the group only turn active when it have app to track
export const groupHaveAppStill = (groupID) => {
    const currentGroup = trackingGroups[groupID];
    for(const appProp of Object.values(trackedApps)){
        if(appProp.groupID === groupID){return true;}
    }
    currentGroup.isActive = false;
}

export const deleteGroup = (groupID) => {
    // console.log("removing group", groupID, typeof groupID);
    trackingGroups.splice(groupID, 1);
    for(const [key, appPropertie] of Object.entries(trackedApps)){
        const appGroupID = appPropertie.groupID;
        if(appGroupID === groupID){
            delete trackedApps[key];
            // console.log("is equal");

        //shift all the app's groupID by 1, if its group ID is after the deleted groupID
        }else if(appGroupID > groupID){
            // console.log("is greater");
            trackedApps[key].groupID = appGroupID-1; 
        }
    }
    // console.log("new trackedApps: ", trackedApps);
}

// const hi = () => {
//     const numOfInterval = 10;
//     const coefficient = 1;
//     const type = 2;
//     const limit = 10;

//     console.log("run tester");
//     let total = 0;
//     let scaleFactor = equasionPreview(numOfInterval, type, coefficient, limit);
//     console.log("tester, scale_facotr: " + scaleFactor);
//     for(let i = 0; i < 1; i += 1/(numOfInterval)){
//         let current = normalTimerMath(type, coefficient, i)*scaleFactor;
//         total += current
//         console.log(current);
//     }
//     console.log("total: " + total);
// }
// hi();
