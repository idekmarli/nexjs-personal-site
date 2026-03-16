import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '@/theme';

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: Array<{
  name: string;
  title: string;
  iconFocused: TabIconName;
  iconDefault: TabIconName;
}> = [
  { name: 'index', title: 'Today', iconFocused: 'sunny', iconDefault: 'sunny-outline' },
  { name: 'week', title: 'Week', iconFocused: 'calendar', iconDefault: 'calendar-outline' },
  { name: 'capture', title: 'Capture', iconFocused: 'add-circle', iconDefault: 'add-circle-outline' },
  { name: 'areas', title: 'Areas', iconFocused: 'grid', iconDefault: 'grid-outline' },
  { name: 'assistant', title: 'Assistant', iconFocused: 'sparkles', iconDefault: 'sparkles-outline' },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundElevated,
          borderTopColor: colors.borderLight,
          borderTopWidth: 0.5,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: typography.size.xs,
          fontWeight: typography.weight.medium,
          marginTop: 2,
        },
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.iconDefault}
                size={tab.name === 'capture' ? 28 : 22}
                color={tab.name === 'capture' && focused ? colors.accent : color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
