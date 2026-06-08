import { Host, Slider } from "@expo/ui/jetpack-compose";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Divider, IconButton, RadioButton, SegmentedButtons, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStyle } from "../../components/scheme_style";
import { NumInput } from "../../components/single_componet";
import { getSymbolConfigured } from "../../components/symbol_cache";
import { configureGroup, equasionPreview, getSelectedApps } from "../../utils/settings/tracked_apps";
import { coefficientValidRange, normalTimerMath } from "../../utils/shared_math";

const componentArgs = [//[sliderDiscription, sliderStartNum, sliderEndNum, displayRoundFactor],
    ["the slope of interval equasion", -1, 0, 1000],
    ["the base of interval equasion", 0.001, 1, 1000],
    ["length of interval in minute to send reminder", 1, 100, 1],
]



export default function ConfigureGroupPage(){
    const {groupID} = useLocalSearchParams();
    
    const {updateUIApps, trackingGroups, trackedApps} = getSelectedApps();
    const currentGroup = trackingGroups[groupID];

    // console.log(`current group`, currentGroup);

    const [isInputing, setFocusState] = useState(false);
    const [settings, changeSettings] = useState({
        segButonValue: currentGroup.notifyFnType===3?2:currentGroup.notifyFnType,
        isConstInterval: (currentGroup.notifyFnType!==3), //choose between "const interval" or "const amount of interval", default is true(for new created group)
        fnType: currentGroup.notifyFnType,
        intervalAmount: currentGroup.intervalAmount,
        dailyLimit: currentGroup.dailyLimit,
        sliderValue: currentGroup.notifyFnCoeff,
        name: currentGroup.name,
        cannotSave: false,
    });

    const setSetting = (key, newValue) => {
        const newSettings = {...settings, [key]: newValue,};

        switch(key){
        case "segButonValue":
            newSettings.fnType = newValue;
            newSettings.isConstInterval = true;
            newSettings.sliderValue = (componentArgs[newValue][2]-componentArgs[newValue][1])/2;
            // console.log(`new slider value, start:${componentArgs[1]}, end:${componentArgs[2]}, result:${newSettings.sliderValue}, fntype:${newSettings.fnType}`);
            break;
        case "isConstInterval":
            newSettings.fnType = newValue?2:3;
            break;
        case "sliderValue":
            const roundingFactor = componentArgs[newSettings.fnType][3]
            newSettings.sliderValue = Math.floor(newValue*roundingFactor)/roundingFactor;
            break;
        case "dailyLimit":
            newSettings.dailyLimit = newValue<1? Infinity:newValue;
            componentArgs[2][2] = newSettings.dailyLimit;
        }

        changeSettings(newSettings);
    }

    // const theme = useTheme(); //later
    // console.log("fn type: " + settings.fnType);
    
    

    return <SafeAreaView style={{flex:1}}>
        {!isInputing && <View style={{flex:1}}></View>}

        <View style={{flex:2, backgroundColor:'#333333aa', padding: 5, borderColor: '#555555', borderTopWidth:4, borderRightWidth:4, borderLeftWidth:4}}>
            <ScrollView>
                <View style={mainStyle.switch_container}>
                    {/* <Text style={{color: '#ffffff', fontSize: mainStyle.text.fontSize*1.8}} >{trackingGroups[groupID].name}</Text> */}
                    <TextInput
                        dense={true}
                        style={{backgroundColor: '#00000000', fontSize: mainStyle.text.fontSize*1.8, maxHeight:38}}
                        textColor='#ffffff'
                        value={settings.name}
                        onChangeText={(value)=>setSetting("name", value)}
                    />
                    <IconButton icon={({color}) => getSymbolConfigured("close", color)} mode='contained' onPress={() => router.back()}/>
                </View>

                <SegmentedButtons
                    value={settings.segButonValue}
                    onValueChange={(value) => setSetting("segButonValue", value)}
                    buttons={[
                        {value:2, label:'Constant'},
                        {value:0, label:'Linear'},
                        {value:1, label:'Exponential'},
                    ]}
                />
                <Divider style={{margin:10}}/>

                <Text style={{color: '#ffffff'}}>*Limit: how long you will be using these app today</Text>
                <NumInput
                    lable = "Set limit: "
                    placeholder = "in minute"
                    defaultValue = {settings.dailyLimit === Infinity? undefined:`${settings.dailyLimit}`} 
                    onNumberChange={(value)=>setSetting("dailyLimit", value)}
                    onFocusOrBlur={(isFocused)=>setFocusState(isFocused)}
                />

                {settings.fnType !== 2 && <>
                    <Text style={{color: '#ffffff'}}>*Interval: total amount of message send to remind you</Text>
                    <NumInput
                        lable = "Set interval: "
                        placeholder = "in minute"
                        defaultValue = {settings.intervalAmount === 0? undefined:`${settings.intervalAmount}`} 
                        onNumberChange={(value)=>setSetting("intervalAmount", value)}
                        onFocusOrBlur={(isFocused)=>setFocusState(isFocused)}
                    />
                </>}

                {(settings.fnType === 2 || settings.fnType === 3) && <View style={[mainStyle.switch_container, {alignItems: 'center', paddingBottom: 5}]}>
                    <Text style={{color: '#ffffff'}}>*Configure number of intervals: </Text>
                    <Text style={{color: '#ffffff'}}>---------------------------</Text>
                    <RadioButton 
                        status={ settings.fnType === 3? 'checked' : 'unchecked' }
                        onPress={()=>setSetting("isConstInterval", !settings.isConstInterval)}
                    />
                </View>}

                {settings.fnType !== 3 && <>
                    <Text style={{color: '#ffffff'}}>*{componentArgs[settings.fnType][0]}</Text>
                    <View style={[mainStyle.switch_container, {paddingBottom:5}]}>
                        <Text style={{color: '#ffffff'}}>{componentArgs[settings.fnType][1]}</Text>
                        <Text style={{color: '#ffffff'}}>{componentArgs[settings.fnType][2]}</Text>
                    </View>
                    <Host style={{ width: '100%', height: 10 }}>
                        <Slider value={settings.sliderValue} min={componentArgs[settings.fnType][1]} max={componentArgs[settings.fnType][2]} onValueChange={(value)=>setSetting("sliderValue", value)}/>
                    </Host>
                    <Text style={{color: '#ffffff'}}>Current: {settings.sliderValue}</Text>
                </>}

                <Text style={{color: '#ffffff'}}>Interval Trend (min): {getIntervalPreview(settings.intervalAmount, settings.fnType, settings.sliderValue, settings.dailyLimit)}</Text>

                {settings.cannotSave && <Text style={{alignSelf: 'center', color: '#9b0000'}}>
                    Config cannot be saved: invalid arguments
                </Text>}
                <View style={[mainStyle.switch_container, {padding: 15}]}>
                    <Button mode='elevated' onPress={() => router.push(`../select_app?groupID=${groupID}`)}> Select Apps </Button>
                    <Button mode='elevated' onPress={() => {
                        //check if anthing is invalid for last time
                        if((settings.intervalAmount === 0 && settings.fnType < 2) || settings.sliderValue > componentArgs[settings.segButonValue][2] || settings.sliderValue < componentArgs[settings.segButonValue][1] || settings.dailyLimit === Infinity){
                            setSetting("cannotSave", true);
                            return;
                        }
                        configureGroup(groupID, settings.intervalAmount, settings.sliderValue, settings.fnType, settings.dailyLimit);
                        currentGroup.name = settings.name;
                        router.back();
                    }}
                    > Save Changes </Button>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
}

