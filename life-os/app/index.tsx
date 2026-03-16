import { Redirect } from 'expo-router';

export default function Index() {
  // In Milestone 2, this will check auth state and redirect accordingly.
  // For now, go straight to tabs.
  return <Redirect href="/(tabs)" />;
}
