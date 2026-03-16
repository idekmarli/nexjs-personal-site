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
  TextInput,
  Card,
  Spacer,
} from '@/components/primitives';
import { decisionRepository } from '@/repositories/decision-repository';
import { aiService } from '@/services';
import { useAuthStore } from '@/stores/auth-store';
import { useCreateTask } from '@/hooks';
import { DecisionAIResponse } from '@/domain/types';
import { colors, spacing, radii } from '@/theme';

interface DecisionDeskModalProps {
  visible: boolean;
  onClose: () => void;
}

export function DecisionDeskModal({ visible, onClose }: DecisionDeskModalProps) {
  const userId = useAuthStore((s) => s.user?.id);
  const { mutate: createTask } = useCreateTask();
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DecisionAIResponse | null>(null);

  const handleSubmit = async () => {
    if (!question.trim() || !userId) return;
    setIsProcessing(true);

    try {
      const decision = await decisionRepository.create(
        userId,
        question.trim(),
        context.trim() || null,
      );

      const aiResult = await aiService.getDecisionSupport(
        question.trim(),
        context.trim() || null,
      );

      await decisionRepository.saveAIResponse(decision.id, aiResult);
      setResult(aiResult);
    } catch {
      setResult({
        clarified_decision: question,
        criteria: ['Unable to generate AI analysis at this time'],
        recommendation: 'Consider writing out pros and cons manually',
        next_step: 'Take 10 minutes to reflect on what matters most',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvertToTask = (text: string) => {
    createTask({
      title: text,
      notes: `From decision: ${question}`,
      priority: 'normal',
      category_id: null,
      date: new Date().toISOString().split('T')[0],
      due_date: null,
      is_top_priority: false,
    });
  };

  const handleReset = () => {
    setQuestion('');
    setContext('');
    setResult(null);
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
          <AppText variant="heading">Decision Desk</AppText>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {!result ? (
            <>
              <AppText variant="body">
                Describe the decision you're facing. Be specific.
              </AppText>

              <Spacer size="xl" />

              <TextInput
                label="What decision are you making?"
                placeholder="e.g., Should I launch the product now or wait?"
                value={question}
                onChangeText={setQuestion}
                multiline
                style={styles.inputLarge}
              />

              <TextInput
                label="Any context? (optional)"
                placeholder="Relevant details, constraints, timeline..."
                value={context}
                onChangeText={setContext}
                multiline
                style={styles.inputMedium}
              />

              <Spacer size="lg" />

              {isProcessing ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={colors.accent} />
                  <Spacer size="sm" />
                  <AppText variant="caption">Analyzing your decision...</AppText>
                </View>
              ) : (
                <PrimaryButton
                  title="Get Decision Support"
                  onPress={handleSubmit}
                  disabled={!question.trim()}
                />
              )}
            </>
          ) : (
            <>
              <Card variant="elevated">
                <AppText variant="overline">CLARIFIED DECISION</AppText>
                <Spacer size="sm" />
                <AppText variant="body" weight="medium">
                  {result.clarified_decision}
                </AppText>
              </Card>

              <Spacer size="lg" />

              <Card variant="flat">
                <AppText variant="overline">KEY CRITERIA</AppText>
                <Spacer size="sm" />
                {result.criteria.map((c, idx) => (
                  <View key={idx} style={styles.criteriaRow}>
                    <View style={styles.criteriaDot} />
                    <AppText variant="body">{c}</AppText>
                  </View>
                ))}
              </Card>

              <Spacer size="lg" />

              <Card variant="elevated" style={styles.recommendationCard}>
                <AppText variant="overline">RECOMMENDATION</AppText>
                <Spacer size="sm" />
                <AppText variant="body" weight="medium">
                  {result.recommendation}
                </AppText>
              </Card>

              <Spacer size="lg" />

              <Card variant="outlined">
                <AppText variant="overline">NEXT STEP</AppText>
                <Spacer size="sm" />
                <AppText variant="body">{result.next_step}</AppText>
                <Spacer size="md" />
                <TouchableOpacity
                  style={styles.convertButton}
                  onPress={() => handleConvertToTask(result.next_step)}
                >
                  <AppText variant="label" color={colors.accent}>
                    Convert to task →
                  </AppText>
                </TouchableOpacity>
              </Card>

              <Spacer size="2xl" />

              <TouchableOpacity onPress={handleReset}>
                <AppText variant="label" color={colors.textTertiary} align="center">
                  Ask another question
                </AppText>
              </TouchableOpacity>
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
  inputLarge: {
    minHeight: 80,
  },
  inputMedium: {
    minHeight: 60,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  criteriaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing.md,
    marginTop: 7,
  },
  recommendationCard: {
    backgroundColor: colors.accentSoft,
  },
  convertButton: {
    alignSelf: 'flex-start',
  },
});
