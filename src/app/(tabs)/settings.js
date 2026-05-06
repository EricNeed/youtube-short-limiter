import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { mainStyle } from '../../components/scheme_style';

export default function SettingScreen() {
  const routePopup = useRouter()

  return (
    <View style={mainStyle.container}>
      <Text style={mainStyle.text}>Welcome to the settings tab</Text>
      <Button title='set apps' onPress={() => (routePopup.push("/(modals)/select_app"))}/>
    </View>
  );
}