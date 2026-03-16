import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppText, Card, Spacer } from '@/components/primitives';
import { useCaptureSuggestions, useAcceptSuggestion, useRejectSuggestion } from '@/hooks/use-captures';
import { useCreateTask } from '@/hooks';
import { CaptureSuggestion } from '@/domain/types';
import { colors, spacing, radii } from '@/theme';

interface SuggestionReviewProps {
  captureId: string;
  onDone: () => void;
}

function SuggestionCard({ suggestion }: { suggestion: CaptureSuggestion }) {
  const { mutate: accept } = useAcceptSuggestion();
  const { mutate: reject } = useRejectSuggestion();
  const { mutate: createTask } = useCreateTask();

  const handleAccept = () => {
    accept(suggestion.id);
    createTask({
      title: suggestion.suggested_title,
      notes: suggestion.suggested_notes,
      priority: suggestion.suggested_priority,
      category_id: null,
      date: new Date().toISOString().split('T')[0],
      due_date: null,
      is_top_priority: suggestion.suggested_priority === 'top',
    });
  };

  const handleReject = () => {
    reject(suggestion.id);
  };

  if (suggestion.is_accepted !== null) {
    return (
      <Card variant="flat" style={styles.resolvedCard}>
        <AppText
          variant="caption"
          color={suggestion.is_accepted ? colors.success : colors.textMuted}
        >
          {suggestion.is_accepted ? '✓ Added as task' : '✕ Dismissed'}
        </AppText>
        <AppText variant="body" style={styles.resolvedTitle}>
          {suggestion.suggested_title}
        </AppText>
      </Card>
    );
  }

  return (
    <Card variant="elevated" style={styles.suggestionCard}>
      <View style={styles.priorityTag}>
        <AppText variant="caption" weight="semibold" color={colors.accent}>
          {suggestion.suggested_priority.toUpperCase()}
        </AppText>
      </View>

      <AppText variant="body" weight="medium">
        {suggestion.suggested_title}
      </AppText>

      {suggestion.suggested_notes && (
        <AppText variant="caption" style={styles.notes}>
          {suggestion.suggested_notes}
        </AppText>
      )}

      {suggestion.suggested_category_slug && (
        <AppText variant="caption" color={colors.textTertiary} style={styles.category}>
          Area: {suggestion.suggested_category_slug}
        </AppText>
      )}

      <Spacer size="md" />

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <AppText variant="label" color={colors.textInverse}>
            Accept
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <AppText variant="label" color={colors.textTertiary}>
            Dismiss
          </AppText>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export function SuggestionReview({ captureId, onDone }: SuggestionReviewProps) {
  const { data: suggestions, isLoading } = useCaptureSuggestions(captureId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
        <Spacer size="md" />
        <AppText variant="caption">Processing your thoughts...</AppText>
      </View>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <Card variant="flat">
        <AppText variant="body" align="center" color={colors.textTertiary}>
          No suggestions generated
        </AppText>
      </Card>
    );
  }

  const allResolved = suggestions.every((s) => s.is_accepted !== null);

  return (
    <View>
      <AppText variant="heading">Review Suggestions</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        {suggestions.length} {suggestions.length === 1 ? 'item' : 'items'} extracted
      </AppText>

      <Spacer size="lg" />

      {suggestions.map((suggestion) => (
        <React.Fragment key={suggestion.id}>
          <SuggestionCard suggestion={suggestion} />
          <Spacer size="md" />
        </React.Fragment>
      ))}

      {allResolved && (
        <>
          <Spacer size="lg" />
          <TouchableOpacity style={styles.doneButton} onPress={onDone}>
            <AppText variant="label" color={colors.accent} align="center">
              Done reviewing
            </AppText>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  suggestionCard: {
    position: 'relative',
  },
  priorityTag: {
    marginBottom: spacing.sm,
  },
  notes: {
    marginTop: spacing.xs,
  },
  category: {
    marginTop: spacing.xs,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: colors.backgroundSubtle,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  resolvedCard: {
    opacity: 0.6,
  },
  resolvedTitle: {
    marginTop: spacing.xs,
  },
  doneButton: {
    paddingVertical: spacing.md,
  },
});
