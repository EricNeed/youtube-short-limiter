import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';

export default function DataScreen() {
  return (
    <SafeAreaView style={mainStyle.container}> 
      <Text style={mainStyle.text}>Welcome to the data tab! here displays your screen time usage, window width {mainStyle._internal.windowWidth}</Text>
    </SafeAreaView>
  );
}