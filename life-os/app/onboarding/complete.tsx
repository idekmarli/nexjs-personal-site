import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { colors, spacing } from '@/theme';

export default function CompleteScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer scrollable={false} padded>
      <View style={[styles.content, { paddingTop: insets.top + spacing['6xl'] }]}>
        <View style={styles.checkCircle}>
          <AppText variant="title" color={colors.success}>
            ✓
          </AppText>
        </View>
        <Spacer size="2xl" />
        <AppText variant="largeTitle" align="center">
          You're all set
        </AppText>
        <Spacer size="md" />
        <AppText variant="body" align="center" style={styles.body}>
          Your Life OS is ready. Start with what matters most today.
        </AppText>

        <View style={styles.footer}>
          <PrimaryButton title="Open Life OS" onPress={() => {}} />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    maxWidth: 280,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
});
