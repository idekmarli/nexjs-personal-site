import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { routineRepository } from '@/repositories';
import { useAuthStore } from '@/stores/auth-store';
import { useAppStore } from '@/stores/app-store';
import { EnergyMode } from '@/domain/types';

export function useRoutines() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.routines.all(userId ?? ''),
    queryFn: () => routineRepository.getAll(userId!),
    enabled: !!userId,
  });
}

export function useRoutineSteps(routineId: string) {
  return useQuery({
    queryKey: queryKeys.routines.steps(routineId),
    queryFn: () => routineRepository.getSteps(routineId),
    enabled: !!routineId,
  });
}

export function useRoutineLog(routineId: string, date: string) {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.routines.log(routineId, date),
    queryFn: () => routineRepository.getLogForDate(routineId, userId!, date),
    enabled: !!userId && !!routineId,
  });
}

export function useCompleteRoutineStep() {
  const userId = useAuthStore((s) => s.user?.id);
  const energyMode = useAppStore((s) => s.energyMode);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      routineId,
      stepId,
      date,
      currentCompleted,
      currentSkipped,
    }: {
      routineId: string;
      stepId: string;
      date: string;
      currentCompleted: string[];
      currentSkipped: string[];
    }) => {
      const completed = currentCompleted.includes(stepId)
        ? currentCompleted.filter((id) => id !== stepId)
        : [...currentCompleted, stepId];

      return routineRepository.upsertLog({
        routine_id: routineId,
        user_id: userId!,
        date,
        energy_mode: energyMode,
        completed_steps: completed,
        skipped_steps: currentSkipped,
        completed_at: null,
      });
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.routines.log(vars.routineId, vars.date),
      });
    },
  });
}
