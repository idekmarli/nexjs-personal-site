import { supabase } from '@/lib/supabase';
import { WeeklyReset } from '@/domain/types';

export const weeklyResetRepository = {
  async getForWeek(userId: string, weekStart: string): Promise<WeeklyReset | null> {
    const { data, error } = await supabase
      .from('weekly_resets')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start', weekStart)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async getLatest(userId: string): Promise<WeeklyReset | null> {
    const { data, error } = await supabase
      .from('weekly_resets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async upsert(reset: Omit<WeeklyReset, 'id' | 'created_at'>): Promise<WeeklyReset> {
    const { data, error } = await supabase
      .from('weekly_resets')
      .upsert(reset, { onConflict: 'user_id,week_start' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
