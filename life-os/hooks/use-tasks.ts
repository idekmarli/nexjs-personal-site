import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { taskRepository } from '@/repositories';
import { CreateTaskInput, UpdateTaskInput } from '@/domain/schemas';
import { useAuthStore } from '@/stores/auth-store';

export function useTasks() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.tasks.all(userId ?? ''),
    queryFn: () => taskRepository.getAll(userId!),
    enabled: !!userId,
  });
}

export function useTasksByDate(date: string) {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.tasks.byDate(userId ?? '', date),
    queryFn: () => taskRepository.getByDate(userId!, date),
    enabled: !!userId,
  });
}

export function useTopPriorities() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.tasks.topPriorities(userId ?? ''),
    queryFn: () => taskRepository.getTopPriorities(userId!),
    enabled: !!userId,
  });
}

export function useTasksByCategory(categoryId: string) {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.tasks.byCategory(userId ?? '', categoryId),
    queryFn: () => taskRepository.getByCategory(userId!, categoryId),
    enabled: !!userId && !!categoryId,
  });
}

export function useCreateTask() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => taskRepository.create(userId!, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
    },
  });
}

export function useUpdateTask() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, input }: { taskId: string; input: UpdateTaskInput }) =>
      taskRepository.update(taskId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
    },
  });
}

export function useDeleteTask() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskRepository.delete(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
    },
  });
}
