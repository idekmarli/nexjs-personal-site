import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  TextInput,
  Spacer,
} from '@/components/primitives';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { colors, spacing, radii } from '@/theme';

export default function PrioritiesScreen() {
  const insets = useSafeAreaInsets();
  const { priorities, addPriority, removePriority } = useOnboardingStore();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && priorities.length < 3) {
      addPriority(trimmed);
      setInput('');
    }
  };

  return (
    <ScreenContainer padded>
      <View style={{ paddingTop: insets.top + spacing['3xl'] }}>
        <AppText variant="overline">STEP 2 OF 4</AppText>
        <Spacer size="md" />
        <AppText variant="title">What are your top priorities?</AppText>
        <Spacer size="sm" />
        <AppText variant="body">
          Name 1–3 things that deserve your best energy this week.
        </AppText>

        <Spacer size="2xl" />

        {priorities.map((p) => (
          <View key={p} style={styles.priorityRow}>
            <View style={styles.priorityBullet} />
            <AppText variant="body" weight="medium" style={styles.priorityText}>
              {p}
            </AppText>
            <TouchableOpacity onPress={() => removePriority(p)}>
              <AppText variant="caption" color={colors.textMuted}>
                Remove
              </AppText>
            </TouchableOpacity>
          </View>
        ))}

        {priorities.length < 3 && (
          <>
            <Spacer size="lg" />
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="e.g., Launch online store"
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={handleAdd}
                  returnKeyType="done"
                />
              </View>
            </View>
          </>
        )}

        <Spacer size="sm" />
        <AppText variant="caption" align="center">
          {priorities.length}/3 priorities
        </AppText>

        <Spacer size="3xl" />

        <PrimaryButton
          title="Continue"
          onPress={() => router.push('/onboarding/routines')}
        />

        <Spacer size="md" />
        <TouchableOpacity onPress={() => router.push('/onboarding/routines')}>
          <AppText variant="label" color={colors.textTertiary} align="center">
            Skip for now
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  priorityBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginRight: spacing.md,
  },
  priorityText: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: 1,
  },
});
