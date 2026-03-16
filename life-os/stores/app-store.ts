/**
 * App-level UI/workflow state.
 * Remote data lives in TanStack Query — this is for local UI state only.
 */

import { create } from 'zustand';
import { EnergyMode } from '@/domain/types';

interface AppState {
  // Energy mode for the current session
  energyMode: EnergyMode;
  setEnergyMode: (mode: EnergyMode) => void;

  // Daily planning
  isDailyPlanningOpen: boolean;
  setDailyPlanningOpen: (open: boolean) => void;

  // Weekly reset
  isWeeklyResetOpen: boolean;
  setWeeklyResetOpen: (open: boolean) => void;

  // Capture
  pendingCaptureText: string;
  setPendingCaptureText: (text: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  energyMode: 'normal',
  setEnergyMode: (mode) => set({ energyMode: mode }),

  isDailyPlanningOpen: false,
  setDailyPlanningOpen: (open) => set({ isDailyPlanningOpen: open }),

  isWeeklyResetOpen: false,
  setWeeklyResetOpen: (open) => set({ isWeeklyResetOpen: open }),

  pendingCaptureText: '',
  setPendingCaptureText: (text) => set({ pendingCaptureText: text }),
}));
