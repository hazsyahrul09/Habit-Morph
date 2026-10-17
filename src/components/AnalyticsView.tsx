import React from 'react';
import { useHabit } from '../context/HabitContext';
import { 
  BarChart3, 
  Flame, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Heart, 
  TrendingUp, 
  Layers, 
  Brain,
  Zap,
  Clock
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { entries, stats, protocols } = useHabit();

  // Category counts
  const categoryCounts: Record<string, number> = {};
  entries.forEach((e) => {
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
  });

  const totalTimeProductive = entries
    .filter((e) => e.impact === 'productive')
    .reduce((sum, e) => sum + e.durationMinutes, 0);

  const totalTimeDrained = entries
    .filter((e) => e.impact === 'counterproductive')
    .reduce((sum, e) => sum + e.durationMinutes, 0);

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                GROWTH METRICS
              </span>
              <span className="text-xs text-indigo-300">Self-Awareness & Compounding Gains</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Habit & Productivity Insights
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Tracking is not about scoring an impossible 100%. It is about measuring clarity, noticing patterns, and celebrating every small victory.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/20 p-4 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-300">Conscious Streak</span>
              <div className="text-2xl font-black font-mono text-white">
                {stats.streakDays} Days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Productive Score */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Productive Ratio</span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {stats.productivePercentage}%
          </div>
          <p className="text-xs text-slate-500">
            {stats.productiveCount} of {stats.totalLogged} activities aligned with high-impact goals
          </p>
        </div>

        {/* Deep Focus Time */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Productive Focus Time</span>
          <div className="text-3xl font-black font-mono text-teal-700">
            {totalTimeProductive} <span className="text-base font-normal text-slate-500">mins</span>
          </div>
          <p className="text-xs text-slate-500">
            Dedicated to deep work, wellness, and deliberate growth
          </p>
        </div>

        {/* Deconstructed Bad Habits */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bad Habits Caught</span>
          <div className="text-3xl font-black font-mono text-rose-600">
            {stats.counterproductiveCount}
          </div>
          <p className="text-xs text-slate-500">
            Identified with root-cause feedback and replacement protocols
          </p>
        </div>

        {/* Mastered Protocols */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mastered Protocols</span>
          <div className="text-3xl font-black font-mono text-amber-500">
            {stats.protocolsMastered}
          </div>
          <p className="text-xs text-slate-500">
            Replacement strategies practiced 10+ times consistently
          </p>
        </div>
      </div>

      {/* Visual Activity Breakdown & Positive Reinforcement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Progress Distribution */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Habit Distribution & Balance</span>
          </h3>

          {/* Bar Ratio */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden flex">
              <div
                style={{ width: `${(stats.productiveCount / (stats.totalLogged || 1)) * 100}%` }}
                className="bg-emerald-500 h-full transition-all"
                title="Productive"
              />
              <div
                style={{ width: `${(stats.neutralCount / (stats.totalLogged || 1)) * 100}%` }}
                className="bg-amber-400 h-full transition-all"
                title="Neutral"
              />
              <div
                style={{ width: `${(stats.counterproductiveCount / (stats.totalLogged || 1)) * 100}%` }}
                className="bg-rose-400 h-full transition-all"
                title="Counter-Productive"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Productive ({stats.productiveCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Neutral ({stats.neutralCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                Counter-Prod ({stats.counterproductiveCount})
              </span>
            </div>
          </div>

          {/* Category List */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-700 block uppercase tracking-wide">
              Logged By Category:
            </span>
            <div className="space-y-2">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 capitalize">
                    {cat.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full"
                        style={{ width: `${(count / stats.totalLogged) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-slate-700 w-6 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Growth Affirmation & Positive Psychology Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50/50 p-6 rounded-3xl border border-emerald-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Growth Psychology & Self-Compassion</span>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-emerald-100 space-y-2">
            <blockquote className="text-xs italic text-slate-700 leading-relaxed">
              “Self-compassion is the secret sauce of habit change. When you treat slips with gentle curiosity rather than shame, your nervous system remains calm and ready to rebuild.”
            </blockquote>
            <span className="text-[11px] font-bold text-emerald-800 block">
              — Dr. Kristin Neff, Mindful Self-Compassion
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>100% Compassionate Framing:</strong> Zero judgment logged. Every bad habit was met with behavioral analysis and actionable pivots.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Momentum Over Perfection:</strong> Showing up 4 days in a row builds the identity of a conscious creator.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
