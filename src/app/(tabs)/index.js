import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';

export default function HomeScreen() {
  return (
    <SafeAreaView style={mainStyle.container}>
      <Text style={mainStyle.text}>Welcome to the Home Tab!</Text>
    </SafeAreaView>
  );
}