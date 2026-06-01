import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { mainStyle } from "../../components/scheme_style";
import { getAppListParsed } from "../../utils/service_wrapper/user_stats";
import { getSelectedApps } from "../../utils/settings/tracked_apps";

export default function selectApp(){
    const {groupID} = useLocalSearchParams();
    const {trackedApps, refreshListener, updateUIApps, trackingGroups} = getSelectedApps();
    const appList = getAppListParsed(trackedApps);

    //flatlist call this function to draw each button
    const displayButton = ({item}) => {
        return <View style={[mainStyle.switch_container, {borderColor:mainStyle.borderColor, borderBottomWidth:mainStyle.borderWidth}]}>
            <Text style={mainStyle.text}>{item.appName}</Text>
            <Switch 
                theme={{animation:{scale: 0}}}
                value={item.isTracked} 
                onValueChange={()=>{
                    //adding or removing app from a tracking list
                    if(item.isTracked){
                        delete trackedApps[item.packageName];
                    }else{
                        const currentListItem = trackedApps[item.packageName] = {};
                        currentListItem.appName = item.appName;
                        currentListItem.category = item.category;
                        currentListItem.groupID = groupID;
                        currentListItem.lastOpened = Date.now();
                    }
                    updateUIApps();
                }}
            />
        </View>
    };

    return <View style={mainStyle.container} >

        <Stack.Screen options={{
            title: 'Select Apps',
            headerStyle: { backgroundColor: mainStyle.container.backgroundColor },
            headerTintColor: mainStyle.text.color,
        }}/>
        <Text style={mainStyle.text} >select application to track: </Text>
        <FlatList
            data={appList}
            renderItem={displayButton}
        />

    </View>   
}