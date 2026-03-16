import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, AppText, PrimaryButton, Spacer } from '@/components/primitives';
import { spacing } from '@/theme';

export default function PrioritiesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer padded>
      <View style={{ paddingTop: insets.top + spacing['3xl'] }}>
        <AppText variant="overline">STEP 2 OF 4</AppText>
        <Spacer size="md" />
        <AppText variant="title">What are your top priorities?</AppText>
        <Spacer size="sm" />
        <AppText variant="body">
          Name 1–3 things that deserve your best energy this week.
        </AppText>
        <Spacer size="3xl" />
        <AppText variant="caption" align="center">
          Priority input will be built in Milestone 4
        </AppText>
        <Spacer size="3xl" />
        <PrimaryButton title="Continue" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}
