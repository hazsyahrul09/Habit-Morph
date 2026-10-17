import React, { useState } from 'react';
import { HabitProvider, useHabit } from './context/HabitContext';
import { HeaderNav } from './components/HeaderNav';
import { JournalFeedView } from './components/JournalFeedView';
import { BadHabitDeconstructLab } from './components/BadHabitDeconstructLab';
import { StrategyLabView } from './components/StrategyLabView';
import { SmartRemindersView } from './components/SmartRemindersView';
import { AnalyticsView } from './components/AnalyticsView';
import { LogActivityModal } from './components/LogActivityModal';
import { AffirmationReminderModal } from './components/AffirmationReminderModal';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Plus, 
  Compass, 
  BookOpen, 
  Microscope, 
  CheckCircle2 
} from 'lucide-react';

function HabitMorphMain() {
  const { activeTab, setActiveTab } = useHabit();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <HeaderNav onOpenLogModal={() => setIsLogModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'journal' && (
          <JournalFeedView onOpenLogModal={() => setIsLogModalOpen(true)} />
        )}

        {activeTab === 'deconstruct_lab' && (
          <BadHabitDeconstructLab />
        )}

        {activeTab === 'strategies' && (
          <StrategyLabView />
        )}

        {activeTab === 'reminders' && (
          <SmartRemindersView />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">HabitMorph</span>
            <span>•</span>
            <span>Mindful Habit & Activity Journaling Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Compassionate Science
            </span>
            <span>•</span>
            <span>Behavioral Psychology Backed</span>
            <span>•</span>
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Log Now
            </button>
          </div>
        </div>
      </footer>

      {/* Log Activity Modal */}
      <LogActivityModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />

      {/* Affirmation Reminder Alert Modal */}
      <AffirmationReminderModal
        onLogNow={() => setIsLogModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <HabitProvider>
      <HabitMorphMain />
    </HabitProvider>
  );
}
