import * as Notification from 'expo-notifications';

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
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
}

//only use this if is on android
async function setupChannels() {
    await Notification.setNotificationChannelAsync('test', {
        name: 'test',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
    });

    //other channels should declear here
}