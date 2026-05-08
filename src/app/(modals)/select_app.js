import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { mainStyle } from "../../components/scheme_style";

export default function selectApp(){

    return <View style={mainStyle.container}>
        <Stack.Screen options={{
            title: 'Select Apps',
            headerStyle: { backgroundColor: mainStyle.container.backgroundColor },
            headerTintColor: mainStyle.text.color,
        }}/>
        <Text style={mainStyle.text}>hi</Text>
        <Switch value={isOn} onValueChange={onToggleSwitch} />
        <Switch value={isOn} onValueChange={onToggleSwitch} />
    </View>
    
}
