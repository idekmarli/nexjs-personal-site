import { create } from 'zustand';
import { CategorySlug } from '@/domain/types';

interface OnboardingState {
  focusAreas: CategorySlug[];
  priorities: string[];
  selectedRoutines: string[];

  toggleFocusArea: (slug: CategorySlug) => void;
  addPriority: (priority: string) => void;
  removePriority: (priority: string) => void;
  toggleRoutine: (routineId: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  focusAreas: [],
  priorities: [],
  selectedRoutines: [],

  toggleFocusArea: (slug) =>
    set((state) => ({
      focusAreas: state.focusAreas.includes(slug)
        ? state.focusAreas.filter((s) => s !== slug)
        : state.focusAreas.length < 3
          ? [...state.focusAreas, slug]
          : state.focusAreas,
    })),

  addPriority: (priority) =>
    set((state) => ({
      priorities:
        state.priorities.length < 3
          ? [...state.priorities, priority]
          : state.priorities,
    })),

  removePriority: (priority) =>
    set((state) => ({
      priorities: state.priorities.filter((p) => p !== priority),
    })),

  toggleRoutine: (routineId) =>
    set((state) => ({
      selectedRoutines: state.selectedRoutines.includes(routineId)
        ? state.selectedRoutines.filter((r) => r !== routineId)
        : [...state.selectedRoutines, routineId],
    })),

  reset: () => set({ focusAreas: [], priorities: [], selectedRoutines: [] }),
}));
