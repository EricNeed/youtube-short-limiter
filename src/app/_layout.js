import { router, Stack } from 'expo-router';
import { Platform } from 'react-native';
import { requestNotificationPermission } from '../utils/service_wrapper/notification';
import { requestUsagePerm } from '../utils/service_wrapper/user_stats';
import { SelectedAppProvider } from '../utils/settings/global_var';

export default function RootLayout() {
  console.log("app interface working");
  return <SelectedAppProvider><Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/select_app"/>
      <Stack.Screen name="(modals)/no_perm" options={{presentation: 'transparentModal', animation: 'fade'}}/>
    </Stack></SelectedAppProvider>
}



// setupForegroundService();
requestNotificationPermission();
requestUsagePerm();

if(Platform.OS !== 'android'){
  router.push("/(modals)/no_perm");
}



router.push("/(modals)/no_perm");