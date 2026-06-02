import { createContext, useContext, useState } from "react";
//later for loading config: check all app in trackedApps exsist



// a list of all the apps selected by user to track time
export const trackingGroups = [];
/*trackingGroups = [
    {
        dailyLimit: Infinity,
        usageTimer: 0,
        name: "",
        notifyDeltaFnType: 0,  //0:linear, 1:expenential
        notifyDeltaFnValue: 0, //slope in decimal or exponential decay value

        nextNotify: 0, //the time you should notify the user
        notifyUsed: 0, //the message already sent
        intervalSum: 0, // all the interval add together
        normalToLimit: 0, //from 0-1 to 0-dailyLimit
        intervalAmount: 0, //amount of message in total
    },
    other group
]*/



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



// create a new group, and return the index in trackingGroups
const createTrackGroup = () => {
    const index = trackingGroups.length;
    trackingGroups[index] = {
        dailyLimit: Infinity,
        usageTimer: 0,
        name: "",
    };
    return index;
}
createTrackGroup();



// get the usage of a app before it start getting tracked or before program launch
const getUsageBeforeStart = (packageName) => {

}


const configureGroup = (groupID, intervalAmount, slope, fnType) => {
    const currentApp = trackingGroups[groupID]
    currentApp.intervalAmount = intervalAmount;
    currentApp.notifyDeltaFnType = fnType;
    currentApp.notifyDeltaFnValue = slope;


    for(let x = 0; x <= 1; x+=1/intervalAmount){
    }
}