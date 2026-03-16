import React, { useState } from 'react';
import { View, TextInput as RNTextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  Card,
  Spacer,
} from '@/components/primitives';
import { SuggestionReview } from '@/components/capture/SuggestionReview';
import { useCaptures, useCreateCapture } from '@/hooks/use-captures';
import { colors, spacing, radii, typography } from '@/theme';

function CaptureHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + spacing.lg }}>
      <AppText variant="largeTitle">Capture</AppText>
      <AppText variant="body" style={styles.subtitle}>
        Brain dump anything — it'll be processed into clear actions
      </AppText>
    </View>
  );
}

function RecentCaptures() {
  const { data: captures, isLoading } = useCaptures();
  const recentProcessed = captures?.filter((c) => c.status === 'processed').slice(0, 5) ?? [];

  if (isLoading) return null;

  if (recentProcessed.length === 0) {
    return (
      <View style={styles.recentSection}>
        <AppText variant="overline">RECENT CAPTURES</AppText>
        <Spacer size="md" />
        <Card variant="flat">
          <AppText variant="caption" align="center" color={colors.textTertiary}>
            No captures yet — start dumping your thoughts above
          </AppText>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.recentSection}>
      <AppText variant="overline">RECENT CAPTURES</AppText>
      <Spacer size="md" />
      {recentProcessed.map((capture) => (
        <Card key={capture.id} variant="flat" style={styles.recentCard}>
          <AppText variant="caption" numberOfLines={2}>
            {capture.raw_input}
          </AppText>
          <AppText variant="caption" color={colors.textMuted}>
            {new Date(capture.created_at).toLocaleDateString()}
          </AppText>
        </Card>
      ))}
    </View>
  );
}

export default function CaptureScreen() {
  const [text, setText] = useState('');
  const [reviewCaptureId, setReviewCaptureId] = useState<string | null>(null);
  const { mutate: createCapture, isPending } = useCreateCapture();

  const handleProcess = () => {
    if (!text.trim()) return;
    const input = text.trim();

    createCapture(input, {
      onSuccess: (capture) => {
        setText('');
        setReviewCaptureId(capture.id);
      },
    });
  };

  if (reviewCaptureId) {
    return (
      <ScreenContainer>
        <View style={{ paddingTop: useSafeAreaInsets().top + spacing.lg }}>
          <SuggestionReview
            captureId={reviewCaptureId}
            onDone={() => setReviewCaptureId(null)}
          />
        </View>
        <Spacer size="3xl" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <CaptureHeader />
      <Spacer size="2xl" />

      <View style={styles.inputContainer}>
        <RNTextInput
          style={styles.textInput}
          placeholder="What's on your mind? Dump everything here..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
          editable={!isPending}
        />
      </View>

      <Spacer size="lg" />

      {isPending ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Spacer size="sm" />
          <AppText variant="caption">
            Saved! Processing your thoughts...
          </AppText>
        </View>
      ) : (
        <>
          <PrimaryButton
            title="Process Thoughts"
            onPress={handleProcess}
            disabled={text.trim().length === 0}
          />
          <Spacer size="xs" />
          <AppText variant="caption" align="center">
            Your input is saved immediately, even before AI processing
          </AppText>
        </>
      )}

      <Spacer size="3xl" />
      <RecentCaptures />
      <Spacer size="3xl" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
  },
  inputContainer: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 180,
  },
  textInput: {
    padding: spacing.lg,
    fontSize: typography.size.base,
    lineHeight: typography.size.base * typography.lineHeight.relaxed,
    color: colors.textPrimary,
    minHeight: 180,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  recentSection: {
    marginTop: spacing.lg,
  },
  recentCard: {
    marginBottom: spacing.sm,
  },
});
