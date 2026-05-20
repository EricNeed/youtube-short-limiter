import { Stack } from 'expo-router';
import { requestNotificationPermission } from '../utils/service_wrapper/notification';
import { SelectedAppProvider } from '../utils/settings/global_var';
export default function RootLayout() {
  return <SelectedAppProvider><Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack></SelectedAppProvider>
}

// setupForegroundService();
requestNotificationPermission();