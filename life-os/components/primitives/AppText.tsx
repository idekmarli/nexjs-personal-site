import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { colors, typography } from '@/theme';

type Variant = 'largeTitle' | 'title' | 'heading' | 'body' | 'caption' | 'label' | 'overline';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  align?: TextStyle['textAlign'];
  weight?: keyof typeof typography.weight;
}

const variantStyles: Record<Variant, TextStyle> = {
  largeTitle: {
    fontSize: typography.size['3xl'],
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.tight,
    lineHeight: typography.size['3xl'] * typography.lineHeight.tight,
    color: colors.textPrimary,
  },
  title: {
    fontSize: typography.size['2xl'],
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.tight,
    lineHeight: typography.size['2xl'] * typography.lineHeight.tight,
    color: colors.textPrimary,
  },
  heading: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.size.lg * typography.lineHeight.normal,
    color: colors.textPrimary,
  },
  body: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.regular,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.size.base * typography.lineHeight.relaxed,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.size.sm * typography.lineHeight.normal,
    color: colors.textTertiary,
  },
  label: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.size.sm * typography.lineHeight.normal,
    color: colors.textSecondary,
  },
  overline: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.wider,
    lineHeight: typography.size.xs * typography.lineHeight.normal,
    color: colors.textTertiary,
    textTransform: 'uppercase',
  },
};

export function AppText({
  variant = 'body',
  color,
  align,
  weight,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        variantStyles[variant],
        color ? { color } : undefined,
        align ? { textAlign: align } : undefined,
        weight ? { fontWeight: typography.weight[weight] } : undefined,
        style,
      ]}
      {...props}
    />
  );
}
