import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { categoryRepository } from '@/repositories';
import { useAuthStore } from '@/stores/auth-store';

export function useCategories() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.categories.all(userId ?? ''),
    queryFn: () => categoryRepository.getAll(userId!),
    enabled: !!userId,
  });
}

export function useCategoryCounts() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.categories.counts(userId ?? ''),
    queryFn: () => categoryRepository.getItemCounts(userId!),
    enabled: !!userId,
  });
}
