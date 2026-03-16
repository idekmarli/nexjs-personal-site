import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  Card,
  Spacer,
  LoadingSkeleton,
} from '@/components/primitives';
import { AreaDetailModal } from '@/components/areas/AreaDetailModal';
import { useCategories, useCategoryCounts } from '@/hooks';
import { Category } from '@/domain/types';
import { colors, spacing, shadows } from '@/theme';

// Fallback data when categories haven't been loaded from server yet
const FALLBACK_AREAS = [
  { icon: '💼', name: 'Business', color: '#5A8EC4' },
  { icon: '💰', name: 'Money', color: '#6B9B76' },
  { icon: '🏠', name: 'Home & Life', color: '#C4935A' },
  { icon: '💪', name: 'Health', color: '#C45A5A' },
  { icon: '❤️', name: 'Relationships', color: '#B8977E' },
  { icon: '🌱', name: 'Growth', color: '#7B9B6B' },
];

function AreaCard({
  category,
  itemCount,
  onPress,
}: {
  category: Category;
  itemCount: number;
  onPress: () => void;
}) {
  return (
    <Card variant="elevated" style={styles.areaCard} onPress={onPress}>
      <View style={[styles.areaIcon, { backgroundColor: category.color + '15' }]}>
        <AppText variant="heading">{category.icon}</AppText>
      </View>
      <Spacer size="md" />
      <AppText variant="label" weight="semibold">
        {category.name}
      </AppText>
      <AppText variant="caption">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </AppText>
    </Card>
  );
}

export default function AreasScreen() {
  const insets = useSafeAreaInsets();
  const { data: categories, isLoading } = useCategories();
  const { data: counts } = useCategoryCounts();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <>
      <ScreenContainer>
        <View style={{ paddingTop: insets.top + spacing.lg }}>
          <AppText variant="largeTitle">Areas</AppText>
          <AppText variant="body" style={styles.subtitle}>
            Your whole life, organized
          </AppText>
        </View>

        <Spacer size="2xl" />

        {isLoading ? (
          <View style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={styles.areaCard}>
                <LoadingSkeleton height={120} />
              </View>
            ))}
          </View>
        ) : categories && categories.length > 0 ? (
          <View style={styles.grid}>
            {categories.map((cat) => (
              <AreaCard
                key={cat.id}
                category={cat}
                itemCount={counts?.[cat.id] ?? 0}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </View>
        ) : (
          // Show fallback static cards when no categories exist yet
          <View style={styles.grid}>
            {FALLBACK_AREAS.map((area) => (
              <Card key={area.name} variant="elevated" style={styles.areaCard}>
                <View style={[styles.areaIcon, { backgroundColor: area.color + '15' }]}>
                  <AppText variant="heading">{area.icon}</AppText>
                </View>
                <Spacer size="md" />
                <AppText variant="label" weight="semibold">
                  {area.name}
                </AppText>
                <AppText variant="caption">0 items</AppText>
              </Card>
            ))}
          </View>
        )}

        <Spacer size="3xl" />
      </ScreenContainer>

      <AreaDetailModal
        category={selectedCategory}
        visible={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </>
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
