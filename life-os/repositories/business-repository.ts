import { supabase } from '@/lib/supabase';
import { BusinessFocusItem, MoneySnapshot } from '@/domain/types';

export const businessRepository = {
  async getFocusItems(userId: string): Promise<BusinessFocusItem[]> {
    const { data, error } = await supabase
      .from('business_focus_items')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async createFocusItem(
    userId: string,
    input: Pick<BusinessFocusItem, 'title' | 'area' | 'notes'>,
  ): Promise<BusinessFocusItem> {
    const { data, error } = await supabase
      .from('business_focus_items')
      .insert({ ...input, user_id: userId, is_active: true })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMoneySnapshots(userId: string): Promise<MoneySnapshot[]> {
    const { data, error } = await supabase
      .from('money_snapshots')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async createMoneySnapshot(
    userId: string,
    input: Pick<MoneySnapshot, 'target_label' | 'target_amount' | 'current_amount' | 'notes'>,
  ): Promise<MoneySnapshot> {
    const { data, error } = await supabase
      .from('money_snapshots')
      .insert({ ...input, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateMoneySnapshot(
    id: string,
    input: Partial<Pick<MoneySnapshot, 'current_amount' | 'notes'>>,
  ): Promise<MoneySnapshot> {
    const { data, error } = await supabase
      .from('money_snapshots')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
