import { Text, View } from 'react-native';
import { mainStyle } from '../../components/scheme_style';

export default function DataScreen() {
  return (
    <View style={mainStyle.container}> 
      <Text style={mainStyle.text}>Welcome to the data tab! here displays your screen time usage, window width {mainStyle._internal.windowWidth}</Text>
    </View>
  );
}