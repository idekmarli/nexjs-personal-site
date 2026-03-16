/**
 * Centralized query key factory for TanStack Query.
 * Ensures consistent cache invalidation across the app.
 */

export const queryKeys = {
  tasks: {
    all: (userId: string) => ['tasks', userId] as const,
    byDate: (userId: string, date: string) => ['tasks', userId, 'date', date] as const,
    topPriorities: (userId: string) => ['tasks', userId, 'top-priorities'] as const,
    byCategory: (userId: string, categoryId: string) =>
      ['tasks', userId, 'category', categoryId] as const,
  },
  captures: {
    all: (userId: string) => ['captures', userId] as const,
    suggestions: (captureId: string) => ['captures', 'suggestions', captureId] as const,
  },
  routines: {
    all: (userId: string) => ['routines', userId] as const,
    steps: (routineId: string) => ['routines', 'steps', routineId] as const,
    log: (routineId: string, date: string) =>
      ['routines', 'log', routineId, date] as const,
  },
  categories: {
    all: (userId: string) => ['categories', userId] as const,
    counts: (userId: string) => ['categories', userId, 'counts'] as const,
  },
  weeklyReset: {
    forWeek: (userId: string, weekStart: string) =>
      ['weekly-reset', userId, weekStart] as const,
    latest: (userId: string) => ['weekly-reset', userId, 'latest'] as const,
  },
  dailyPlan: {
    forDate: (userId: string, date: string) =>
      ['daily-plan', userId, date] as const,
  },
  decisions: {
    all: (userId: string) => ['decisions', userId] as const,
  },
  business: {
    all: (userId: string) => ['business', userId] as const,
  },
  money: {
    all: (userId: string) => ['money', userId] as const,
  },
  assistant: {
    messages: (userId: string) => ['assistant', userId, 'messages'] as const,
  },
} as const;
