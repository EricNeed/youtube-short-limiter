import { createContext, useContext, useState } from "react";

const SelectedAppContext = createContext();

// a list of all the apps selected by user to track time
export const trackedApps = {};

export const SelectedAppProvider = ({children}) => {
    //use for componets to subscribe to "trackedApps" so they will show to config
    const [refreshListener, setAppUpdate] = useState(false);//load the selected app from from memory later
    //flip the true or false in the app
    const updateUIApps = () => setAppUpdate(draft => (!draft));


    //this will add to trackedApps if have more tracking groups later
    let [dailyLimit, setLimit] = useState(Infinity);

    return <SelectedAppContext.Provider value={{trackedApps, refreshListener, updateUIApps, dailyLimit, setLimit}}>
        {children}{/* all children of the components wrap around can use this provider */}
    </SelectedAppContext.Provider>
}

export const getSelectedApps = () => useContext(SelectedAppContext);