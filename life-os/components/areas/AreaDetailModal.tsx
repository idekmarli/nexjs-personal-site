import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import {
  AppText,
  Card,
  SectionHeader,
  EmptyStateCard,
  Spacer,
  LoadingSkeleton,
} from '@/components/primitives';
import { TaskItem } from '@/components/tasks/TaskItem';
import { TaskCreateModal } from '@/components/tasks/TaskCreateModal';
import { useTasksByCategory } from '@/hooks';
import { Category } from '@/domain/types';
import { colors, spacing } from '@/theme';

interface AreaDetailModalProps {
  category: Category | null;
  visible: boolean;
  onClose: () => void;
}

export function AreaDetailModal({ category, visible, onClose }: AreaDetailModalProps) {
  const { data: tasks, isLoading } = useTasksByCategory(category?.id ?? '');
  const [showCreateTask, setShowCreateTask] = useState(false);

  if (!category) return null;

  const pending = tasks?.filter((t) => t.status !== 'completed' && t.status !== 'dropped') ?? [];
  const completed = tasks?.filter((t) => t.status === 'completed') ?? [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <AppText variant="label" color={colors.textTertiary}>
              Back
            </AppText>
          </TouchableOpacity>
          <AppText variant="heading">
            {category.icon} {category.name}
          </AppText>
          <TouchableOpacity onPress={() => setShowCreateTask(true)}>
            <AppText variant="label" color={colors.accent}>
              Add
            </AppText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <>
              <LoadingSkeleton height={48} />
              <Spacer size="md" />
              <LoadingSkeleton height={48} />
            </>
          ) : pending.length === 0 && completed.length === 0 ? (
            <EmptyStateCard
              title={`No items in ${category.name}`}
              description="Add tasks to this area to keep track of them"
              actionLabel="Add Task"
              onAction={() => setShowCreateTask(true)}
            />
          ) : (
            <>
              {pending.length > 0 && (
                <>
                  <SectionHeader
                    title="Active"
                    subtitle={`${pending.length} items`}
                  />
                  <Card variant="elevated">
                    {pending.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </Card>
                  <Spacer size="2xl" />
                </>
              )}

              {completed.length > 0 && (
                <>
                  <SectionHeader
                    title="Completed"
                    subtitle={`${completed.length} items`}
                  />
                  <Card variant="flat">
                    {completed.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </Card>
                </>
              )}
            </>
          )}

          <Spacer size="4xl" />
        </ScrollView>
      </View>

      <TaskCreateModal
        visible={showCreateTask}
        onClose={() => setShowCreateTask(false)}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D1D1D6',
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
});
