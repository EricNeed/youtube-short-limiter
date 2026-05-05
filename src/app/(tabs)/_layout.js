import { Tabs } from 'expo-router';
import { IconSy } from 'expo-symbols';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home'
          tabBarIcon: <SymbolView name={{}}/>
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