//<IconButton icon={() => (<SymbolView name={{android: 'settings', web: 'settings'}} fallback={<Text>?⚙️?</Text>}/>)} mode='contained-tonal'/>

const getIntervalPreview = (intervalAmount, type, coefficient, limitTime) => {
    // console.log(`generating preview ${intervalAmount}, ${type}, ${coefficient}, ${limitTime}, `);
    if((intervalAmount === 0 && type !== 2) || limitTime === Infinity){return "insufficient argument"}
    if(coefficient < coefficientValidRange[type][0] || coefficient > coefficientValidRange[type][1]){return "invalid coefficient"}


    let extraTime = 0; //only used on fnType 2 (constant with set interval), because could have extra time
    if(type === 3){
        coefficient = limitTime/intervalAmount;
    }
    else if(type === 2){
        intervalAmount = Math.floor(limitTime/coefficient);
        const limitTimeValid = coefficient * intervalAmount;
        extraTime = limitTime - limitTimeValid;
        limitTime = limitTimeValid;
    }

    

    const scaleFactor = equasionPreview(intervalAmount, type, coefficient, limitTime);
    const intervalNormal = 1/intervalAmount;
    const doMath = (x) => preview += Math.round((normalTimerMath(type, coefficient, x*intervalNormal)*scaleFactor)*100)/100 + ", "

    let preview = "";
    if(intervalAmount > 6){
        for(let i = 1; i <= 3; i++){
            doMath(i);
        }
        preview += "..., "
        for(let i = intervalAmount-2; i <= intervalAmount; i++){
            doMath(i);
        }
    }else{
        for(let i = 1; i <= intervalAmount; i++){
            doMath(i);
        }
    }

    preview += extraTime>0? extraTime:"";
    return preview;
}