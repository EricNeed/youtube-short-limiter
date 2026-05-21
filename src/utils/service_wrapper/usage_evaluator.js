import { getUsageStats } from "expo-android-usagestats";
import { getSelectedApps } from "../settings/global_var";

export const appUsageProcess = async () => {
    const appList = await getUsageStats();

    const {trackedApps, dailyLimit} = getSelectedApps();

    // Date.UTC();

    let current_timer = 0;

    for(const appUsage of appList){
        if(trackedApps[appList.packageName] === undefined){return;}

        console.log(appUsage);
    }
}