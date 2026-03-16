import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { spacing } from '@/theme';

export default function RoutinesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer padded>
      <View style={{ paddingTop: insets.top + spacing['3xl'] }}>
        <AppText variant="overline">STEP 3 OF 4</AppText>
        <Spacer size="md" />
        <AppText variant="title">Set up your routines</AppText>
        <Spacer size="sm" />
        <AppText variant="body">
          Choose which routines to start with. We'll keep them simple.
        </AppText>
        <Spacer size="3xl" />
        <AppText variant="caption" align="center">
          Routine selection will be built in Milestone 4
        </AppText>
        <Spacer size="3xl" />
        <PrimaryButton title="Continue" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}
