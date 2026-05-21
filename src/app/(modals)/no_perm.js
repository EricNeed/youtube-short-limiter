import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { mainStyle } from "../../components/scheme_style";

export default function popupModals(){
    const {title, bodyText} = useLocalSearchParams();
    return <View style={{backgroundColor: mainStyle.container.backgroundColor+"88", flex:1, justifyContent: 'center'}}>
        <View style={{margin:30, padding:10, flex:0.5, backgroundColor: '#474747'}}>
            <Text style={{color: '#ffffff', fontSize: mainStyle.text.fontSize*2}}>{title}</Text>
            <Text style={{color: '#ffffff'}}>{bodyText}</Text>
        </View>
    </View>
}

export const popupModalWithParam = (title, bodyText) => router.push(`./no_perm?title=${title}&bodyText=${bodyText}`);