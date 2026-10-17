import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import { HabitImpact, HabitCategory } from '../types/habit';
import { diagnoseActivity } from '../utils/habitDiagnostics';
import { 
  X, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Compass, 
  ArrowRight,
  BookOpen,
  Send
} from 'lucide-react';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { addJournalEntry } = useHabit();

  const [title, setTitle] = useState('');
  const [impact, setImpact] = useState<HabitImpact>('productive');
  const [category, setCategory] = useState<HabitCategory>('focus_deep_work');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [energyLevel, setEnergyLevel] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [moodBefore, setMoodBefore] = useState('');
  const [moodAfter, setMoodAfter] = useState('');
  const [triggerCue, setTriggerCue] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  // Preset chips for rapid selection
  const presets = [
    { label: 'Deep Work Sprint (45m)', impact: 'productive', cat: 'focus_deep_work' },
    { label: 'Instagram / TikTok Doomscrolling (30m)', impact: 'counterproductive', cat: 'digital_distraction' },
    { label: 'Sunlight Brisk Walk & Hydration (20m)', impact: 'productive', cat: 'physical_vitality' },
    { label: 'Procrastinating Task via Tab Hopping (35m)', impact: 'counterproductive', cat: 'emotional_avoidance' },
    { label: 'Late-Night Screen Binging in Bed (45m)', impact: 'counterproductive', cat: 'physical_vitality' },
    { label: '10-Min Box Breathing Meditation', impact: 'productive', cat: 'wellness_rest' },
    { label: 'Stress Eating High-Sugar Treats', impact: 'counterproductive', cat: 'physical_vitality' },
    { label: 'Read 15 Pages of Non-Fiction', impact: 'productive', cat: 'learning_growth' },
  ] as const;

  const handleApplyPreset = (preset: typeof presets[number]) => {
    setTitle(preset.label);
    setImpact(preset.impact);
    setCategory(preset.cat);
  };

  // Live diagnostic preview
  const previewDiagnosis = title.trim() ? diagnoseActivity(title, impact, category) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addJournalEntry({
      title: title.trim(),
      impact,
      category,
      durationMinutes,
      energyLevel,
      moodBefore: moodBefore.trim() || undefined,
      moodAfter: moodAfter.trim() || undefined,
      triggerCue: triggerCue.trim() || undefined,
      notes: notes.trim(),
    });

    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                Mindful Habit Journal
              </span>
              <h2 className="text-xl font-black text-white">Log Activity or Habit</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Quick Suggestions (Click to autofill):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                    p.impact === 'productive'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {p.impact === 'productive' ? '✨' : '⚠️'} {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Activity or Habit Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 45-Min Deep Work, Doomscrolling on phone, Late-night snacking..."
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* Impact Selector: Productive, Neutral, Counter-productive */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              How does this activity impact your goals?
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center text-center transition ${
                  impact === 'productive'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="impact"
                  value="productive"
                  checked={impact === 'productive'}
                  onChange={() => setImpact('productive')}
                  className="sr-only"
                />
                <span className="text-lg">✨</span>
                <span className="text-xs font-bold mt-1">Productive</span>
                <span className="text-[10px] text-emerald-700/80 mt-0.5">Builds momentum</span>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center text-center transition ${
                  impact === 'neutral'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="impact"
                  value="neutral"
                  checked={impact === 'neutral'}
                  onChange={() => setImpact('neutral')}
                  className="sr-only"
                />
                <span className="text-lg">⚖️</span>
                <span className="text-xs font-bold mt-1">Neutral</span>
                <span className="text-[10px] text-amber-700/80 mt-0.5">Daily maintenance</span>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center text-center transition ${
                  impact === 'counterproductive'
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 text-rose-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="impact"
                  value="counterproductive"
                  checked={impact === 'counterproductive'}
                  onChange={() => setImpact('counterproductive')}
                  className="sr-only"
                />
                <span className="text-lg">⚠️</span>
                <span className="text-xs font-bold mt-1">Counter-Productive</span>
                <span className="text-[10px] text-rose-700/80 mt-0.5">Bad habit to replace</span>
              </label>
            </div>
          </div>

          {/* Category & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as HabitCategory)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800"
              >
                <option value="focus_deep_work">🎯 Focus & Deep Work</option>
                <option value="digital_distraction">📱 Digital Distraction & Screen Loops</option>
                <option value="emotional_avoidance">🛡️ Emotional Avoidance & Procrastination</option>
                <option value="physical_vitality">⚡ Physical Vitality, Sleep & Nutrition</option>
                <option value="wellness_rest">🌱 Wellness, Hydration & Rest</option>
                <option value="mindset_loop">🧠 Mindset & Cognitive Loops</option>
                <option value="learning_growth">📚 Learning & Personal Growth</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Duration</span>
                <span className="font-mono text-emerald-700 font-bold">{durationMinutes} mins</span>
              </label>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Energy Rating & Trigger Cue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Energy Level Afterward (1 = Drained, 5 = Peak)
              </label>
              <div className="flex items-center gap-2">
                {([1, 2, 3, 4, 5] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setEnergyLevel(lvl)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-bold transition ${
                      energyLevel >= lvl
                        ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <Zap className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Trigger / Cue (What sparked this?)
              </label>
              <input
                type="text"
                value={triggerCue}
                onChange={(e) => setTriggerCue(e.target.value)}
                placeholder="e.g. Felt tired at desk, Got a ping notification, Morning coffee..."
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Reflections & Context
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What thoughts or feelings did you observe? How did this align with your intentions?"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800"
            />
          </div>

          {/* Live Diagnostic Preview Card */}
          {previewDiagnosis && (
            <div
              className={`p-4 rounded-2xl border transition-all ${
                impact === 'productive'
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : impact === 'counterproductive'
                  ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-extrabold uppercase tracking-wide">
                  {impact === 'productive' ? 'Positive Reinforcement Preview' : 'Compassionate Guidance & Strategy Preview'}
                </span>
              </div>
              <h4 className="text-sm font-bold">
                {previewDiagnosis.feedback.headline}
              </h4>
              <p className="text-xs italic mt-1 text-slate-600">
                {previewDiagnosis.feedback.quote}
              </p>
              <p className="text-xs font-medium mt-1.5 text-emerald-800">
                🌱 {previewDiagnosis.feedback.affirmation}
              </p>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>Save & Reflect</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
