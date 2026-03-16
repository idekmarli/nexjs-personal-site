import { supabase } from '@/lib/supabase';
import { Routine, RoutineStep, RoutineLog } from '@/domain/types';

export const routineRepository = {
  async getAll(userId: string): Promise<Routine[]> {
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('user_id', userId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async getSteps(routineId: string): Promise<RoutineStep[]> {
    const { data, error } = await supabase
      .from('routine_steps')
      .select('*')
      .eq('routine_id', routineId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async getLogForDate(routineId: string, userId: string, date: string): Promise<RoutineLog | null> {
    const { data, error } = await supabase
      .from('routine_logs')
      .select('*')
      .eq('routine_id', routineId)
      .eq('user_id', userId)
      .eq('date', date)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async upsertLog(log: Omit<RoutineLog, 'id' | 'created_at'>): Promise<RoutineLog> {
    const { data, error } = await supabase
      .from('routine_logs')
      .upsert(log, { onConflict: 'routine_id,user_id,date' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
