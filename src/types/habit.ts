export type HabitImpact = 'productive' | 'neutral' | 'counterproductive';

export type HabitCategory =
  | 'digital_distraction'
  | 'emotional_avoidance'
  | 'physical_vitality'
  | 'mindset_loop'
  | 'focus_deep_work'
  | 'wellness_rest'
  | 'learning_growth';

export interface FeedbackMessage {
  type: 'celebration' | 'compassionate_guidance';
  headline: string;
  quote: string;
  affirmation: string;
  actionableTips: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  timestamp: string; // e.g., "10:30 AM" or ISO
  date: string; // YYYY-MM-DD
  impact: HabitImpact;
  category: HabitCategory;
  durationMinutes: number;
  energyLevel: 1 | 2 | 3 | 4 | 5; // 1 lowest, 5 highest
  moodBefore?: string;
  moodAfter?: string;
  triggerCue?: string; // What caused or triggered this?
  notes: string;
  underlyingWhy?: string; // Psychological explanation for counter-productive habits
  replacementStrategy?: string; // Actionable replacement strategy
  feedback: FeedbackMessage;
}

export interface HabitLoop {
  cue: string;
  craving: string;
  routine: string;
  reward: string;
}

export interface ReplacementProtocol {
  id: string;
  badHabitTitle: string;
  category: HabitCategory;
  explanation: string;
  habitLoop: HabitLoop;
  implementationIntention: {
    trigger: string;
    action: string;
  };
  frictionTactic: string;
  rewardAlternative: string;
  status: 'in_progress' | 'mastered';
  successCount: number;
}

export interface SmartReminder {
  id: string;
  title: string;
  time: string; // e.g. "08:30"
  category: HabitCategory;
  frequency: 'Daily' | 'Weekdays' | 'Evening';
  enabled: boolean;
  affirmationNudge: string;
}

export interface UserStats {
  productiveStreakDays: number;
  totalActivitiesLogged: number;
  productiveScore: number; // percentage (0-100)
  badHabitsReplaced: number;
}
