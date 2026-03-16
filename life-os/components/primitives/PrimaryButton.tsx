import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radii, shadows } from '@/theme';
import { AppText } from './AppText';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function PrimaryButton({ title, onPress, disabled, style }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <AppText variant="label" color={colors.textInverse} weight="semibold">
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing['2xl'],
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  disabled: {
    backgroundColor: colors.textMuted,
  },
});
