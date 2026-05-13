import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import { Stack } from 'expo-router';
import { SelectedAppProvider } from '../utils/settings/global_var';

export default function RootLayout() {
  return <SelectedAppProvider><Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack></SelectedAppProvider>
}


ReactNativeForegroundService.register({
  config: {
    alert: true,
    onServiceErrorCallBack: () => {
      console.error("Foreground service error occurred");
    },
  }
})


ReactNativeForegroundService.add_task(() => update(), {
  delay: 1000,
  onLoop: true,
  taskId: "taskid",
  onError: (e) => console.log(`Error logging:`, e),
});
