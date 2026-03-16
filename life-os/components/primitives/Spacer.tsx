import React from 'react';
import { View } from 'react-native';
import { spacing } from '@/theme';

type SpacerSize = keyof typeof spacing;

interface SpacerProps {
  size?: SpacerSize;
  horizontal?: boolean;
}

export function Spacer({ size = 'lg', horizontal = false }: SpacerProps) {
  return (
    <View
      style={
        horizontal
          ? { width: spacing[size] }
          : { height: spacing[size] }
      }
    />
  );
}
