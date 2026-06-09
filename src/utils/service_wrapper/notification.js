import * as Notification from 'expo-notifications';

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



//this should be triggered at the begining of the app to ask permission to send notification
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

    await Notification.setNotificationChannelAsync('reminder', {
        name: 'reminder',
        importance: Notification.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#058028',
    });

    //other channels should declear here
}
setupChannels();



/**
 * push a notification with any input
 * @param {Notification.NotificationRequestInput} requestInput
 */
export const pushNotification = async (requestInput) => {
  await Notification.scheduleNotificationAsync(requestInput);
};



//test notification for yes reasons
export const testNotification = () => pushNotification({
  content: {
    title: "hello skibidi",
    body: 'This notification was triggered entirely within the app!',
    data: { data: 'hi' },
  },
  trigger: null,
  identifier: 'reminder'
});

export const sendTimerReminder = (appName, timeLeft, timeSpent=0) => pushNotification({
  content: {
    title: `${timeSpent} min for ${appName}`,
    body: `How about take a break? you have ${timeLeft} minute left before reach your daily limit`,
    data: {appName, timeLeft, timeSpent},
  },
  trigger: null,
  identifier: 'reminder'
});