import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppText, Spacer } from '@/components/primitives';
import { colors } from '@/theme';

export function BootstrapScreen() {
  return (
    <View style={styles.container}>
      <AppText variant="title" color={colors.primary}>
        Life OS
      </AppText>
      <Spacer size="2xl" />
      <ActivityIndicator size="small" color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
