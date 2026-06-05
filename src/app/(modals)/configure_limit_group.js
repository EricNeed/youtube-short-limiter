import { Host, Slider } from "@expo/ui/jetpack-compose";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { Divider, IconButton, SegmentedButtons } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStyle } from "../../components/scheme_style";
import { NumInput } from "../../components/single_componet";
import { symbolCache } from "../../components/symbol_cache";
import { equasionPreview, getSelectedApps } from "../../utils/settings/tracked_apps";
import { normalTimerMath } from "../../utils/shared_utils";

export default function ConfigureGroupPage(){
    const {groupID} = useLocalSearchParams();
    
    const {updateUIApps, trackingGroups, trackedApps} = getSelectedApps();
    const currentGroup = trackingGroups[groupID];

    const [settings, changeSettings] = useState({
        segButonValue: 2,
        constInterval: true,
        fnType: 2,
        intervalAmount: 0,
        dailyLimit: Infinity,
        notifyFnCoeff: 0,
        currentState: false,
    });


    let sliderDiscription = "";
    let sliderStartNum = 0;
    let sliderEndNum = 0;
    let intervalPreview = "";
    const setSetting = (key, newValue) => {
        if(key === ""){
            switch(settings.segButonValue){
            case 0:
                sliderDiscription = "the slope of interval equasion"
                sliderStartNum = 0.001;
                sliderEndNum = 1;
            case 1:
                sliderDiscription = "the base of interval equasion"
                sliderStartNum = -1;
                sliderEndNum = 0;
            case 2:
                sliderDiscription = "the base of interval equasion"
                sliderStartNum = -1;
                sliderEndNum = 0; 
            }
        }

        changeSettings({
            ...settings,
            [key]: newValue
        });
    }

    // const theme = useTheme(); //later

    // console.log("fn type: " + settings.fnType);
    

    if(settings.fnType === 0){
        
    }else if(settings.fnType === 1){
        
    }else if(settings.fnType === 2){

    }
    const [sliderValue, setSliderValue] = useState((sliderEndNum-sliderStartNum)/2); 


    return <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}></View>
        <View style={{flex:2, backgroundColor:'#333333aa', padding: 5, borderColor: '#555555', borderTopWidth:4, borderRightWidth:4, borderLeftWidth:4}}>
            <View style={{flexDirection: "row", alignSelf: "stretch", justifyContent: "space-between",}}>
                <Text style={{color: '#ffffff', fontSize: mainStyle.text.fontSize*1.8}} >{trackingGroups[groupID].name}</Text>
                <IconButton icon={({color}) => (symbolCache.close(color))} mode='contained' onPress={() => router.back()}/>
            </View>
            <SegmentedButtons
                value={settings.segButonValue}
                onValueChange={(value) => {setSetting("segButonValue", value)}}
                buttons={[
                {value:0, label:'Linear'},
                {value:1, label:'Exponential'},
                {value:2, label:'Constant'},
                ]}
            />
            <Divider style={{margin:10}}/>

            <Text style={{color: '#ffffff'}}>*Limit: how long you will be using these app today</Text>
            <NumInput
                lable = "Set limit: "
                placeholder = "in minute"
                defaultValue = {settings.dailyLimit === Infinity? undefined:`${settings.dailyLimit}`} 
                onNumberChange={(value)=>{settings.dailyLimit = value}}
            />
            <Text style={{color: '#ffffff'}}>*Interval: total amount of message send to remind you</Text>
            <NumInput
                lable = "Set interval: "
                placeholder = "in minute"
                defaultValue = {currentGroup.intervalAmount === 0? undefined:`${currentGroup.dailyLimit}`} 
                onNumberChange={(value)=>{currentGroup.dailyLimit = value}}
            />

            <Text style={{color: '#ffffff'}}>*{sliderDiscription}</Text>
            <View style={{flexDirection: "row", alignSelf: "stretch", justifyContent: "space-between", paddingBottom: 5}}>
                <Text style={{color: '#ffffff'}}>{sliderStartNum}</Text>
                <Text style={{color: '#ffffff'}}>{sliderEndNum}</Text>
            </View>
            <Host style={{ width: '100%', height: 10 }}>
                <Slider value={sliderValue} min={sliderStartNum} max={sliderEndNum} onValueChange={setSliderValue} steps={0.001}/>
            </Host>
            
            <Text style={{color: '#ffffff'}}>Current: {Math.round(sliderValue*1000)/1000}</Text>

            <Text style={{color: '#ffffff'}}>Interval Trend:</Text>
            {/* <Text style={{color: '#ffffff'}}>{getIntervalPreview(currentGroup.intervalAmount, fnType, sliderValue, currentGroup.dailyLimit)}</Text> */}
        </View>
    </SafeAreaView>
}

//<IconButton icon={() => (<SymbolView name={{android: 'settings', web: 'settings'}} fallback={<Text>?⚙️?</Text>}/>)} mode='contained-tonal'/>

const getIntervalPreview = (intervalAmount, type, coefficient, limitTime) => {
    const scaleFactor = equasionPreview(intervalAmount, type, coefficient, limitTime);
    let preview = "";
    const intervalNormal = 1/intervalAmount;
    if (intervalAmount < 7){
        for(let x = 1; x < intervalAmount; x++){
            preview += normalTimerMath(type, coefficient, x*intervalNormal) + ", ";
            console.log("once");
        }
    }else{
        for(let x = 1; x <= 3; x++){
            preview += normalTimerMath(type, coefficient, x*intervalNormal) + ", ";
        }
        preview += "..., "
        for(let x = intervalAmount-2; x <= intervalAmount; x++){
            preview += normalTimerMath(type, coefficient, x*intervalNormal) + ", ";
        }
    }
    return preview;
}