import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { colors, spacing, radii, shadows } from '@/theme';

const ROUTINE_OPTIONS = [
  {
    id: 'morning',
    icon: '☀️',
    name: 'Morning Routine',
    description: 'Start your day with intention',
  },
  {
    id: 'evening',
    icon: '🌙',
    name: 'Evening Wind-down',
    description: 'Close your day peacefully',
  },
  {
    id: 'weekly',
    icon: '📋',
    name: 'Weekly Reset',
    description: 'Strategic clarity once a week',
  },
];

function RoutineOption({
  icon,
  name,
  description,
  selected,
  onPress,
}: {
  icon: string;
  name: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.routineCard, selected && styles.routineCardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.routineIcon}>
        <AppText variant="heading">{icon}</AppText>
      </View>
      <View style={styles.routineContent}>
        <AppText variant="label" weight="semibold">
          {name}
        </AppText>
        <AppText variant="caption">{description}</AppText>
      </View>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && (
          <AppText variant="caption" color={colors.textInverse}>
            ✓
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function RoutinesScreen() {
  const insets = useSafeAreaInsets();
  const { selectedRoutines, toggleRoutine } = useOnboardingStore();

  return (
    <ScreenContainer padded>
      <View style={{ paddingTop: insets.top + spacing['3xl'] }}>
        <AppText variant="overline">STEP 3 OF 4</AppText>
        <Spacer size="md" />
        <AppText variant="title">Set up your routines</AppText>
        <Spacer size="sm" />
        <AppText variant="body">
          Choose which routines to start with. Keep it simple.
        </AppText>

        <Spacer size="2xl" />

        {ROUTINE_OPTIONS.map((routine) => (
          <React.Fragment key={routine.id}>
            <RoutineOption
              icon={routine.icon}
              name={routine.name}
              description={routine.description}
              selected={selectedRoutines.includes(routine.id)}
              onPress={() => toggleRoutine(routine.id)}
            />
            <Spacer size="md" />
          </React.Fragment>
        ))}

        <Spacer size="2xl" />

        <PrimaryButton
          title="Continue"
          onPress={() => router.push('/onboarding/complete')}
        />

        <Spacer size="md" />
        <TouchableOpacity onPress={() => router.push('/onboarding/complete')}>
          <AppText variant="label" color={colors.textTertiary} align="center">
            Skip for now
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  routineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.sm,
  },
  routineCardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  routineIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.backgroundSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  routineContent: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});
