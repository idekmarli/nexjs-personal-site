import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppText, Card, Spacer, LoadingSkeleton } from '@/components/primitives';
import { useRoutineSteps, useRoutineLog, useCompleteRoutineStep } from '@/hooks/use-routines';
import { useAppStore } from '@/stores/app-store';
import { Routine } from '@/domain/types';
import { colors, spacing, radii } from '@/theme';

interface RoutineDetailModalProps {
  routine: Routine | null;
  visible: boolean;
  onClose: () => void;
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function RoutineDetailModal({ routine, visible, onClose }: RoutineDetailModalProps) {
  const today = getToday();
  const energyMode = useAppStore((s) => s.energyMode);
  const { data: steps, isLoading: stepsLoading } = useRoutineSteps(routine?.id ?? '');
  const { data: log } = useRoutineLog(routine?.id ?? '', today);
  const { mutate: completeStep } = useCompleteRoutineStep();

  if (!routine) return null;

  const completedSteps = log?.completed_steps ?? [];
  const skippedSteps = log?.skipped_steps ?? [];

  // Filter steps based on energy mode
  const visibleSteps =
    energyMode === 'low' && routine.has_low_energy_variant
      ? steps?.filter((s) => s.is_low_energy)
      : steps;

  const totalSteps = visibleSteps?.length ?? 0;
  const doneCount = completedSteps.length;

  const handleToggleStep = (stepId: string) => {
    completeStep({
      routineId: routine.id,
      stepId,
      date: today,
      currentCompleted: completedSteps,
      currentSkipped: skippedSteps,
    });
  };

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
              Done
            </AppText>
          </TouchableOpacity>
          <AppText variant="heading">{routine.name}</AppText>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: totalSteps > 0 ? `${(doneCount / totalSteps) * 100}%` : '0%' },
              ]}
            />
          </View>
          <AppText variant="caption" style={styles.progressText}>
            {doneCount}/{totalSteps} steps
          </AppText>
        </View>

        {energyMode === 'low' && routine.has_low_energy_variant && (
          <View style={styles.lowEnergyBanner}>
            <AppText variant="caption" color={colors.info}>
              🌧 Low-energy mode — showing simplified steps
            </AppText>
          </View>
        )}

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {stepsLoading ? (
            <>
              <LoadingSkeleton height={52} />
              <Spacer size="md" />
              <LoadingSkeleton height={52} />
              <Spacer size="md" />
              <LoadingSkeleton height={52} />
            </>
          ) : (
            visibleSteps?.map((step, idx) => {
              const isDone = completedSteps.includes(step.id);

              return (
                <TouchableOpacity
                  key={step.id}
                  style={styles.stepRow}
                  onPress={() => handleToggleStep(step.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.stepCheckbox, isDone && styles.stepCheckboxDone]}>
                    {isDone && (
                      <AppText variant="caption" color={colors.textInverse}>
                        ✓
                      </AppText>
                    )}
                  </View>
                  <View style={styles.stepContent}>
                    <AppText
                      variant="body"
                      weight="medium"
                      style={isDone ? styles.stepTitleDone : undefined}
                    >
                      {step.title}
                    </AppText>
                    {step.duration_minutes && (
                      <AppText variant="caption" color={colors.textTertiary}>
                        {step.duration_minutes} min
                      </AppText>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          <Spacer size="4xl" />
        </ScrollView>
      </View>
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
  progressSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundMuted,
    borderRadius: 3,
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  progressText: {
    textAlign: 'right',
  },
  lowEnergyBanner: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.infoLight,
    borderRadius: radii.sm,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  stepCheckbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  stepCheckboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  stepContent: {
    flex: 1,
  },
  stepTitleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
});
