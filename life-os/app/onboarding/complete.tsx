import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { useAuthStore } from '@/stores/auth-store';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { categoryRepository } from '@/repositories';
import { supabase } from '@/lib/supabase';
import { colors, spacing } from '@/theme';

export default function CompleteScreen() {
  const insets = useSafeAreaInsets();
  const { user, setHasOnboarded } = useAuthStore();
  const { focusAreas, priorities, selectedRoutines, reset } = useOnboardingStore();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (!user) return;
    setIsCompleting(true);

    try {
      // Seed default categories
      await categoryRepository.seedDefaults(user.id);

      // Mark profile as onboarded
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          has_onboarded: true,
          email: user.email,
        });

      setHasOnboarded(true);
      reset();
      router.replace('/(tabs)');
    } catch (error) {
      // Still allow proceeding even if seeding partially fails
      setHasOnboarded(true);
      reset();
      router.replace('/(tabs)');
    }
  };

  return (
    <ScreenContainer scrollable={false} padded>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.center}>
          <View style={styles.checkCircle}>
            <AppText variant="title" color={colors.success}>
              ✓
            </AppText>
          </View>
          <Spacer size="2xl" />
          <AppText variant="largeTitle" align="center">
            You're all set
          </AppText>
          <Spacer size="md" />
          <AppText variant="body" align="center" style={styles.body}>
            Your Life OS is ready. Start with what matters most today.
          </AppText>

          <Spacer size="2xl" />

          {focusAreas.length > 0 && (
            <View style={styles.summaryRow}>
              <AppText variant="caption">
                {focusAreas.length} focus {focusAreas.length === 1 ? 'area' : 'areas'}
              </AppText>
              <AppText variant="caption" color={colors.textMuted}>
                {' · '}
              </AppText>
              <AppText variant="caption">
                {priorities.length} {priorities.length === 1 ? 'priority' : 'priorities'}
              </AppText>
              <AppText variant="caption" color={colors.textMuted}>
                {' · '}
              </AppText>
              <AppText variant="caption">
                {selectedRoutines.length} {selectedRoutines.length === 1 ? 'routine' : 'routines'}
              </AppText>
            </View>
          )}
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing['2xl'] }]}>
          {isCompleting ? (
            <ActivityIndicator size="small" color={colors.accent} />
          ) : (
            <PrimaryButton title="Open Life OS" onPress={handleComplete} />
          )}
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
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    maxWidth: 280,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    paddingTop: spacing.lg,
  },
});
