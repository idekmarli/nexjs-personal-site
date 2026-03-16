/**
 * Zod schemas for validation — especially AI response contracts.
 */

import { z } from 'zod';

// ─── AI Response Schemas ─────────────────────────────────

export const captureSuggestionSchema = z.object({
  title: z.string().min(1).max(200),
  notes: z.string().nullable(),
  category_slug: z
    .enum(['business', 'money', 'home-life', 'health', 'relationships', 'growth'])
    .nullable(),
  priority: z.enum(['top', 'normal', 'low']),
});

export const processBrainDumpResponseSchema = z.object({
  suggestions: z.array(captureSuggestionSchema).min(1).max(20),
});

export const dailyPlanItemSchema = z.object({
  title: z.string().min(1),
  time_block: z.string().nullable(),
  task_id: z.string().uuid().nullable(),
});

export const generateDailyPlanResponseSchema = z.object({
  items: z.array(dailyPlanItemSchema).min(1).max(15),
  summary: z.string().max(300),
});

export const weeklyResetSummarySchema = z.object({
  summary: z.string().min(1).max(1000),
  key_themes: z.array(z.string()).max(5),
  recommended_focus: z.array(z.string()).max(3),
});

export const decisionResponseSchema = z.object({
  clarified_decision: z.string().min(1),
  criteria: z.array(z.string()).min(1).max(5),
  recommendation: z.string().min(1),
  next_step: z.string().min(1),
});

export const assistantResponseSchema = z.object({
  content: z.string().min(1),
  suggested_actions: z
    .array(
      z.object({
        label: z.string(),
        type: z.enum(['task', 'capture', 'navigate', 'info']),
      }),
    )
    .max(3)
    .optional(),
});

// ─── Form Validation Schemas ─────────────────────────────

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  notes: z.string().max(2000).nullable(),
  priority: z.enum(['top', 'normal', 'low']).default('normal'),
  category_id: z.string().uuid().nullable(),
  date: z.string().nullable(),
  due_date: z.string().nullable(),
  is_top_priority: z.boolean().default(false),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  status: z.enum(['pending', 'in_progress', 'completed', 'dropped']).optional(),
});

export const createCaptureSchema = z.object({
  raw_input: z.string().min(1, 'Please enter something').max(5000),
});

export const decisionInputSchema = z.object({
  question: z.string().min(1, 'Please enter a decision').max(1000),
  context: z.string().max(2000).nullable(),
});

// ─── Type Exports from Schemas ───────────────────────────

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateCaptureInput = z.infer<typeof createCaptureSchema>;
export type ProcessBrainDumpResponse = z.infer<typeof processBrainDumpResponseSchema>;
export type GenerateDailyPlanResponse = z.infer<typeof generateDailyPlanResponseSchema>;
export type WeeklyResetSummary = z.infer<typeof weeklyResetSummarySchema>;
export type DecisionInput = z.infer<typeof decisionInputSchema>;
export type DecisionResponse = z.infer<typeof decisionResponseSchema>;
export type AssistantResponse = z.infer<typeof assistantResponseSchema>;
