import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/theme';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { BootstrapScreen } from '@/components/BootstrapScreen';
import { useAuthStore } from '@/stores/auth-store';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const { session, isLoading, hasOnboarded } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboarding = segments[0] === 'onboarding';

    if (!session && !inAuthGroup) {
      // Not signed in — redirect to sign-in
      router.replace('/(auth)/sign-in');
    } else if (session && !hasOnboarded && !inOnboarding) {
      // Signed in but hasn't onboarded — redirect to onboarding
      router.replace('/onboarding/welcome');
    } else if (session && hasOnboarded && (inAuthGroup || inOnboarding)) {
      // Fully set up — redirect to main app
      router.replace('/(tabs)');
    }
  }, [session, isLoading, hasOnboarded, segments]);

  if (isLoading) {
    return <BootstrapScreen />;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RouteGuard>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
          <Stack.Screen name="onboarding" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
