import { supabase } from '@/lib/supabase';
import { Category, CategorySlug } from '@/domain/types';

const DEFAULT_CATEGORIES: Array<{ slug: CategorySlug; name: string; icon: string; color: string }> = [
  { slug: 'business', name: 'Business', icon: '💼', color: '#5A8EC4' },
  { slug: 'money', name: 'Money', icon: '💰', color: '#6B9B76' },
  { slug: 'home-life', name: 'Home & Life', icon: '🏠', color: '#C4935A' },
  { slug: 'health', name: 'Health', icon: '💪', color: '#C45A5A' },
  { slug: 'relationships', name: 'Relationships', icon: '❤️', color: '#B8977E' },
  { slug: 'growth', name: 'Growth', icon: '🌱', color: '#7B9B6B' },
];

export const categoryRepository = {
  async getAll(userId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async seedDefaults(userId: string): Promise<Category[]> {
    const categories = DEFAULT_CATEGORIES.map((cat, idx) => ({
      user_id: userId,
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      sort_order: idx,
    }));

    const { data, error } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (error) throw error;
    return data ?? [];
  },

  async getItemCounts(userId: string): Promise<Record<string, number>> {
    const { data, error } = await supabase
      .from('tasks')
      .select('category_id')
      .eq('user_id', userId)
      .neq('status', 'completed')
      .neq('status', 'dropped');

    if (error) throw error;

    const counts: Record<string, number> = {};
    for (const row of data ?? []) {
      if (row.category_id) {
        counts[row.category_id] = (counts[row.category_id] ?? 0) + 1;
      }
    }
    return counts;
  },
};
