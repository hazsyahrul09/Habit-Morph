import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import { SmartReminder, HabitCategory } from '../types/habit';
import { 
  Bell, 
  Plus, 
  Clock, 
  Volume2, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Sun, 
  Moon, 
  Zap, 
  Heart,
  Play
} from 'lucide-react';

export const SmartRemindersView: React.FC = () => {
  const { 
    reminders, 
    toggleReminder, 
    deleteReminder, 
    addReminder, 
    testReminderAlert 
  } = useHabit();

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('08:30');
  const [newCategory, setNewCategory] = useState<HabitCategory>('focus_deep_work');
  const [newFrequency, setNewFrequency] = useState<'Daily' | 'Weekdays' | 'Evening'>('Daily');
  const [newNudge, setNewNudge] = useState('');

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime) return;

    addReminder({
      title: newTitle.trim(),
      time: newTime,
      category: newCategory,
      frequency: newFrequency,
      enabled: true,
      affirmationNudge: newNudge.trim() || 'Take a deep breath and step forward with joyful presence.',
    });

    setIsAdding(false);
    setNewTitle('');
    setNewTime('08:30');
    setNewNudge('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-teal-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                PROACTIVE HABIT CUES
              </span>
              <span className="text-xs text-teal-200">Smart Temporal Anchors</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Productive Habit Reminders
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Don’t rely on willpower. Set positive, uplifting cues throughout your day to nudge you into deep work, screen breaks, hydration, and restful digital sunsets.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-md shadow-teal-400/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Smart Reminder</span>
          </button>
        </div>
      </div>

      {/* Add Reminder Modal / Inline Form */}
      {isAdding && (
        <form onSubmit={handleAddReminder} className="bg-white rounded-3xl p-6 border-2 border-teal-500 shadow-lg space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">
              Create a Productive Habit Reminder
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Reminder Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. 15-Minute Screen Free Reset, Deep Work Sprint, Digital Sunset..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Scheduled Time (24h) *
              </label>
              <input
                type="time"
                required
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as HabitCategory)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              >
                <option value="focus_deep_work">🎯 Deep Work Sprint</option>
                <option value="physical_vitality">⚡ Physical Vitality & Hydration</option>
                <option value="wellness_rest">🌱 Screen Break & Breathwork</option>
                <option value="digital_distraction">📱 Digital Sunset & Bedtime</option>
                <option value="mindset_loop">🧠 Evening Gratitude Audit</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Frequency
              </label>
              <select
                value={newFrequency}
                onChange={(e) => setNewFrequency(e.target.value as unknown as typeof newFrequency)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              >
                <option value="Daily">Daily</option>
                <option value="Weekdays">Weekdays (Mon-Fri)</option>
                <option value="Evening">Evening Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Affirmation / Inspiring Nudge Prompt
            </label>
            <input
              type="text"
              value={newNudge}
              onChange={(e) => setNewNudge(e.target.value)}
              placeholder="e.g. Step away from all monitors. Your clarity and nervous system thank you!"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-xs"
            >
              Save Reminder
            </button>
          </div>
        </form>
      )}

      {/* Reminders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className={`bg-white rounded-3xl p-5 border transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between ${
              rem.enabled ? 'border-slate-200' : 'border-slate-200/60 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-mono font-bold text-sm">
                    {rem.time}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {rem.frequency} • {rem.category.replace('_', ' ')}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      {rem.title}
                    </h3>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  onClick={() => toggleReminder(rem.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    rem.enabled ? 'bg-teal-600' : 'bg-slate-300'
                  }`}
                  title={rem.enabled ? 'Deactivate reminder' : 'Activate reminder'}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      rem.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Inspiring Nudge */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs text-slate-700 space-y-1">
                <span className="text-[10px] font-bold text-teal-800 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Affirmation Prompt:</span>
                </span>
                <p className="italic text-slate-600">
                  “{rem.affirmationNudge}”
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => testReminderAlert(rem)}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate / Test Chime</span>
              </button>

              <button
                onClick={() => deleteReminder(rem.id)}
                className="text-slate-400 hover:text-rose-600 p-1 transition"
                title="Delete Reminder"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
