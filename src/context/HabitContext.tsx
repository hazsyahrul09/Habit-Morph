import React, { createContext, useContext, useState, useEffect } from 'react';
import { JournalEntry, ReplacementProtocol, SmartReminder, HabitImpact, HabitCategory, FeedbackMessage } from '../types/habit';
import { INITIAL_JOURNAL_ENTRIES, INITIAL_REPLACEMENT_PROTOCOLS, INITIAL_SMART_REMINDERS } from '../data/initialHabitData';
import { diagnoseActivity } from '../utils/habitDiagnostics';
import { playSuccessBeep, playChimeSound, playQueueCallChime } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HabitContextType {
  entries: JournalEntry[];
  protocols: ReplacementProtocol[];
  reminders: SmartReminder[];
  activeTab: 'journal' | 'deconstruct_lab' | 'strategies' | 'reminders' | 'analytics';
  setActiveTab: (tab: 'journal' | 'deconstruct_lab' | 'strategies' | 'reminders' | 'analytics') => void;
  addJournalEntry: (entryData: {
    title: string;
    impact?: HabitImpact;
    category?: HabitCategory;
    durationMinutes: number;
    energyLevel: 1 | 2 | 3 | 4 | 5;
    moodBefore?: string;
    moodAfter?: string;
    triggerCue?: string;
    notes: string;
  }) => JournalEntry;
  deleteJournalEntry: (id: string) => void;
  addProtocol: (protocol: Omit<ReplacementProtocol, 'id' | 'status' | 'successCount'>) => void;
  incrementProtocolSuccess: (id: string) => void;
  toggleProtocolStatus: (id: string) => void;
  deleteProtocol: (id: string) => void;
  addReminder: (reminder: Omit<SmartReminder, 'id'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  activeAlertReminder: SmartReminder | null;
  setActiveAlertReminder: (reminder: SmartReminder | null) => void;
  testReminderAlert: (reminder: SmartReminder) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  stats: {
    totalLogged: number;
    productiveCount: number;
    counterproductiveCount: number;
    neutralCount: number;
    productivePercentage: number;
    streakDays: number;
    protocolsMastered: number;
  };
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'journal' | 'deconstruct_lab' | 'strategies' | 'reminders' | 'analytics'>('journal');

  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('habitmorph_entries');
    return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ENTRIES;
  });

  const [protocols, setProtocols] = useState<ReplacementProtocol[]>(() => {
    const saved = localStorage.getItem('habitmorph_protocols');
    return saved ? JSON.parse(saved) : INITIAL_REPLACEMENT_PROTOCOLS;
  });

  const [reminders, setReminders] = useState<SmartReminder[]>(() => {
    const saved = localStorage.getItem('habitmorph_reminders');
    return saved ? JSON.parse(saved) : INITIAL_SMART_REMINDERS;
  });

  const [activeAlertReminder, setActiveAlertReminder] = useState<SmartReminder | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('habitmorph_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('habitmorph_protocols', JSON.stringify(protocols));
  }, [protocols]);

  useEffect(() => {
    localStorage.setItem('habitmorph_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Check reminder minutes periodically (simulation)
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentHoursMinutes = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const match = reminders.find((r) => r.enabled && r.time === currentHoursMinutes);
      if (match && !activeAlertReminder) {
        testReminderAlert(match);
      }
    };

    const interval = setInterval(checkReminders, 45000);
    return () => clearInterval(interval);
  }, [reminders, activeAlertReminder]);

  const addJournalEntry = (entryData: {
    title: string;
    impact?: HabitImpact;
    category?: HabitCategory;
    durationMinutes: number;
    energyLevel: 1 | 2 | 3 | 4 | 5;
    moodBefore?: string;
    moodAfter?: string;
    triggerCue?: string;
    notes: string;
  }): JournalEntry => {
    const diagnosis = diagnoseActivity(entryData.title, entryData.impact, entryData.category);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      title: entryData.title,
      timestamp: timeStr,
      date: dateStr,
      impact: diagnosis.impact,
      category: diagnosis.category,
      durationMinutes: entryData.durationMinutes || 15,
      energyLevel: entryData.energyLevel,
      moodBefore: entryData.moodBefore,
      moodAfter: entryData.moodAfter,
      triggerCue: entryData.triggerCue,
      notes: entryData.notes,
      underlyingWhy: diagnosis.underlyingWhy,
      replacementStrategy: diagnosis.replacementStrategy,
      feedback: diagnosis.feedback,
    };

    setEntries((prev) => [newEntry, ...prev]);

    // If bad habit, check if we should auto-create or suggest a protocol
    if (diagnosis.impact === 'counterproductive') {
      const alreadyHasProtocol = protocols.some((p) =>
        p.badHabitTitle.toLowerCase().includes(entryData.title.toLowerCase())
      );

      if (!alreadyHasProtocol && diagnosis.underlyingWhy) {
        const autoProto: ReplacementProtocol = {
          id: `proto-${Date.now()}`,
          badHabitTitle: entryData.title,
          category: diagnosis.category,
          explanation: diagnosis.underlyingWhy,
          habitLoop: {
            cue: entryData.triggerCue || 'Stress, boredom, or transition friction',
            craving: 'Instant comfort, novelty, or emotional relief',
            routine: entryData.title,
            reward: 'Short-lived sensory soothing followed by fatigue',
          },
          implementationIntention: {
            trigger: `When I notice the urge to ${entryData.title}`,
            action: 'I will pause for 3 deep breaths and complete a 2-minute restorative alternative.',
          },
          frictionTactic: 'Add 20 seconds of physical friction before initiating this habit.',
          rewardAlternative: 'Clear mental conscience, deep vitality, and unbroken momentum.',
          status: 'in_progress',
          successCount: 0,
        };
        setProtocols((prev) => [autoProto, ...prev]);
      }
    }

    // Audio cue & celebration
    if (soundEnabled) {
      if (diagnosis.impact === 'productive') {
        playSuccessBeep();
        setTimeout(playChimeSound, 200);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      } else {
        playQueueCallChime();
      }
    }

    return newEntry;
  };

  const deleteJournalEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const addProtocol = (protoData: Omit<ReplacementProtocol, 'id' | 'status' | 'successCount'>) => {
    const newProto: ReplacementProtocol = {
      ...protoData,
      id: `proto-${Date.now()}`,
      status: 'in_progress',
      successCount: 0,
    };
    setProtocols((prev) => [newProto, ...prev]);
    if (soundEnabled) playSuccessBeep();
  };

  const incrementProtocolSuccess = (id: string) => {
    setProtocols((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newCount = p.successCount + 1;
          const newStatus = newCount >= 10 ? 'mastered' : p.status;
          return { ...p, successCount: newCount, status: newStatus };
        }
        return p;
      })
    );
    if (soundEnabled) {
      playSuccessBeep();
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    }
  };

  const toggleProtocolStatus = (id: string) => {
    setProtocols((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'in_progress' ? 'mastered' : 'in_progress' } : p
      )
    );
  };

  const deleteProtocol = (id: string) => {
    setProtocols((prev) => prev.filter((p) => p.id !== id));
  };

  const addReminder = (remData: Omit<SmartReminder, 'id'>) => {
    const newRem: SmartReminder = {
      ...remData,
      id: `rem-${Date.now()}`,
    };
    setReminders((prev) => [...prev, newRem]);
    if (soundEnabled) playSuccessBeep();
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const testReminderAlert = (reminder: SmartReminder) => {
    setActiveAlertReminder(reminder);
    if (soundEnabled) playChimeSound();
  };

  // Stats calculation
  const totalLogged = entries.length;
  const productiveCount = entries.filter((e) => e.impact === 'productive').length;
  const counterproductiveCount = entries.filter((e) => e.impact === 'counterproductive').length;
  const neutralCount = entries.filter((e) => e.impact === 'neutral').length;
  const productivePercentage = totalLogged > 0 ? Math.round((productiveCount / totalLogged) * 100) : 0;
  const protocolsMastered = protocols.filter((p) => p.status === 'mastered').length;

  return (
    <HabitContext.Provider
      value={{
        entries,
        protocols,
        reminders,
        activeTab,
        setActiveTab,
        addJournalEntry,
        deleteJournalEntry,
        addProtocol,
        incrementProtocolSuccess,
        toggleProtocolStatus,
        deleteProtocol,
        addReminder,
        toggleReminder,
        deleteReminder,
        activeAlertReminder,
        setActiveAlertReminder,
        testReminderAlert,
        soundEnabled,
        setSoundEnabled,
        stats: {
          totalLogged,
          productiveCount,
          counterproductiveCount,
          neutralCount,
          productivePercentage,
          streakDays: 4, // consistent streak
          protocolsMastered,
        },
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabit must be used within a HabitProvider');
  }
  return context;
};
