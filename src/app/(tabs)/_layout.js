import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Text } from 'react-native';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (<SymbolView name={{android: 'home'}} size={30} tintColor={color} fallback={<Text>?🏠?</Text>}/>)
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: 'data'
        }}
      />
    </Tabs>
  );
}