import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  Card,
  Spacer,
} from '@/components/primitives';
import { colors, spacing, radii } from '@/theme';

const PROMPT_CHIPS = [
  'What should I focus on today?',
  'Help me plan my week',
  'I feel overwhelmed',
  'Review my priorities',
];

function PromptChip({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.chip} activeOpacity={0.7}>
      <AppText variant="caption" weight="medium" color={colors.accent}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
}

export default function AssistantScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer>
      <View style={{ paddingTop: insets.top + spacing.lg }}>
        <AppText variant="largeTitle">Assistant</AppText>
        <AppText variant="body" style={styles.subtitle}>
          Your calm, capable chief of staff
        </AppText>
      </View>

      <Spacer size="4xl" />

      <View style={styles.centeredContent}>
        <View style={styles.avatarCircle}>
          <AppText variant="title">✦</AppText>
        </View>
        <Spacer size="xl" />
        <AppText variant="heading" align="center">
          How can I help?
        </AppText>
        <AppText variant="body" align="center" style={styles.helperText}>
          I know your priorities, routines, and context. Ask me anything about
          your day, week, or life.
        </AppText>
      </View>

      <Spacer size="3xl" />

      <AppText variant="overline" style={styles.chipsLabel}>
        SUGGESTED
      </AppText>
      <Spacer size="md" />
      <View style={styles.chipsContainer}>
        {PROMPT_CHIPS.map((chip) => (
          <PromptChip key={chip} label={chip} />
        ))}
      </View>

      <Spacer size="3xl" />

      <Card variant="flat" style={styles.infoCard}>
        <AppText variant="caption" align="center">
          Your assistant uses structured AI with validated responses — no
          hallucinated advice, no generic motivation.
        </AppText>
      </Card>

      <Spacer size="3xl" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
  },
  centeredContent: {
    alignItems: 'center',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  chipsLabel: {
    paddingHorizontal: spacing.xs,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.accentSoft,
    borderRadius: radii.full,
  },
  infoCard: {
    paddingVertical: spacing.xl,
  },
});
