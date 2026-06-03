import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function configureGroupPage(){
    const {selectedGroup} = useLocalSearchParams();
    return <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}></View>
        <View style={{flex:2, backgroundColor: '#00ff00'}}>
            <Text style={{color: '#ffffff'}} >hihihihihihihihihi\nhi</Text>
        </View>
    </SafeAreaView>
}