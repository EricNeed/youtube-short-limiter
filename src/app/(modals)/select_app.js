import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { mainStyle } from "../../components/scheme_style";

export default function selectApp(){
    return <View style={mainStyle.container}>
        <Stack.Screen options={{
            title: 'Select Apps',
            headerStyle: { backgroundColor: mainStyle.container.backgroundColor },
            headerTintColor: mainStyle.text.color,
        }}/>
        <Text style={mainStyle.text}>hi</Text>
    </View>
    
}