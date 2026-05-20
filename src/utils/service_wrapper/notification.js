import * as Notification from 'expo-notifications';

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission(){
    const { status: currentStatus } = await Notification.getPermissionsAsync();
    let permStatus = currentStatus;

    //ask for permission if not granted yet
    if (currentStatus !== 'granted') {
        const { status } = await Notification.requestPermissionsAsync();
        permStatus = status;

        //no permission for me i guess
        if (finalStatus !== 'granted') {
            Alert.alert("Permission Required");
            return;
        }
    }
    // console.log("permission is granted!");
}

//only use this if is on android
async function setupChannels() {
    console.log("setup channel is triggered");
    await Notification.setNotificationChannelAsync('test', {
        name: 'test',
        importance: Notification.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
    });

    //other channels should declear here
}
setupChannels();


//test notification for yes reasons
export const testNotification = async () => {
    await Notification.scheduleNotificationAsync({
      content: {
        title: "hello skibidi",
        body: 'This notification was triggered entirely within the app!',
        data: { data: 'hi' },
      },
      trigger: null,
      identifier: 'test'
    });
  };