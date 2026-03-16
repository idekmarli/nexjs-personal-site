import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
import { TaskItem } from '@/components/tasks/TaskItem';
import { TaskCreateModal } from '@/components/tasks/TaskCreateModal';
import { useTopPriorities, useTasksByDate } from '@/hooks';
import { colors, spacing } from '@/theme';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function GreetingHeader() {
  const insets = useSafeAreaInsets();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <View style={{ paddingTop: insets.top + spacing.lg }}>
      <AppText variant="largeTitle">{greeting}</AppText>
      <AppText variant="body" style={styles.greetingSubtitle}>
        Here's your day at a glance
      </AppText>
    </View>
  );
}

function PrioritySection({ onAddTask }: { onAddTask: () => void }) {
  const { data: priorities, isLoading } = useTopPriorities();

  if (isLoading) {
    return (
      <View style={styles.section}>
        <SectionHeader title="Top Priorities" />
        <LoadingSkeleton height={60} />
        <Spacer size="sm" />
        <LoadingSkeleton height={60} />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <SectionHeader title="Top Priorities" action="Add" onAction={onAddTask} />
      {!priorities || priorities.length === 0 ? (
        <EmptyStateCard
          title="No priorities yet"
          description="Add your most important tasks for today"
          actionLabel="Add Priority"
          onAction={onAddTask}
        />
      ) : (
        <Card variant="elevated">
          {priorities.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Card>
      )}
    </View>
  );
}

function TodayTasksSection({ onAddTask }: { onAddTask: () => void }) {
  const today = getToday();
  const { data: tasks, isLoading } = useTasksByDate(today);

  const pending = tasks?.filter((t) => t.status !== 'completed' && !t.is_top_priority) ?? [];
  const completed = tasks?.filter((t) => t.status === 'completed') ?? [];

  if (isLoading) {
    return (
      <View style={styles.section}>
        <SectionHeader title="Today" />
        <LoadingSkeleton height={48} />
        <Spacer size="sm" />
        <LoadingSkeleton height={48} />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Today"
        subtitle={`${completed.length}/${(pending.length + completed.length)} done`}
        action="Add"
        onAction={onAddTask}
      />
      {pending.length === 0 && completed.length === 0 ? (
        <Card variant="flat">
          <AppText variant="body" color={colors.textTertiary} align="center">
            No tasks for today
          </AppText>
        </Card>
      ) : (
        <Card variant="elevated">
          {pending.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          {completed.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Card>
      )}
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
            <AppText variant="caption">Not started</AppText>
          </View>
        </View>
        <View style={[styles.routineRow, styles.routineRowLast]}>
          <View style={styles.routineIcon}>
            <AppText variant="body">🌙</AppText>
          </View>
          <View style={styles.routineContent}>
            <AppText variant="label">Evening Wind-down</AppText>
            <AppText variant="caption">Not started</AppText>
          </View>
        </View>
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
  const [showCreateTask, setShowCreateTask] = useState(false);

  return (
    <>
      <ScreenContainer>
        <GreetingHeader />
        <Spacer size="2xl" />
        <PrioritySection onAddTask={() => setShowCreateTask(true)} />
        <TodayTasksSection onAddTask={() => setShowCreateTask(true)} />
        <RoutinesSection />
        <Spacer size="lg" />
        <ActionCTA />
        <Spacer size="3xl" />
      </ScreenContainer>

      <TaskCreateModal
        visible={showCreateTask}
        onClose={() => setShowCreateTask(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
  ctaCard: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    backgroundColor: colors.accentSoft,
  },
});
