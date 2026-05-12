import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';
import { getSelectedApps } from '../../utils/settings/global_var';

export default function SettingScreen() {
  const routePopup = useRouter()

  const {dailyLimit} = getSelectedApps();

  return (
    <SafeAreaView style={mainStyle.container}>
      <Text style={mainStyle.text}>Welcome to the settings tab</Text>
      <Button title='set apps' onPress={() => (routePopup.push("/(modals)/select_app"))}/>

      <TextInput 
        label="Set limit timer (in minute)"
        placeholder="Type something"
        mode='outlined'
        dense={true}
        style={{width: mainStyle._internal.windowWidth, backgroundColor: '#000000'}}
        activeOutlineColor={mainStyle.text.color}
        outlineColor={mainStyle.borderColor}
        inputMode='numeric'
        textColor={mainStyle.text.color}
        onChangeText={(text) => {
          console.log(+text);

        }}
      />

    </SafeAreaView>
  );
}