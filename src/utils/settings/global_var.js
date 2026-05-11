import { createContext, useContext, useState } from "react";

const SelectedAppContext = createContext();

const SelectedAppProvider = ({children}) => {
    // a list of all the apps selected by user to track time
    const [apps, setApps] = useState({});//load the selected app from from memory later

    //set apps is to give it a new list
    return <SelectedAppProvider.Provider value={apps, setApps}>
        {children}{/* all children of the components wrap around can use this provider */}
    </SelectedAppProvider.Provider>
}

export const getSelectedApp = () => useContext(SelectedAppContext);