/**
 * AI Service — structured, validated AI calls.
 * All AI endpoints return Zod-validated JSON.
 */

import { supabase } from '@/lib/supabase';
import {
  processBrainDumpResponseSchema,
  generateDailyPlanResponseSchema,
  weeklyResetSummarySchema,
  decisionResponseSchema,
  assistantResponseSchema,
  type ProcessBrainDumpResponse,
  type GenerateDailyPlanResponse,
  type WeeklyResetSummary,
  type DecisionResponse,
  type AssistantResponse,
} from '@/domain/schemas';
import { EnergyMode } from '@/domain/types';

async function callAIEndpoint<T>(
  functionName: string,
  payload: Record<string, unknown>,
  schema: { parse: (data: unknown) => T },
): Promise<T> {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) throw new Error(`AI call failed: ${error.message}`);
  return schema.parse(data);
}

export const aiService = {
  async processBrainDump(rawInput: string): Promise<ProcessBrainDumpResponse> {
    return callAIEndpoint(
      'process-brain-dump',
      { raw_input: rawInput },
      processBrainDumpResponseSchema,
    );
  },

  async generateDailyPlan(
    tasks: Array<{ id: string; title: string; priority: string }>,
    energyMode: EnergyMode,
  ): Promise<GenerateDailyPlanResponse> {
    return callAIEndpoint(
      'generate-daily-plan',
      { tasks, energy_mode: energyMode },
      generateDailyPlanResponseSchema,
    );
  },

  async generateWeeklyResetSummary(
    resetData: Record<string, unknown>,
  ): Promise<WeeklyResetSummary> {
    return callAIEndpoint(
      'generate-weekly-summary',
      resetData,
      weeklyResetSummarySchema,
    );
  },

  async getDecisionSupport(
    question: string,
    context: string | null,
  ): Promise<DecisionResponse> {
    return callAIEndpoint(
      'decision-support',
      { question, context },
      decisionResponseSchema,
    );
  },

  async chat(
    message: string,
    appContext: Record<string, unknown>,
  ): Promise<AssistantResponse> {
    return callAIEndpoint(
      'assistant-chat',
      { message, context: appContext },
      assistantResponseSchema,
    );
  },
};
