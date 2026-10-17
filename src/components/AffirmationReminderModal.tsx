import React from 'react';
import { useHabit } from '../context/HabitContext';
import { 
  Bell, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Wind,
  ArrowRight
} from 'lucide-react';

export const AffirmationReminderModal: React.FC<{ onLogNow?: () => void }> = ({ onLogNow }) => {
  const { activeAlertReminder, setActiveAlertReminder } = useHabit();

  if (!activeAlertReminder) return null;

  const handleClose = () => {
    setActiveAlertReminder(null);
  };

  const handleLogAction = () => {
    setActiveAlertReminder(null);
    if (onLogNow) onLogNow();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-700 p-6 text-white text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white shadow-lg mb-3">
            <Bell className="w-8 h-8 animate-bounce" />
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 block">
            PROACTIVE HABIT CHIME • {activeAlertReminder.time}
          </span>
          <h2 className="text-xl font-black mt-1">
            {activeAlertReminder.title}
          </h2>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-center">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
            <span className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Your Positive Nudge</span>
            </span>
            <p className="text-sm font-semibold text-slate-800 italic leading-relaxed">
              “{activeAlertReminder.affirmationNudge}”
            </p>
          </div>

          {/* 3-Breath Centering Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
              <Wind className="w-4 h-4 text-teal-600" />
              <span>3-Second Centering Pause</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Inhale deeply through your nose for 4 seconds... pause... and exhale slowly. 
              Step into your next action with intention.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleLogAction}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Completed This! Log in Journal</span>
            </button>

            <button
              onClick={handleClose}
              className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
            >
              Dismiss for Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
