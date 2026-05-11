import { Stack } from "expo-router";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { mainStyle } from "../../components/scheme_style";
import { SelectedAppContext } from "../../utils/settings/global_var";

export default function selectApp(){

    const apps = useContext(SelectedAppContext);

    console.log(apps);

    const hi = ["1", "2", "3", "4", "5"];

    //flatlist call this function to draw each button
    const displayButton = ({item}) => {
        let isSwitchOn = false;
        return <View style={[mainStyle.switch_container, {borderColor:mainStyle.borderColor, borderBottomWidth:mainStyle.borderWidth}]}>
            <Text style={mainStyle.text}>hi</Text>
            <Switch value={isSwitchOn} onValueChange={()=>(console.log("button triggeted"))}/>
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
            data={hi}
            renderItem={displayButton}
        />

    </View>
    
}
