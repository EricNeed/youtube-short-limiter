import { Stack } from "expo-router"
import { Text, View } from "react-native"
import { mainStyle } from "../../components/scheme_style"

export default function theInstructions(){
    return <View style={[mainStyle.container, {padding: '5%', alignItems: 'flex-start'}]}>
        <Stack.Screen options={{
            title: 'Instruction',
            headerStyle: { backgroundColor: mainStyle.container.backgroundColor },
            headerTintColor: mainStyle.text.color,
        }}/>

        <Text style={[mainStyle.text,{fontSize:mainStyle.text.fontSize*1.5}]}>Brief Discription:</Text>
        <Text style={mainStyle.text}> This app is meant to assist you to regulate your screen usage, by sending you notification about your screen time of selected  every configured intervals</Text>
        <Text> </Text>
        <Text style={mainStyle.text}> To start, create a app group and select interval and apps to track</Text>
        <Text> </Text>
        <Text style={[mainStyle.text,{fontSize:mainStyle.text.fontSize*1.5}]}>interval config page:</Text>
        <Text style={mainStyle.text}> The interval config page configure how long should the limiter send you reminder once, the trendline will give you a brief visual of what the interval would look like</Text>
        <Text> </Text>
        <Text style={mainStyle.text}>there are 4 types of interval calculation method: </Text>
        <Text style={mainStyle.text}> - Constant: remind you once every set interval you used apps in a group, (Ex: every 5 min)</Text>
        <Text style={mainStyle.text}> - Linear: the time between interval will decrease slowly as you approach your daily limit</Text>
        <Text style={mainStyle.text}> - Exponential: the interval will decrease slowly and at one point sharply decrease in interval</Text>
        {/* <Text style={mainStyle.text}> - </Text> */}
    </View>
}