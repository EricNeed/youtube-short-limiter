import { Tabs } from 'expo-router';
import { mainStyle } from '../../components/scheme_style';
import { symbolCache } from '../../components/symbol_cache';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: mainStyle.container.backgroundColor,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => symbolCache.home(color, size)
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: 'data',
          tabBarIcon: ({color, size}) => symbolCache.dataUsage(color, size)
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'settings',
          tabBarIcon: ({color, size}) => symbolCache.settings(color, size)
        }}
      />
    </Tabs>
  );
}