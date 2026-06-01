import { getAggregatedUsageStats, getUsageEvents, getUsageStats } from 'expo-android-usagestats';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';
import { appUsageProcess } from '../../core/usage_evaluator';

let datehiny = new Date();
const timeSinceMidNight = (datehiny.getHours()*60 + datehiny.getMinutes())*60000;
let aDayInMillis = 24*60*60*1000
export default function DataScreen() {
  return (
    <SafeAreaView style={mainStyle.container}> 
      <Text style={mainStyle.text}>Welcome to the data tab! here displays your screen time usage, window width {mainStyle._internal.windowWidth}</Text>
      <Button title='get usage data' onPress={() => appUsageProcess()}/>
      <Button title='test' onPress={async () => {
        console.log(await getUsageStats(Date.now() - 60000, Date.now()));
      }}/>
      <Button title='test2' onPress={async () => {
        let hi = await getUsageEvents(Date.now() - 5*60000, Date.now());
        console.log(hi);
      }}/>
      <Button title='test3' onPress={async () => {
        console.log(await getAggregatedUsageStats(Date.now() - timeSinceMidNight, Date.now() - timeSinceMidNight + aDayInMillis, 0));
      }}/>
    </SafeAreaView>
  );
}

/**
 * {"describeContents": 0, "firstTimeStamp": 1780281311785, "lastTimeForegroundServiceUsed": 1780347430936, "lastTimeStamp": 1780348073668, "lastTimeUsed": 1780347698527, "packageName": "com.anonymous.shortlimiter", "totalTimeForegroundServiceUsed": 9185984, "totalTimeInForeground": 969243, "totalTimeVisible": 970989}
 */