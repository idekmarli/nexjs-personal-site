import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { captureRepository } from '@/repositories';
import { aiService } from '@/services';
import { useAuthStore } from '@/stores/auth-store';

export function useCaptures() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: queryKeys.captures.all(userId ?? ''),
    queryFn: () => captureRepository.getAll(userId!),
    enabled: !!userId,
  });
}

export function useCaptureSuggestions(captureId: string) {
  return useQuery({
    queryKey: queryKeys.captures.suggestions(captureId),
    queryFn: () => captureRepository.getSuggestions(captureId),
    enabled: !!captureId,
  });
}

export function useCreateCapture() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rawInput: string) => {
      // 1. Save raw input immediately (persistence-first)
      const capture = await captureRepository.create(userId!, rawInput);

      // 2. Process with AI (can fail safely)
      try {
        await captureRepository.updateStatus(capture.id, 'processing');
        const response = await aiService.processBrainDump(rawInput);

        // 3. Save suggestions
        await captureRepository.saveSuggestions(
          capture.id,
          response.suggestions.map((s) => ({
            capture_id: capture.id,
            suggested_title: s.title,
            suggested_notes: s.notes,
            suggested_category_slug: s.category_slug,
            suggested_priority: s.priority,
            is_accepted: null,
          })),
        );

        await captureRepository.updateStatus(capture.id, 'processed');
      } catch {
        // AI failed, but raw input is safe
        await captureRepository.updateStatus(capture.id, 'failed');
      }

      return capture;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['captures'] });
    },
  });
}

export function useAcceptSuggestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (suggestionId: string) =>
      captureRepository.acceptSuggestion(suggestionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['captures'] });
    },
  });
}

export function useRejectSuggestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (suggestionId: string) =>
      captureRepository.rejectSuggestion(suggestionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['captures'] });
    },
  });
}
