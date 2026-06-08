import { Stack } from "expo-router"
import { Text, View } from "react-native"
import { mainStyle } from "../../components/scheme_style"

export default function theInstructions(){
    return <View style={mainStyle.container}>
        <Stack.Screen options={{
            title: 'Instruction',
            headerStyle: { backgroundColor: mainStyle.container.backgroundColor },
            headerTintColor: mainStyle.text.color,
        }}/>

        <Text style={mainStyle.text}> This app is meant to assist you to regulate your screen usage, by sending you notification about your screen time every configured intervals</Text>
        <Text style={mainStyle.text}> To start, create a app group and select interval and apps to track</Text>
    </View>
}