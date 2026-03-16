import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import { BootstrapScreen } from '@/components/BootstrapScreen';

export default function Index() {
  const { session, isLoading, hasOnboarded } = useAuthStore();

  if (isLoading) {
    return <BootstrapScreen />;
  }

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
}
