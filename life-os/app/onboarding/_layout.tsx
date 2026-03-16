import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/theme';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="focus-setup" />
      <Stack.Screen name="priorities" />
      <Stack.Screen name="routines" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
