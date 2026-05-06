import { Text, View } from 'react-native';
import { mainStyle } from '../../components/scheme_style';

export default function HomeScreen() {
  return (
    <View style={mainStyle.container}>
      <Text style={mainStyle.text}>Welcome to the Home Tab!</Text>
    </View>
  );
}