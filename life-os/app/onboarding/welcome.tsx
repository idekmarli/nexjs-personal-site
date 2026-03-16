import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { colors, spacing } from '@/theme';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer scrollable={false} padded>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.center}>
          <View style={styles.logoCircle}>
            <AppText variant="title" color={colors.accent}>
              ✦
            </AppText>
          </View>
          <Spacer size="3xl" />
          <AppText variant="largeTitle" align="center">
            Welcome to{'\n'}Life OS
          </AppText>
          <Spacer size="xl" />
          <AppText variant="body" align="center" style={styles.body}>
            A calm, intelligent space to run your life — not just your tasks.
            Let's set up the essentials in under a minute.
          </AppText>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing['2xl'] }]}>
          <PrimaryButton
            title="Let's Begin"
            onPress={() => router.push('/onboarding/focus-setup')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    maxWidth: 300,
  },
  footer: {
    paddingTop: spacing.lg,
  },
});
