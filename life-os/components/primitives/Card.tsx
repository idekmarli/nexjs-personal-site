import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, radii, shadows } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'elevated' | 'flat' | 'outlined';
}

export function Card({ children, onPress, style, variant = 'elevated' }: CardProps) {
  const cardStyle = [styles.card, variantStyles[variant], style];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const variantStyles: Record<string, ViewStyle> = {
  elevated: {
    backgroundColor: colors.backgroundElevated,
    ...shadows.md,
  },
  flat: {
    backgroundColor: colors.backgroundSubtle,
  },
  outlined: {
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
});
