import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/theme';
import { AppText } from './AppText';
import { SecondaryButton } from './SecondaryButton';

interface EmptyStateCardProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}

export function EmptyStateCard({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateCardProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading" align="center">
        {title}
      </AppText>
      <AppText variant="body" align="center" style={styles.description}>
        {description}
      </AppText>
      {actionLabel && onAction && (
        <SecondaryButton title={actionLabel} onPress={onAction} style={styles.action} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSubtle,
    borderRadius: radii.lg,
    padding: spacing['3xl'],
    alignItems: 'center',
  },
  description: {
    marginTop: spacing.sm,
    maxWidth: 260,
  },
  action: {
    marginTop: spacing.xl,
  },
});
