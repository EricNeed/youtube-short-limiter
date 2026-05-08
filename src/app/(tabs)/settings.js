import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';

export default function SettingScreen() {
  const routePopup = useRouter()

  return (
    <SafeAreaView style={mainStyle.container}>
      <Text style={mainStyle.text}>Welcome to the settings tab</Text>
      <Button title='set apps' onPress={() => (routePopup.push("/(modals)/select_app"))}/>
    </SafeAreaView>
  );
}