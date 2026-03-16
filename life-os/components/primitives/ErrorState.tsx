import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { SecondaryButton } from './SecondaryButton';
import { Spacer } from './Spacer';
import { colors, spacing, radii } from '@/theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We hit a snag. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading" align="center">
        {title}
      </AppText>
      <Spacer size="sm" />
      <AppText variant="body" align="center" color={colors.textTertiary}>
        {message}
      </AppText>
      {onRetry && (
        <>
          <Spacer size="xl" />
          <SecondaryButton title="Try again" onPress={onRetry} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.errorLight,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
});
