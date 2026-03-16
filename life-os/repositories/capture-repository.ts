import { supabase } from '@/lib/supabase';
import { Capture, CaptureStatus, CaptureSuggestion } from '@/domain/types';

export const captureRepository = {
  async getAll(userId: string): Promise<Capture[]> {
    const { data, error } = await supabase
      .from('captures')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async create(userId: string, rawInput: string): Promise<Capture> {
    const { data, error } = await supabase
      .from('captures')
      .insert({ user_id: userId, raw_input: rawInput, status: 'raw' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStatus(captureId: string, status: CaptureStatus): Promise<void> {
    const update: Record<string, unknown> = { status };
    if (status === 'processed') {
      update.processed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('captures')
      .update(update)
      .eq('id', captureId);

    if (error) throw error;
  },

  async getSuggestions(captureId: string): Promise<CaptureSuggestion[]> {
    const { data, error } = await supabase
      .from('capture_suggestions')
      .select('*')
      .eq('capture_id', captureId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async saveSuggestions(
    captureId: string,
    suggestions: Omit<CaptureSuggestion, 'id' | 'created_at'>[],
  ): Promise<CaptureSuggestion[]> {
    const { data, error } = await supabase
      .from('capture_suggestions')
      .insert(suggestions.map((s) => ({ ...s, capture_id: captureId })))
      .select();

    if (error) throw error;
    return data ?? [];
  },

  async acceptSuggestion(suggestionId: string): Promise<void> {
    const { error } = await supabase
      .from('capture_suggestions')
      .update({ is_accepted: true })
      .eq('id', suggestionId);

    if (error) throw error;
  },

  async rejectSuggestion(suggestionId: string): Promise<void> {
    const { error } = await supabase
      .from('capture_suggestions')
      .update({ is_accepted: false })
      .eq('id', suggestionId);

    if (error) throw error;
  },
};
