import { createContext, useContext, useState } from "react";
//later for loading config: check all app in trackedApps exsist



// a list of all the apps selected by user to track time
export const trackingGroups = [];
/*trackingGroups = [
    {
        dailyLimit: Infinity,
        usageTimer: 0,
    },
    other group
]*/



//all the apps tracked
export const trackedApps = {};



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
    };
    return index;
}
createTrackGroup();