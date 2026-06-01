import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
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

      <TextInput 
        label="Set limit timer (in minute)"
        placeholder=""
        mode='outlined'
        dense={true}
        style={{width: mainStyle._internal.windowWidth, backgroundColor: '#000000'}}
        activeOutlineColor={mainStyle.text.color}
        outlineColor={mainStyle.borderColor}
        inputMode='numeric'
        textColor={mainStyle.text.color}
        value={currentGroup.dailyLimit}
        onChangeText={(text) => {
          const inNumber = +text;//turn to number
          //handle error and display error message
          if(isNaN(inNumber)){
            setShowError(true);
            return;
          }else if(showError){
            setShowError(false);
          }
          currentGroup.dailyLimitinNumber = currentGroup.dailyLimit;
        }}
      />
      <HelperText type="error" visible={showError}>
        Input can only be number
      </HelperText>
    </SafeAreaView>
  );
}