import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padded?: boolean;
}

export function ScreenContainer({
  children,
  scrollable = true,
  padded = true,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.inner,
        padded && styles.padded,
        { paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.xl,
  },
});
