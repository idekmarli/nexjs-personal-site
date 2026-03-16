import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, Spacer } from '@/components/primitives';
import { spacing } from '@/theme';

export default function ModalScreen() {
  return (
    <ScreenContainer padded>
      <View style={styles.handle} />
      <Spacer size="xl" />
      <AppText variant="title" align="center">
        Modal
      </AppText>
      <Spacer size="md" />
      <AppText variant="body" align="center">
        This modal will be used for task detail, daily planning, decision desk, and other focused flows.
      </AppText>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D1D1D6',
    alignSelf: 'center',
    marginTop: spacing.md,
  },
});
