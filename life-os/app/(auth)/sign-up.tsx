import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  Spacer,
} from '@/components/primitives';
import { colors, spacing } from '@/theme';

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer scrollable={false} padded>
      <View style={[styles.content, { paddingTop: insets.top + spacing['6xl'] }]}>
        <AppText variant="largeTitle" align="center">
          Welcome
        </AppText>
        <AppText variant="body" align="center" style={styles.tagline}>
          Start building your personal operating system
        </AppText>

        <Spacer size="6xl" />

        <PrimaryButton title="Create Account" onPress={() => {}} />
        <Spacer size="lg" />
        <Link href="/(auth)/sign-in" style={styles.link}>
          <AppText variant="label" color={colors.accent} align="center">
            Already have an account? Sign in
          </AppText>
        </Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  tagline: {
    marginTop: spacing.sm,
  },
  link: {
    alignSelf: 'center',
  },
});
