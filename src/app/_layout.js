import { Stack } from 'expo-router';
import { setupForegroundService } from '../utils/service_wrapper/foreground_service';
import { SelectedAppProvider } from '../utils/settings/global_var';

export default function RootLayout() {
  return <SelectedAppProvider><Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack></SelectedAppProvider>
}

setupForegroundService();