import { Text, View } from 'react-native';
import { mainStyle } from '../../components/scheme_style';

export default function HomeScreen() {
  return (
    <View style={mainStyle.container}>
      <Text>Welcome to the Home Tab!</Text>
    </View>
  );
}