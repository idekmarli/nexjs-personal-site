import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  Card,
  SectionHeader,
  EmptyStateCard,
  PrimaryButton,
  SecondaryButton,
  Spacer,
} from '@/components/primitives';
import { DailyPlanningModal } from '@/components/planning/DailyPlanningModal';
import { WeeklyResetFlow } from '@/components/planning/WeeklyResetFlow';
import { colors, spacing } from '@/theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function WeekHeader() {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const dayOfWeek = today.getDay();

  return (
    <View style={{ paddingTop: insets.top + spacing.lg }}>
      <AppText variant="largeTitle">This Week</AppText>
      <Spacer size="lg" />
      <View style={styles.dayRow}>
        {DAYS.map((day, idx) => {
          const isToday = (idx + 1) % 7 === dayOfWeek;
          return (
            <View
              key={day}
              style={[styles.dayPill, isToday && styles.dayPillActive]}
            >
              <AppText
                variant="caption"
                weight="medium"
                color={isToday ? colors.textInverse : colors.textTertiary}
              >
                {day}
              </AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function WeekScreen() {
  const [showDailyPlanning, setShowDailyPlanning] = useState(false);
  const [showWeeklyReset, setShowWeeklyReset] = useState(false);

  return (
    <>
      <ScreenContainer>
        <WeekHeader />
        <Spacer size="2xl" />

        <View style={styles.section}>
          <SectionHeader title="Daily Plan" />
          <Card variant="elevated" style={styles.planCard}>
            <AppText variant="body" weight="medium" align="center">
              Plan your day
            </AppText>
            <Spacer size="sm" />
            <AppText variant="caption" align="center">
              Create a realistic plan based on your energy and priorities
            </AppText>
            <Spacer size="lg" />
            <PrimaryButton
              title="Start Planning"
              onPress={() => setShowDailyPlanning(true)}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Weekly Focus" />
          <EmptyStateCard
            title="No weekly focus set"
            description="Complete a Weekly Reset to define your focus"
            actionLabel="Start Weekly Reset"
            onAction={() => setShowWeeklyReset(true)}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Open Loops" subtitle="Items needing attention" />
          <Card variant="flat">
            <AppText variant="body" color={colors.textTertiary} align="center">
              Nothing pending
            </AppText>
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Drop List" subtitle="What you're letting go" />
          <Card variant="outlined">
            <AppText variant="caption" align="center">
              Empty — a clean drop list means a clear mind
            </AppText>
          </Card>
        </View>

        <Spacer size="3xl" />
      </ScreenContainer>

      <DailyPlanningModal
        visible={showDailyPlanning}
        onClose={() => setShowDailyPlanning(false)}
      />

      <WeeklyResetFlow
        visible={showWeeklyReset}
        onClose={() => setShowWeeklyReset(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayPill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    backgroundColor: colors.backgroundSubtle,
  },
  dayPillActive: {
    backgroundColor: colors.primary,
  },
  section: {
    marginBottom: spacing['2xl'],
  },
  planCard: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
});
