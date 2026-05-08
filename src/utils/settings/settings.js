import { createContext, useContext } from "react";

const SelectedAppContext = createContext();

const SelectedAppProvider = ({children}) => {
    const appsCached = {}; // a list of all the apps selected by user to track time

    return <SelectedAppProvider.Provider value={appsCached}>
        {children}{/* all children of the components wrap around can use this provider */}
    </SelectedAppProvider.Provider>
}

export const getSelectedApp = () => useContext(SelectedAppContext);