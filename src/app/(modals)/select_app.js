import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { mainStyle } from "../../components/scheme_style";

export default function selectApp(){

    const hi = ["1", "2", "3", "4", "5"];

    //flatlist call this function to draw each button
    const displayButton = ({item}) => (
        <View>
            {/* <Switch/> */}
            <Text style={mainStyle.text}>hi</Text>
        </View>
    );

    return <View style={mainStyle.container}>

        <Stack.Screen options={{
            title: 'Select Apps',
            headerStyle: { backgroundColor: mainStyle.container.backgroundColor },
            headerTintColor: mainStyle.text.color,
        }}/>
        <Text style={mainStyle.text}>hi</Text>
        
        <FlatList
            data={hi}
            renderItem={displayButton}
        />

    </View>
    
}
