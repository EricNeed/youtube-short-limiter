import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';
import { testNotification } from '../../utils/service_wrapper/notification';
import { getSelectedApps } from '../../utils/settings/tracked_apps';

export default function SettingScreen() {

  const routePopup = useRouter()

  const [showError, setShowError] = useState(false);

  const {trackingGroups} = getSelectedApps();
  const currentGroup = trackingGroups[0];


  return (
    <SafeAreaView style={mainStyle.container}>
      <Text style={mainStyle.text}>Welcome to the settings tab</Text>
      <Button title='set apps' onPress={() => routePopup.push(`../../(modals)/select_app?groupID=0`)}/>
      <Button title='test notification' onPress={() => (testNotification())}/>

      {/* <NumInput
        lable = "Set limit timer (in minute)"
        placeholder = ""
        defaultValue = {currentGroup.dailyLimit} 
        onNumberChange={(num) => currentGroup.dailyLimit = num}
      /> */}
    </SafeAreaView>
  );
}