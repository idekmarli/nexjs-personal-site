import { supabase } from '@/lib/supabase';
import { Task, TaskStatus } from '@/domain/types';
import { CreateTaskInput, UpdateTaskInput } from '@/domain/schemas';

export const taskRepository = {
  async getAll(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async getByDate(userId: string, date: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('is_top_priority', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async getTopPriorities(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('is_top_priority', true)
      .neq('status', 'completed')
      .neq('status', 'dropped')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;
    return data ?? [];
  },

  async getByCategory(userId: string, categoryId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async create(userId: string, input: CreateTaskInput): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert({ ...input, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(taskId: string, input: UpdateTaskInput): Promise<Task> {
    const updateData: Record<string, unknown> = { ...input, updated_at: new Date().toISOString() };
    if (input.status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(taskId: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) throw error;
  },
};
