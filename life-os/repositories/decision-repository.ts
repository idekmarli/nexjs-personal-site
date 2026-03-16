import { supabase } from '@/lib/supabase';
import { Decision, DecisionAIResponse } from '@/domain/types';

export const decisionRepository = {
  async getAll(userId: string): Promise<Decision[]> {
    const { data, error } = await supabase
      .from('decisions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async create(
    userId: string,
    question: string,
    context: string | null,
  ): Promise<Decision> {
    const { data, error } = await supabase
      .from('decisions')
      .insert({
        user_id: userId,
        question,
        context,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async saveAIResponse(
    id: string,
    aiResponse: DecisionAIResponse,
  ): Promise<void> {
    const { error } = await supabase
      .from('decisions')
      .update({
        ai_response: aiResponse,
        status: 'decided',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw error;
  },
};
