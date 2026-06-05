import { router } from 'expo-router';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';

export default function HomeScreen() {
  return (
    <SafeAreaView style={mainStyle.container}>
      <Text style={mainStyle.text}>Welcome to the Home Tab!</Text>
      <Button mode='elevated' onPress={() => router.push('../(modals)/configure_limit_group?groupID=0')}> Edit </Button>
    </SafeAreaView>
  );
}