import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import { KNOWN_HABIT_PROFILES } from '../utils/habitDiagnostics';
import { HabitCategory } from '../types/habit';
import { 
  Microscope, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  ShieldAlert, 
  Smartphone, 
  Coffee, 
  Moon, 
  Brain, 
  Layers, 
  Check, 
  Zap,
  Repeat
} from 'lucide-react';

export const BadHabitDeconstructLab: React.FC = () => {
  const { setActiveTab, addProtocol, protocols } = useHabit();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Counter-Productive Habits', icon: Layers },
    { id: 'digital_distraction', label: '📱 Digital & Screen Loops', icon: Smartphone },
    { id: 'emotional_avoidance', label: '🛡️ Emotional Avoidance & Delay', icon: ShieldAlert },
    { id: 'physical_vitality', label: '⚡ Physical Vitality & Sleep Sinks', icon: Moon },
    { id: 'mindset_loop', label: '🧠 Mindset & Rumination Loops', icon: Brain },
  ];

  const filteredProfiles = KNOWN_HABIT_PROFILES.filter((p) => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  const handleCreateProtocolFromProfile = (profile: typeof KNOWN_HABIT_PROFILES[0]) => {
    const titleCapitalized = profile.titlePattern[0].charAt(0).toUpperCase() + profile.titlePattern[0].slice(1);
    
    // Check if protocol already exists
    const exists = protocols.some(p => p.badHabitTitle.toLowerCase().includes(profile.titlePattern[0]));
    if (!exists) {
      addProtocol({
        badHabitTitle: `${titleCapitalized} Compulsion`,
        category: profile.category,
        explanation: profile.underlyingWhy,
        habitLoop: profile.habitLoop,
        implementationIntention: {
          trigger: `When I notice the cue: "${profile.habitLoop.cue}"`,
          action: profile.replacementAction,
        },
        frictionTactic: profile.frictionTactic,
        rewardAlternative: 'Mental clarity, unbroken self-trust, and biological vitality.',
      });
    }
    setActiveTab('strategies');
  };

  return (
    <div className="space-y-6">
      {/* Lab Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                BEHAVIORAL SCIENCE LAB
              </span>
              <span className="text-xs text-indigo-300">Habit Loop Deconstruction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Deconstruct & Categorize "Bad" Habits
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every counter-productive behavior is an attempt by your nervous system to solve an immediate problem (boredom, anxiety, fatigue). 
              By exposing the 4-step habit loop, you replace automatic compulsions with conscious mastery.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center shrink-0">
            <span className="text-xs text-indigo-300 block">The Golden Rule of Habits</span>
            <span className="text-sm font-bold text-white mt-1 block">
              "Never eliminate a bad habit. <br/><span className="text-amber-300">Replace the routine</span>."
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Deconstruct Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProfiles.map((profile, idx) => {
          const isExpanded = expandedIndex === idx;
          const mainTitle = profile.titlePattern.slice(0, 2).map(s => s.toUpperCase()).join(' / ');

          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden"
            >
              {/* Card Top */}
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full">
                      Counter-Productive Pattern
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Category: {profile.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {profile.constructiveGuidance.headline} ({mainTitle})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                    {profile.underlyingWhy}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCreateProtocolFromProfile(profile)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-xs"
                  >
                    <span>Adopt Replacement Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4-Step Habit Loop Diagram */}
              <div className="p-6 bg-slate-50/50 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                  <Repeat className="w-4 h-4 text-indigo-600" />
                  <span>The 4-Step Habit Loop Anatomy:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* Step 1: Cue */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
                      1. The Cue (Trigger)
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-snug">
                      {profile.habitLoop.cue}
                    </p>
                  </div>

                  {/* Step 2: Craving */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="text-[10px] font-black uppercase text-rose-600 tracking-wider">
                      2. The Craving
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-snug">
                      {profile.habitLoop.craving}
                    </p>
                  </div>

                  {/* Step 3: Routine */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">
                      3. The Bad Routine
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-snug">
                      {profile.habitLoop.routine}
                    </p>
                  </div>

                  {/* Step 4: Reward */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                      4. The Illusory Reward
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-snug">
                      {profile.habitLoop.reward}
                    </p>
                  </div>
                </div>

                {/* Strategy Box: Friction & Replacement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-extrabold text-amber-900 uppercase block">
                      🛡️ Friction Tactic (Make It Difficult):
                    </span>
                    <p className="text-xs text-amber-950/90 leading-relaxed">
                      {profile.frictionTactic}
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-extrabold text-emerald-900 uppercase block">
                      🌱 Productive Replacement (Make It Satisfying):
                    </span>
                    <p className="text-xs text-emerald-950/90 leading-relaxed">
                      {profile.replacementAction}
                    </p>
                  </div>
                </div>

                {/* Affirmation Quote */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs italic text-slate-600 flex items-center justify-between">
                  <span>{profile.constructiveGuidance.quote}</span>
                  <span className="font-semibold text-emerald-700 not-italic shrink-0 ml-4">
                    {profile.constructiveGuidance.affirmation}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
