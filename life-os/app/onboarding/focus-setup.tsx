import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { CategorySlug } from '@/domain/types';
import { colors, spacing, radii } from '@/theme';

const FOCUS_OPTIONS: Array<{ slug: CategorySlug; icon: string; label: string }> = [
  { slug: 'business', icon: '💼', label: 'Business' },
  { slug: 'money', icon: '💰', label: 'Money' },
  { slug: 'home-life', icon: '🏠', label: 'Home & Life' },
  { slug: 'health', icon: '💪', label: 'Health' },
  { slug: 'relationships', icon: '❤️', label: 'Relationships' },
  { slug: 'growth', icon: '🌱', label: 'Growth' },
];

function FocusChip({
  icon,
  label,
  selected,
  onPress,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AppText variant="body">{icon}</AppText>
      <AppText
        variant="label"
        weight="medium"
        color={selected ? colors.textInverse : colors.textPrimary}
        style={styles.chipLabel}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
}

export default function FocusSetupScreen() {
  const insets = useSafeAreaInsets();
  const { focusAreas, toggleFocusArea } = useOnboardingStore();

  return (
    <ScreenContainer padded>
      <View style={{ paddingTop: insets.top + spacing['3xl'] }}>
        <AppText variant="overline">STEP 1 OF 4</AppText>
        <Spacer size="md" />
        <AppText variant="title">What areas matter most right now?</AppText>
        <Spacer size="sm" />
        <AppText variant="body">
          Pick 2–3 areas to focus on. You can always adjust later.
        </AppText>

        <Spacer size="3xl" />

        <View style={styles.chipGrid}>
          {FOCUS_OPTIONS.map((option) => (
            <FocusChip
              key={option.slug}
              icon={option.icon}
              label={option.label}
              selected={focusAreas.includes(option.slug)}
              onPress={() => toggleFocusArea(option.slug)}
            />
          ))}
        </View>

        <Spacer size="sm" />
        <AppText variant="caption" align="center">
          {focusAreas.length}/3 selected
        </AppText>

        <Spacer size="3xl" />

        <PrimaryButton
          title="Continue"
          onPress={() => router.push('/onboarding/priorities')}
          disabled={focusAreas.length === 0}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    backgroundColor: colors.backgroundSubtle,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    marginLeft: spacing.sm,
  },
});
