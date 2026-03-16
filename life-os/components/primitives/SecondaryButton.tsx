import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radii } from '@/theme';
import { AppText } from './AppText';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function SecondaryButton({ title, onPress, disabled, style }: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <AppText variant="label" color={colors.primary} weight="semibold">
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing['2xl'],
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    borderColor: colors.borderLight,
  },
});
