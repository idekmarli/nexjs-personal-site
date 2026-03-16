import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AppText,
  Card,
  SectionHeader,
  EmptyStateCard,
  TextInput,
  PrimaryButton,
  Spacer,
} from '@/components/primitives';
import { businessRepository } from '@/repositories/business-repository';
import { queryKeys } from '@/lib/query-keys';
import { useAuthStore } from '@/stores/auth-store';
import { colors, spacing, radii } from '@/theme';

export function BusinessFocusSection() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [area, setArea] = useState<'reselling' | 'digital_products' | 'general'>('general');

  const { data: items } = useQuery({
    queryKey: queryKeys.business.all(userId ?? ''),
    queryFn: () => businessRepository.getFocusItems(userId!),
    enabled: !!userId,
  });

  const { mutate: create } = useMutation({
    mutationFn: () =>
      businessRepository.createFocusItem(userId!, { title, area, notes: null }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business'] });
      setTitle('');
      setShowAdd(false);
    },
  });

  return (
    <View>
      <SectionHeader
        title="Business Focus"
        action="Add"
        onAction={() => setShowAdd(!showAdd)}
      />

      {showAdd && (
        <Card variant="outlined" style={styles.addCard}>
          <TextInput
            placeholder="What's your focus?"
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.areaRow}>
            {(['general', 'reselling', 'digital_products'] as const).map((a) => (
              <TouchableOpacity
                key={a}
                style={[styles.areaChip, area === a && styles.areaChipActive]}
                onPress={() => setArea(a)}
              >
                <AppText
                  variant="caption"
                  color={area === a ? colors.textInverse : colors.textSecondary}
                >
                  {a === 'digital_products' ? 'Digital' : a.charAt(0).toUpperCase() + a.slice(1)}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
          <PrimaryButton
            title="Add Focus Item"
            onPress={() => create()}
            disabled={!title.trim()}
          />
        </Card>
      )}

      {!items || items.length === 0 ? (
        <EmptyStateCard
          title="No business focus"
          description="Add items to track your key business priorities"
        />
      ) : (
        <Card variant="elevated">
          {items.map((item) => (
            <View key={item.id} style={styles.focusItem}>
              <View style={styles.areaDot} />
              <View style={styles.focusContent}>
                <AppText variant="body" weight="medium">
                  {item.title}
                </AppText>
                <AppText variant="caption" color={colors.textTertiary}>
                  {item.area === 'digital_products' ? 'Digital Products' : item.area}
                </AppText>
              </View>
            </View>
          ))}
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addCard: {
    marginBottom: spacing.lg,
  },
  areaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  areaChip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    backgroundColor: colors.backgroundSubtle,
  },
  areaChipActive: {
    backgroundColor: colors.primary,
  },
  focusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  areaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginRight: spacing.md,
  },
  focusContent: {
    flex: 1,
  },
});
