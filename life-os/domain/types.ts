/**
 * Life OS Domain Types
 * Source of truth for all entity shapes throughout the app.
 */

// ─── Enums ───────────────────────────────────────────────

export type EnergyMode = 'low' | 'normal' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'dropped';
export type TaskPriority = 'top' | 'normal' | 'low';
export type RoutineType = 'morning' | 'evening' | 'weekly' | 'custom';
export type RoutineStepStatus = 'pending' | 'completed' | 'skipped';
export type CaptureStatus = 'raw' | 'processing' | 'processed' | 'failed';
export type WeeklyResetStatus = 'draft' | 'completed';
export type DecisionStatus = 'pending' | 'decided' | 'archived';

export type CategorySlug =
  | 'business'
  | 'money'
  | 'home-life'
  | 'health'
  | 'relationships'
  | 'growth';

// ─── Core Entities ───────────────────────────────────────

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  has_onboarded: boolean;
  energy_mode: EnergyMode;
  notification_preferences: NotificationPreferences;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferences {
  morning_routine: boolean;
  evening_routine: boolean;
  weekly_reset: boolean;
  daily_planning: boolean;
}

export interface Category {
  id: string;
  user_id: string;
  slug: CategorySlug;
  name: string;
  icon: string;
  color: string;
  sort_order: number;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  notes: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  category_id: string | null;
  date: string | null;
  due_date: string | null;
  is_top_priority: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Capture {
  id: string;
  user_id: string;
  raw_input: string;
  status: CaptureStatus;
  processed_at: string | null;
  created_at: string;
}

export interface CaptureSuggestion {
  id: string;
  capture_id: string;
  suggested_title: string;
  suggested_notes: string | null;
  suggested_category_slug: CategorySlug | null;
  suggested_priority: TaskPriority;
  is_accepted: boolean | null;
  created_at: string;
}

export interface Routine {
  id: string;
  user_id: string;
  name: string;
  type: RoutineType;
  is_active: boolean;
  has_low_energy_variant: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface RoutineStep {
  id: string;
  routine_id: string;
  title: string;
  duration_minutes: number | null;
  is_low_energy: boolean;
  sort_order: number;
}

export interface RoutineLog {
  id: string;
  routine_id: string;
  user_id: string;
  date: string;
  energy_mode: EnergyMode;
  completed_steps: string[];
  skipped_steps: string[];
  completed_at: string | null;
  created_at: string;
}

export interface DailyPlan {
  id: string;
  user_id: string;
  date: string;
  energy_mode: EnergyMode;
  is_ai_generated: boolean;
  created_at: string;
  updated_at: string;
}

export interface DailyPlanItem {
  id: string;
  plan_id: string;
  task_id: string | null;
  title: string;
  time_block: string | null;
  sort_order: number;
  is_completed: boolean;
}

export interface WeeklyReset {
  id: string;
  user_id: string;
  week_start: string;
  status: WeeklyResetStatus;
  open_loops: string[];
  weekly_priorities: string[];
  business_focus: string | null;
  drop_list: string[];
  emotional_checkin: string | null;
  ai_summary: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface Decision {
  id: string;
  user_id: string;
  question: string;
  context: string | null;
  status: DecisionStatus;
  ai_response: DecisionAIResponse | null;
  chosen_action: string | null;
  created_at: string;
  updated_at: string;
}

export interface DecisionAIResponse {
  clarified_decision: string;
  criteria: string[];
  recommendation: string;
  next_step: string;
}

export interface BusinessFocusItem {
  id: string;
  user_id: string;
  title: string;
  area: 'reselling' | 'digital_products' | 'general';
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MoneySnapshot {
  id: string;
  user_id: string;
  target_label: string;
  target_amount: number | null;
  current_amount: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssistantMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}
