import { getUsageEvents, getUsageStats } from 'expo-android-usagestats';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';
import { appUsageProcess } from '../../core/usage_evaluator';

export default function DataScreen() {
  return (
    <SafeAreaView style={mainStyle.container}> 
      <Text style={mainStyle.text}>Welcome to the data tab! here displays your screen time usage, window width {mainStyle._internal.windowWidth}</Text>
      <Button title='get usage data' onPress={() => appUsageProcess()}/>
      <Button title='test' onPress={async () => {
        console.log(await getUsageStats(Date.now() - 60000, Date.now()));
      }}/>
      <Button title='test2' onPress={async () => {
        console.log(await getUsageEvents(Date.now() - 60000, Date.now()));
        // getAggregatedUsageStats() 
      }}/>
    </SafeAreaView>
  );
}