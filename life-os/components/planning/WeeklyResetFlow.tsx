import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput as RNTextInput,
  ActivityIndicator,
} from 'react-native';
import {
  AppText,
  PrimaryButton,
  Card,
  Spacer,
} from '@/components/primitives';
import { weeklyResetRepository } from '@/repositories';
import { aiService } from '@/services';
import { useAuthStore } from '@/stores/auth-store';
import { colors, spacing, radii, typography } from '@/theme';

interface WeeklyResetFlowProps {
  visible: boolean;
  onClose: () => void;
}

type Step = 'open-loops' | 'priorities' | 'business' | 'drop-list' | 'checkin' | 'summary';

const STEPS: Array<{ key: Step; title: string; subtitle: string }> = [
  { key: 'open-loops', title: 'Open Loops', subtitle: 'What's unfinished or nagging at you?' },
  { key: 'priorities', title: 'Weekly Priorities', subtitle: 'What matters most this week?' },
  { key: 'business', title: 'Business Focus', subtitle: 'Where should your business energy go?' },
  { key: 'drop-list', title: 'Drop List', subtitle: 'What are you letting go of this week?' },
  { key: 'checkin', title: 'Emotional Check-in', subtitle: 'How are you actually feeling?' },
  { key: 'summary', title: 'Summary', subtitle: 'Your weekly reset overview' },
];

export function WeeklyResetFlow({ visible, onClose }: WeeklyResetFlowProps) {
  const userId = useAuthStore((s) => s.user?.id);
  const [currentStep, setCurrentStep] = useState(0);
  const [openLoops, setOpenLoops] = useState('');
  const [priorities, setPriorities] = useState('');
  const [businessFocus, setBusinessFocus] = useState('');
  const [dropList, setDropList] = useState('');
  const [emotionalCheckin, setEmotionalCheckin] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const step = STEPS[currentStep];
  const isLastInputStep = currentStep === STEPS.length - 2;
  const isSummaryStep = currentStep === STEPS.length - 1;

  const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff)).toISOString().split('T')[0];
  };

  const handleNext = async () => {
    if (isLastInputStep) {
      // Generate AI summary before showing summary step
      setCurrentStep(currentStep + 1);
      try {
        const result = await aiService.generateWeeklyResetSummary({
          open_loops: openLoops,
          priorities,
          business_focus: businessFocus,
          drop_list: dropList,
          emotional_checkin: emotionalCheckin,
        });
        setAiSummary(
          `${result.summary}\n\nKey themes: ${result.key_themes.join(', ')}\n\nRecommended focus: ${result.recommended_focus.join(', ')}`,
        );
      } catch {
        setAiSummary('Summary generation unavailable. Your reset has been saved.');
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    if (!userId) return;
    setIsSaving(true);

    try {
      await weeklyResetRepository.upsert({
        user_id: userId,
        week_start: getWeekStart(),
        status: 'completed',
        open_loops: openLoops.split('\n').filter(Boolean),
        weekly_priorities: priorities.split('\n').filter(Boolean),
        business_focus: businessFocus || null,
        drop_list: dropList.split('\n').filter(Boolean),
        emotional_checkin: emotionalCheckin || null,
        ai_summary: aiSummary || null,
        completed_at: new Date().toISOString(),
      });
    } catch {
      // Continue even on save failure
    }

    setIsSaving(false);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCurrentStep(0);
    setOpenLoops('');
    setPriorities('');
    setBusinessFocus('');
    setDropList('');
    setEmotionalCheckin('');
    setAiSummary('');
  };

  const getInputValue = () => {
    switch (step.key) {
      case 'open-loops': return openLoops;
      case 'priorities': return priorities;
      case 'business': return businessFocus;
      case 'drop-list': return dropList;
      case 'checkin': return emotionalCheckin;
      default: return '';
    }
  };

  const setInputValue = (text: string) => {
    switch (step.key) {
      case 'open-loops': setOpenLoops(text); break;
      case 'priorities': setPriorities(text); break;
      case 'business': setBusinessFocus(text); break;
      case 'drop-list': setDropList(text); break;
      case 'checkin': setEmotionalCheckin(text); break;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <AppText variant="label" color={colors.textTertiary}>
              Close
            </AppText>
          </TouchableOpacity>
          <AppText variant="caption" color={colors.textTertiary}>
            {currentStep + 1} of {STEPS.length}
          </AppText>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentStep + 1) / STEPS.length) * 100}%` },
            ]}
          />
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <Spacer size="2xl" />
          <AppText variant="title">{step.title}</AppText>
          <Spacer size="sm" />
          <AppText variant="body">{step.subtitle}</AppText>

          <Spacer size="2xl" />

          {isSummaryStep ? (
            <>
              {aiSummary ? (
                <Card variant="elevated">
                  <AppText variant="body">{aiSummary}</AppText>
                </Card>
              ) : (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={colors.accent} />
                  <Spacer size="sm" />
                  <AppText variant="caption">Generating summary...</AppText>
                </View>
              )}

              <Spacer size="3xl" />

              <PrimaryButton
                title={isSaving ? 'Saving...' : 'Complete Weekly Reset'}
                onPress={handleComplete}
                disabled={isSaving}
              />
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <RNTextInput
                  style={styles.textInput}
                  placeholder="Type here... (one item per line)"
                  placeholderTextColor={colors.textMuted}
                  multiline
                  value={getInputValue()}
                  onChangeText={setInputValue}
                  textAlignVertical="top"
                />
              </View>

              <Spacer size="2xl" />

              <PrimaryButton title="Continue" onPress={handleNext} />

              {currentStep > 0 && (
                <>
                  <Spacer size="md" />
                  <TouchableOpacity onPress={() => setCurrentStep(currentStep - 1)}>
                    <AppText variant="label" color={colors.textTertiary} align="center">
                      Back
                    </AppText>
                  </TouchableOpacity>
                </>
              )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['4xl'],
    paddingBottom: spacing.md,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.backgroundMuted,
    marginHorizontal: spacing.xl,
    borderRadius: 2,
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  inputContainer: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 200,
  },
  textInput: {
    padding: spacing.lg,
    fontSize: typography.size.base,
    lineHeight: typography.size.base * typography.lineHeight.relaxed,
    color: colors.textPrimary,
    minHeight: 200,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
  },
});
