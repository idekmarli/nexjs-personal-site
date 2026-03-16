import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { spacing } from '@/theme';

export default function FocusSetupScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer padded>
      <View style={{ paddingTop: insets.top + spacing['3xl'] }}>
        <AppText variant="overline">STEP 1 OF 4</AppText>
        <Spacer size="md" />
        <AppText variant="title">What areas matter most right now?</AppText>
        <Spacer size="sm" />
        <AppText variant="body">
          Pick 2–3 areas to focus on. You can always adjust later.
        </AppText>
        <Spacer size="3xl" />
        <AppText variant="caption" align="center">
          Focus area selection will be built in Milestone 4
        </AppText>
        <Spacer size="3xl" />
        <PrimaryButton title="Continue" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}
