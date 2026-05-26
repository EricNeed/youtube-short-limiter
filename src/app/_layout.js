import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { setupForegroundService } from "../utils/service_wrapper/foreground_service";
import { requestNotificationPermission } from '../utils/service_wrapper/notification';
import { appUsageProcess } from '../utils/service_wrapper/usage_evaluator';
import { requestUsagePerm } from '../utils/service_wrapper/user_stats';
import { SelectedAppProvider } from '../utils/settings/global_var';
import { popupModalWithParam } from './(modals)/no_perm';

export default function RootLayout() {
  console.log("app interface working");
  return <SelectedAppProvider><Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/select_app"/>
      <Stack.Screen name="(modals)/no_perm" options={{presentation: 'transparentModal', animation: 'fade'}}/>
    </Stack></SelectedAppProvider>
}


//oly ask for service when its actually in android
if(Platform.OS !== 'android'){
  popupModalWithParam("Warning", "This program was not running on a android device, many service are unavilable on the current platform");
}else{
  setupForegroundService();
  requestNotificationPermission();
  requestUsagePerm();
}

appUsageProcess();
