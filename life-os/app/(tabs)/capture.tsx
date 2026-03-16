import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  Card,
  Spacer,
} from '@/components/primitives';
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

export default function CaptureScreen() {
  const [text, setText] = useState('');

  return (
    <ScreenContainer>
      <CaptureHeader />
      <Spacer size="2xl" />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind? Dump everything here..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />
      </View>

      <Spacer size="lg" />

      <PrimaryButton
        title="Process Thoughts"
        onPress={() => {}}
        disabled={text.trim().length === 0}
      />

      <Spacer size="xs" />
      <AppText variant="caption" align="center">
        Your input is saved immediately, even before AI processing
      </AppText>

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
  recentSection: {
    marginTop: spacing.lg,
  },
});
