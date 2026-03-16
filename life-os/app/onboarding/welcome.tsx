import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  Spacer,
} from '@/components/primitives';
import { spacing } from '@/theme';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer scrollable={false} padded>
      <View style={[styles.content, { paddingTop: insets.top + spacing['6xl'] }]}>
        <AppText variant="largeTitle" align="center">
          Welcome to{'\n'}Life OS
        </AppText>
        <Spacer size="xl" />
        <AppText variant="body" align="center" style={styles.body}>
          A calm, intelligent space to run your life — not just your tasks.
          Let's set up the essentials.
        </AppText>

        <View style={styles.footer}>
          <PrimaryButton title="Let's Begin" onPress={() => {}} />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  body: {
    maxWidth: 300,
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
});
