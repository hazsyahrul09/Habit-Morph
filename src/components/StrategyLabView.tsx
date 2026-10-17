import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import { ReplacementProtocol } from '../types/habit';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  Target, 
  Layers, 
  Zap, 
  Check, 
  Clock,
  BookOpen
} from 'lucide-react';

export const StrategyLabView: React.FC = () => {
  const { 
    protocols, 
    incrementProtocolSuccess, 
    toggleProtocolStatus, 
    deleteProtocol, 
    addProtocol 
  } = useHabit();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'digital_distraction' | 'emotional_avoidance' | 'physical_vitality' | 'mindset_loop'>('digital_distraction');
  const [newTrigger, setNewTrigger] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newFriction, setNewFriction] = useState('');
  const [newReward, setNewReward] = useState('');

  const handleCreateProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTrigger.trim() || !newAction.trim()) return;

    addProtocol({
      badHabitTitle: newTitle.trim(),
      category: newCategory,
      explanation: 'Targeted habit loop re-engineering via implementation intention.',
      habitLoop: {
        cue: newTrigger.trim(),
        craving: 'Relief or stimulation',
        routine: newTitle.trim(),
        reward: newReward.trim() || 'Temporary sensation',
      },
      implementationIntention: {
        trigger: newTrigger.trim(),
        action: newAction.trim(),
      },
      frictionTactic: newFriction.trim() || 'Create a physical obstacle before starting this habit.',
      rewardAlternative: newReward.trim() || 'Pride, self-respect, and sustained energy.',
    });

    setIsAddingNew(false);
    setNewTitle('');
    setNewTrigger('');
    setNewAction('');
    setNewFriction('');
    setNewReward('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                STRATEGY FORMULATION
              </span>
              <span className="text-xs text-emerald-200">Implementation Intentions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Habit Replacement Protocols
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              Research shows you are 3x more likely to stick to a productive habit when you pre-decide your exact response to triggers: 
              <span className="font-bold text-amber-300"> “When [Trigger], I will [Productive Action] instead of [Bad Habit]”</span>.
            </p>
          </div>

          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-md shadow-emerald-500/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Strategy</span>
          </button>
        </div>
      </div>

      {/* New Protocol Form */}
      {isAddingNew && (
        <form onSubmit={handleCreateProtocol} className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-lg space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">
              Craft a New Implementation Intention Strategy
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Bad Habit to Replace *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Bedtime phone doomscrolling, Late-afternoon sugar snacking..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as unknown as typeof newCategory)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              >
                <option value="digital_distraction">📱 Digital Distraction</option>
                <option value="emotional_avoidance">🛡️ Emotional Avoidance / Procrastination</option>
                <option value="physical_vitality">⚡ Physical Vitality & Sleep</option>
                <option value="mindset_loop">🧠 Mindset & Self-Criticism</option>
              </select>
            </div>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
            <span className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide block">
              The Implementation Formula (If-Then Protocol):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-emerald-900 block mb-1">
                  1. When this trigger occurs (Cue):
                </label>
                <input
                  type="text"
                  required
                  value={newTrigger}
                  onChange={(e) => setNewTrigger(e.target.value)}
                  placeholder="e.g. When I lie down in bed and reach for my phone..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-300 bg-white font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-emerald-900 block mb-1">
                  2. I will perform this productive replacement:
                </label>
                <input
                  type="text"
                  required
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  placeholder="e.g. I will dock phone outside and read 5 pages of my book..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-300 bg-white font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Friction Tactic (Make the bad habit difficult)
              </label>
              <input
                type="text"
                value={newFriction}
                onChange={(e) => setNewFriction(e.target.value)}
                placeholder="e.g. Put phone in drawer, log out of app, drink a full glass of water..."
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Healthy Reward & Gain
              </label>
              <input
                type="text"
                value={newReward}
                onChange={(e) => setNewReward(e.target.value)}
                placeholder="e.g. Wake up refreshed with clear eyes and deep calm..."
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
            >
              Save Strategy Protocol
            </button>
          </div>
        </form>
      )}

      {/* Protocols List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {protocols.map((proto) => {
          const isMastered = proto.status === 'mastered';

          return (
            <div
              key={proto.id}
              className={`bg-white rounded-3xl border transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                isMastered ? 'border-amber-300 ring-2 ring-amber-300/20' : 'border-slate-200'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isMastered
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {isMastered ? '🏆 Protocol Mastered (10+ Reps)' : '⚡ Active Protocol'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleProtocolStatus(proto.id)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-lg transition ${
                        isMastered
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      {isMastered ? 'Move to Active' : 'Mark as Mastered'}
                    </button>
                    <button
                      onClick={() => deleteProtocol(proto.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete Protocol"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bad Habit Title */}
                <div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                    Counter-Productive Target
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {proto.badHabitTitle}
                  </h3>
                </div>

                {/* Implementation Intention Highlight Box */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>Pre-Committed Implementation Plan:</span>
                  </div>

                  <div className="text-xs text-slate-800 space-y-1.5">
                    <p className="leading-relaxed">
                      <span className="font-bold text-amber-800">Trigger Cue: </span>
                      {proto.implementationIntention.trigger}
                    </p>
                    <p className="leading-relaxed">
                      <span className="font-bold text-emerald-800">Productive Replacement: </span>
                      {proto.implementationIntention.action}
                    </p>
                  </div>
                </div>

                {/* Friction and Reward Tactics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Friction Barrier:
                    </span>
                    <span className="text-slate-700 text-[11px] font-medium leading-tight">
                      {proto.frictionTactic}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Healthy Compound Reward:
                    </span>
                    <span className="text-slate-700 text-[11px] font-medium leading-tight">
                      {proto.rewardAlternative}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Success Tracker */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">
                    Successful Repetitions
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-lg font-black font-mono text-emerald-700">
                      {proto.successCount}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">times replaced</span>
                  </div>
                </div>

                <button
                  onClick={() => incrementProtocolSuccess(proto.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm shadow-emerald-600/20"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>+1 Replaced Today!</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
