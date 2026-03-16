import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@/components/primitives';
import { Task } from '@/domain/types';
import { useUpdateTask } from '@/hooks';
import { colors, spacing, radii } from '@/theme';

interface TaskItemProps {
  task: Task;
  onPress?: () => void;
}

export function TaskItem({ task, onPress }: TaskItemProps) {
  const { mutate: updateTask } = useUpdateTask();
  const isCompleted = task.status === 'completed';

  const toggleComplete = () => {
    updateTask({
      taskId: task.id,
      input: { status: isCompleted ? 'pending' : 'completed' },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[styles.checkbox, isCompleted && styles.checkboxDone]}
        onPress={toggleComplete}
      >
        {isCompleted && (
          <AppText variant="caption" color={colors.textInverse}>
            ✓
          </AppText>
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <AppText
          variant="body"
          weight="medium"
          style={isCompleted ? styles.titleDone : undefined}
        >
          {task.title}
        </AppText>
        {task.notes && (
          <AppText variant="caption" numberOfLines={1}>
            {task.notes}
          </AppText>
        )}
      </View>

      {task.is_top_priority && (
        <View style={styles.priorityBadge}>
          <AppText variant="caption" color={colors.warning} weight="semibold">
            ★
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  content: {
    flex: 1,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  priorityBadge: {
    marginLeft: spacing.sm,
  },
});
