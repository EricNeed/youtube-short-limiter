import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>;
}








// import { StatusBar } from 'expo-status-bar';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { getUserStatsTest } from './services/user_stats';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={{ color: '#c9c9c9'}}>hi!</Text>
//       <StatusBar style="auto" />
//       <Button title='vnsfuibhuid' onPress={() => getUserStatsTest()} />
//       <Button title='hi' onPress={() => getUserStatsTest()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
