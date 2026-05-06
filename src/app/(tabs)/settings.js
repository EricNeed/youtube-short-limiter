import { Text, View } from 'react-native';
import { mainStyle } from '../../components/scheme_style';

export default function SettingScreen() {
  return (
    <View style={mainStyle.container}>
      <Text>Welcome to the settings tab</Text>
    </View>
  );
}