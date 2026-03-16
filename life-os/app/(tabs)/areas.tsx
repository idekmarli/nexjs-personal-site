import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  Card,
  Spacer,
} from '@/components/primitives';
import { colors, spacing } from '@/theme';

interface AreaCardProps {
  icon: string;
  title: string;
  itemCount: number;
  color: string;
}

function AreaCard({ icon, title, itemCount, color }: AreaCardProps) {
  return (
    <Card variant="elevated" style={styles.areaCard} onPress={() => {}}>
      <View style={[styles.areaIcon, { backgroundColor: color + '15' }]}>
        <AppText variant="heading">{icon}</AppText>
      </View>
      <Spacer size="md" />
      <AppText variant="label" weight="semibold">
        {title}
      </AppText>
      <AppText variant="caption">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </AppText>
    </Card>
  );
}

const AREAS: AreaCardProps[] = [
  { icon: '💼', title: 'Business', itemCount: 0, color: '#5A8EC4' },
  { icon: '💰', title: 'Money', itemCount: 0, color: '#6B9B76' },
  { icon: '🏠', title: 'Home & Life', itemCount: 0, color: '#C4935A' },
  { icon: '💪', title: 'Health', itemCount: 0, color: '#C45A5A' },
  { icon: '❤️', title: 'Relationships', itemCount: 0, color: '#B8977E' },
  { icon: '🌱', title: 'Growth', itemCount: 0, color: '#7B9B6B' },
];

export default function AreasScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer>
      <View style={{ paddingTop: insets.top + spacing.lg }}>
        <AppText variant="largeTitle">Areas</AppText>
        <AppText variant="body" style={styles.subtitle}>
          Your whole life, organized
        </AppText>
      </View>

      <Spacer size="2xl" />

      <View style={styles.grid}>
        {AREAS.map((area) => (
          <AreaCard key={area.title} {...area} />
        ))}
      </View>

      <Spacer size="3xl" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  areaCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  areaIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
