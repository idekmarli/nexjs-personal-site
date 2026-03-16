import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  Card,
  SectionHeader,
  EmptyStateCard,
  Spacer,
} from '@/components/primitives';
import { colors, spacing } from '@/theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function WeekHeader() {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const dayOfWeek = today.getDay();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
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

function WeeklyFocusSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Weekly Focus" action="Edit" onAction={() => {}} />
      <EmptyStateCard
        title="No weekly focus set"
        description="Complete a Weekly Reset to define your focus"
        actionLabel="Start Weekly Reset"
        onAction={() => {}}
      />
    </View>
  );
}

function OpenLoopsSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Open Loops" subtitle="Items needing attention" />
      <Card variant="flat">
        <AppText variant="body" color={colors.textTertiary} align="center">
          Nothing pending
        </AppText>
      </Card>
    </View>
  );
}

function DropListSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Drop List" subtitle="What you're letting go this week" />
      <Card variant="outlined">
        <AppText variant="caption" align="center">
          Empty — a clean drop list means a clear mind
        </AppText>
      </Card>
    </View>
  );
}

export default function WeekScreen() {
  return (
    <ScreenContainer>
      <WeekHeader />
      <Spacer size="2xl" />
      <WeeklyFocusSection />
      <OpenLoopsSection />
      <DropListSection />
      <Spacer size="3xl" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {},
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
});
