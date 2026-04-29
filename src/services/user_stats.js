import { hasUsageStatsPermission } from "expo-android-usagestats";

export async function getUserStatsTest(){
    console.log("getting the permission info...");
    console.log( await hasUsageStatsPermission());
    if(!hasUsageStatsPermission()){
        
    }

}