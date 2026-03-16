import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  AppText,
  PrimaryButton,
  SecondaryButton,
  TextInput,
  Spacer,
} from '@/components/primitives';
import { useCreateTask } from '@/hooks';
import { useCategories } from '@/hooks';
import { Category, TaskPriority } from '@/domain/types';
import { colors, spacing, radii, shadows } from '@/theme';

interface TaskCreateModalProps {
  visible: boolean;
  onClose: () => void;
}

const PRIORITY_OPTIONS: Array<{ value: TaskPriority; label: string }> = [
  { value: 'top', label: 'Top' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low' },
];

export function TaskCreateModal({ visible, onClose }: TaskCreateModalProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { mutate: createTask, isPending } = useCreateTask();
  const { data: categories } = useCategories();

  const handleCreate = () => {
    if (!title.trim()) return;

    createTask(
      {
        title: title.trim(),
        notes: notes.trim() || null,
        priority,
        category_id: categoryId,
        date: new Date().toISOString().split('T')[0],
        due_date: null,
        is_top_priority: priority === 'top',
      },
      {
        onSuccess: () => {
          resetForm();
          onClose();
        },
      },
    );
  };

  const resetForm = () => {
    setTitle('');
    setNotes('');
    setPriority('normal');
    setCategoryId(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.handle} />

        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <AppText variant="label" color={colors.textTertiary}>
              Cancel
            </AppText>
          </TouchableOpacity>
          <AppText variant="heading">New Task</AppText>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <Spacer size="lg" />

          <TextInput
            label="What needs to be done?"
            placeholder="e.g., Review business plan"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <TextInput
            label="Notes (optional)"
            placeholder="Any details or context..."
            value={notes}
            onChangeText={setNotes}
            multiline
            style={styles.notesInput}
          />

          <AppText variant="label" style={styles.sectionLabel}>
            Priority
          </AppText>
          <View style={styles.priorityRow}>
            {PRIORITY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.priorityChip,
                  priority === opt.value && styles.priorityChipActive,
                ]}
                onPress={() => setPriority(opt.value)}
              >
                <AppText
                  variant="caption"
                  weight="medium"
                  color={
                    priority === opt.value ? colors.textInverse : colors.textSecondary
                  }
                >
                  {opt.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <Spacer size="xl" />

          {categories && categories.length > 0 && (
            <>
              <AppText variant="label" style={styles.sectionLabel}>
                Area
              </AppText>
              <View style={styles.categoryRow}>
                {categories.map((cat: Category) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      categoryId === cat.id && styles.categoryChipActive,
                    ]}
                    onPress={() =>
                      setCategoryId(categoryId === cat.id ? null : cat.id)
                    }
                  >
                    <AppText variant="caption">
                      {cat.icon} {cat.name}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <Spacer size="3xl" />

          <PrimaryButton
            title={isPending ? 'Creating...' : 'Create Task'}
            onPress={handleCreate}
            disabled={!title.trim() || isPending}
          />

          <Spacer size="3xl" />
        </ScrollView>
      </KeyboardAvoidingView>
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
  notesInput: {
    minHeight: 80,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    backgroundColor: colors.backgroundSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priorityChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.backgroundSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
});
