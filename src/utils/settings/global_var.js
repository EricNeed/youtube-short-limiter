import { createContext, useContext, useState } from "react";

const SelectedAppContext = createContext();

export const SelectedAppProvider = ({children}) => {
    // a list of all the apps selected by user to track time
    const [selectedApps, setAppList] = useState({});//load the selected app from from memory later

    let [dailyLimit, setLimit] = useState(Infinity);

    //set apps is to give it a new list
    return <SelectedAppContext.Provider value={{selectedApps, setAppList, dailyLimit, setLimit}}>
        {children}{/* all children of the components wrap around can use this provider */}
    </SelectedAppContext.Provider>
}

export const getSelectedApps = () => useContext(SelectedAppContext);