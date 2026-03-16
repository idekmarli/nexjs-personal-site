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
  LoadingSkeleton,
} from '@/components/primitives';
import { colors, spacing } from '@/theme';

function GreetingHeader() {
  const insets = useSafeAreaInsets();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <View style={[styles.greetingContainer, { paddingTop: insets.top + spacing.lg }]}>
      <AppText variant="largeTitle">{greeting}</AppText>
      <AppText variant="body" style={styles.greetingSubtitle}>
        Here's your day at a glance
      </AppText>
    </View>
  );
}

function PrioritySection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Top Priorities" action="See all" onAction={() => {}} />
      <EmptyStateCard
        title="No priorities yet"
        description="Add your most important tasks for today"
        actionLabel="Add Priority"
        onAction={() => {}}
      />
    </View>
  );
}

function RoutinesSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Routines" subtitle="Due today" />
      <Card variant="flat">
        <View style={styles.routineRow}>
          <View style={styles.routineIcon}>
            <AppText variant="body">☀️</AppText>
          </View>
          <View style={styles.routineContent}>
            <AppText variant="label">Morning Routine</AppText>
            <AppText variant="caption">5 steps · Not started</AppText>
          </View>
        </View>
        <View style={[styles.routineRow, styles.routineRowLast]}>
          <View style={styles.routineIcon}>
            <AppText variant="body">🌙</AppText>
          </View>
          <View style={styles.routineContent}>
            <AppText variant="label">Evening Wind-down</AppText>
            <AppText variant="caption">4 steps · Not started</AppText>
          </View>
        </View>
      </Card>
    </View>
  );
}

function FocusSnapshot() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Focus" />
      <Card variant="outlined">
        <AppText variant="overline">BUSINESS</AppText>
        <Spacer size="sm" />
        <AppText variant="body" weight="medium">
          No active focus items
        </AppText>
        <AppText variant="caption" style={styles.focusCaption}>
          Set your weekly focus during the Weekly Reset
        </AppText>
      </Card>
    </View>
  );
}

function ActionCTA() {
  return (
    <Card variant="elevated" style={styles.ctaCard}>
      <AppText variant="heading" align="center">
        What should I do now?
      </AppText>
      <Spacer size="sm" />
      <AppText variant="caption" align="center">
        Get a suggestion based on your priorities, energy, and time
      </AppText>
    </Card>
  );
}

export default function TodayScreen() {
  return (
    <ScreenContainer>
      <GreetingHeader />
      <Spacer size="2xl" />
      <PrioritySection />
      <RoutinesSection />
      <FocusSnapshot />
      <Spacer size="lg" />
      <ActionCTA />
      <Spacer size="3xl" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  greetingContainer: {
    paddingHorizontal: 0,
  },
  greetingSubtitle: {
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing['2xl'],
  },
  routineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  routineRowLast: {
    borderBottomWidth: 0,
  },
  routineIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.backgroundElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  routineContent: {
    flex: 1,
  },
  focusCaption: {
    marginTop: spacing.xs,
  },
  ctaCard: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    backgroundColor: colors.accentSoft,
  },
});
