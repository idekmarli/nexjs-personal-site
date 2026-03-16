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

export default function SignInScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer scrollable={false} padded>
      <View style={[styles.content, { paddingTop: insets.top + spacing['6xl'] }]}>
        <AppText variant="largeTitle" align="center">
          Life OS
        </AppText>
        <AppText variant="body" align="center" style={styles.tagline}>
          Your calm personal operating system
        </AppText>

        <Spacer size="6xl" />

        <PrimaryButton title="Sign In" onPress={() => {}} />
        <Spacer size="lg" />
        <Link href="/(auth)/sign-up" style={styles.link}>
          <AppText variant="label" color={colors.accent} align="center">
            Create an account
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
