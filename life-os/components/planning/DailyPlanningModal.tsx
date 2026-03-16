import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  AppText,
  PrimaryButton,
  SecondaryButton,
  Card,
  Spacer,
} from '@/components/primitives';
import { useAppStore } from '@/stores/app-store';
import { useTasks } from '@/hooks';
import { aiService } from '@/services';
import { EnergyMode, Task } from '@/domain/types';
import { colors, spacing, radii } from '@/theme';

interface DailyPlanningModalProps {
  visible: boolean;
  onClose: () => void;
}

interface PlanItem {
  title: string;
  time_block: string | null;
  task_id: string | null;
  is_completed: boolean;
}

const ENERGY_MODES: Array<{ value: EnergyMode; label: string; icon: string }> = [
  { value: 'low', label: 'Low', icon: '🌧' },
  { value: 'normal', label: 'Normal', icon: '☀️' },
  { value: 'high', label: 'High', icon: '⚡' },
];

export function DailyPlanningModal({ visible, onClose }: DailyPlanningModalProps) {
  const { energyMode, setEnergyMode } = useAppStore();
  const { data: tasks } = useTasks();
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');

  const pendingTasks = tasks?.filter((t) => t.status !== 'completed' && t.status !== 'dropped') ?? [];

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    try {
      const result = await aiService.generateDailyPlan(
        pendingTasks.map((t) => ({
          id: t.id,
          title: t.title,
          priority: t.priority,
        })),
        energyMode,
      );
      setPlanItems(
        result.items.map((item) => ({
          ...item,
          is_completed: false,
        })),
      );
      setSummary(result.summary);
    } catch {
      // Fallback: create plan from top priorities
      const fallbackItems = pendingTasks
        .filter((t) => t.is_top_priority)
        .slice(0, 5)
        .map((t) => ({
          title: t.title,
          time_block: null,
          task_id: t.id,
          is_completed: false,
        }));
      setPlanItems(fallbackItems);
      setSummary('Based on your top priorities (AI unavailable)');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleItem = (index: number) => {
    setPlanItems((items) =>
      items.map((item, i) =>
        i === index ? { ...item, is_completed: !item.is_completed } : item,
      ),
    );
  };

  const removeItem = (index: number) => {
    setPlanItems((items) => items.filter((_, i) => i !== index));
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
              Close
            </AppText>
          </TouchableOpacity>
          <AppText variant="heading">Daily Plan</AppText>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <AppText variant="overline">ENERGY LEVEL</AppText>
          <Spacer size="sm" />
          <View style={styles.energyRow}>
            {ENERGY_MODES.map((mode) => (
              <TouchableOpacity
                key={mode.value}
                style={[
                  styles.energyChip,
                  energyMode === mode.value && styles.energyChipActive,
                ]}
                onPress={() => setEnergyMode(mode.value)}
              >
                <AppText variant="body">{mode.icon}</AppText>
                <AppText
                  variant="caption"
                  weight="medium"
                  color={
                    energyMode === mode.value
                      ? colors.textInverse
                      : colors.textSecondary
                  }
                  style={styles.energyLabel}
                >
                  {mode.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <Spacer size="2xl" />

          {planItems.length === 0 ? (
            <>
              <Card variant="flat" style={styles.emptyCard}>
                <AppText variant="body" align="center" color={colors.textTertiary}>
                  {pendingTasks.length} tasks available
                </AppText>
                <Spacer size="sm" />
                <AppText variant="caption" align="center">
                  Generate a plan based on your energy and priorities
                </AppText>
              </Card>

              <Spacer size="xl" />

              {isGenerating ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={colors.accent} />
                  <Spacer size="sm" />
                  <AppText variant="caption">Building your plan...</AppText>
                </View>
              ) : (
                <>
                  <PrimaryButton
                    title="Generate with AI"
                    onPress={handleGenerateWithAI}
                    disabled={pendingTasks.length === 0}
                  />
                  <Spacer size="md" />
                  <SecondaryButton
                    title="Plan Manually"
                    onPress={() => {
                      setPlanItems(
                        pendingTasks.slice(0, 5).map((t) => ({
                          title: t.title,
                          time_block: null,
                          task_id: t.id,
                          is_completed: false,
                        })),
                      );
                    }}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {summary ? (
                <>
                  <Card variant="flat">
                    <AppText variant="caption" color={colors.accent}>
                      {summary}
                    </AppText>
                  </Card>
                  <Spacer size="lg" />
                </>
              ) : null}

              <AppText variant="overline">YOUR PLAN</AppText>
              <Spacer size="md" />

              {planItems.map((item, idx) => (
                <View key={idx} style={styles.planItem}>
                  <TouchableOpacity
                    style={[
                      styles.planCheckbox,
                      item.is_completed && styles.planCheckboxDone,
                    ]}
                    onPress={() => toggleItem(idx)}
                  >
                    {item.is_completed && (
                      <AppText variant="caption" color={colors.textInverse}>
                        ✓
                      </AppText>
                    )}
                  </TouchableOpacity>
                  <View style={styles.planItemContent}>
                    <AppText
                      variant="body"
                      weight="medium"
                      style={item.is_completed ? styles.planItemDone : undefined}
                    >
                      {item.title}
                    </AppText>
                    {item.time_block && (
                      <AppText variant="caption" color={colors.textTertiary}>
                        {item.time_block}
                      </AppText>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => removeItem(idx)}>
                    <AppText variant="caption" color={colors.textMuted}>
                      ✕
                    </AppText>
                  </TouchableOpacity>
                </View>
              ))}

              <Spacer size="2xl" />

              <SecondaryButton
                title="Regenerate"
                onPress={() => {
                  setPlanItems([]);
                  setSummary('');
                }}
              />
            </>
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
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  energyRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  energyChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.backgroundSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  energyChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  energyLabel: {
    marginLeft: spacing.xs,
  },
  emptyCard: {
    paddingVertical: spacing['2xl'],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  planCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  planCheckboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  planItemContent: {
    flex: 1,
  },
  planItemDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
});
