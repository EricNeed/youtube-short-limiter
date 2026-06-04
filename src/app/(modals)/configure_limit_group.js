import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStyle } from "../../components/scheme_style";
import { symbolCache } from "../../components/symbol_cache";
import { getSelectedApps } from "../../utils/settings/tracked_apps";

export default function configureGroupPage(){
    const {groupID} = useLocalSearchParams();
    
    const {refreshListener, updateUIApps, trackingGroups, trackedApps} = getSelectedApps();

    return <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}></View>
        <View style={{flex:2, backgroundColor:'#333333aa', padding: 5, borderColor: '#555555', borderTopWidth:4, borderRightWidth:4, borderLeftWidth:4}}>
            <View style={{flexDirection: "row", alignSelf: "stretch", justifyContent: "space-between",}}>
                <Text style={{color: '#ffffff', fontSize: mainStyle.text.fontSize*1.8}} >{trackingGroups[groupID].name}</Text>
                <IconButton icon={({color}) => (symbolCache.close(color))} mode='contained'/>
            </View>
            <Button mode="elevated" onPress={() => console.log('Pressed')}>hi</Button>
        </View>
    </SafeAreaView>
}

//<IconButton icon={() => (<SymbolView name={{android: 'settings', web: 'settings'}} fallback={<Text>?⚙️?</Text>}/>)} mode='contained-tonal'/>
