import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing } from '@/theme';
import { AppText } from './AppText';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, subtitle, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <AppText variant="heading">{title}</AppText>
        {subtitle && (
          <AppText variant="caption" style={styles.subtitle}>
            {subtitle}
          </AppText>
        )}
      </View>
      {action && onAction && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <AppText variant="label" color="#B8977E">
            {action}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  textGroup: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
});
