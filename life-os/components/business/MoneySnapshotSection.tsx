import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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

export function MoneySnapshotSection() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [label, setLabel] = useState('');
  const [target, setTarget] = useState('');

  const { data: snapshots } = useQuery({
    queryKey: queryKeys.money.all(userId ?? ''),
    queryFn: () => businessRepository.getMoneySnapshots(userId!),
    enabled: !!userId,
  });

  const { mutate: create } = useMutation({
    mutationFn: () =>
      businessRepository.createMoneySnapshot(userId!, {
        target_label: label,
        target_amount: target ? parseFloat(target) : null,
        current_amount: null,
        notes: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['money'] });
      setLabel('');
      setTarget('');
      setShowAdd(false);
    },
  });

  return (
    <View>
      <SectionHeader
        title="Money Snapshot"
        action="Add"
        onAction={() => setShowAdd(!showAdd)}
      />

      {showAdd && (
        <Card variant="outlined" style={styles.addCard}>
          <TextInput
            placeholder="e.g., Emergency Fund"
            value={label}
            onChangeText={setLabel}
            label="Target name"
          />
          <TextInput
            placeholder="e.g., 5000"
            value={target}
            onChangeText={setTarget}
            label="Target amount (optional)"
            keyboardType="numeric"
          />
          <PrimaryButton
            title="Add Target"
            onPress={() => create()}
            disabled={!label.trim()}
          />
        </Card>
      )}

      {!snapshots || snapshots.length === 0 ? (
        <EmptyStateCard
          title="No money targets"
          description="Add financial targets to track progress"
        />
      ) : (
        snapshots.map((snap) => (
          <Card key={snap.id} variant="flat" style={styles.snapCard}>
            <View style={styles.snapHeader}>
              <AppText variant="label" weight="semibold">
                {snap.target_label}
              </AppText>
              {snap.target_amount && (
                <AppText variant="caption" color={colors.accent}>
                  ${snap.target_amount.toLocaleString()}
                </AppText>
              )}
            </View>
            {snap.current_amount !== null && (
              <>
                <Spacer size="sm" />
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: snap.target_amount
                          ? `${Math.min(100, (snap.current_amount / snap.target_amount) * 100)}%`
                          : '0%',
                      },
                    ]}
                  />
                </View>
                <AppText variant="caption" color={colors.textTertiary}>
                  ${snap.current_amount.toLocaleString()} saved
                </AppText>
              </>
            )}
          </Card>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addCard: {
    marginBottom: spacing.lg,
  },
  snapCard: {
    marginBottom: spacing.md,
  },
  snapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.backgroundMuted,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.success,
    borderRadius: 2,
  },
});
