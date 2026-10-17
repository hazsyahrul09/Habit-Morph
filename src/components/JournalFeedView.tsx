import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import { HabitImpact, JournalEntry } from '../types/habit';
import { 
  Sparkles, 
  Trash2, 
  Clock, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Compass, 
  ArrowRight,
  Filter,
  Heart,
  Lightbulb,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface JournalFeedViewProps {
  onOpenLogModal: () => void;
}

export const JournalFeedView: React.FC<JournalFeedViewProps> = ({ onOpenLogModal }) => {
  const { entries, deleteJournalEntry, setActiveTab, stats } = useHabit();
  const [filterImpact, setFilterImpact] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = entries.filter((entry) => {
    const matchFilter = filterImpact === 'all' || entry.impact === filterImpact;
    const matchSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.notes && entry.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (entry.triggerCue && entry.triggerCue.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Daily Pulse Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                TODAY'S INTENTIONAL TIMELINE
              </span>
              <span className="text-xs text-emerald-200">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Habit & Activity Journal
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Track your day with honesty and radical self-compassion. Celebrate productive momentum and deconstruct counter-productive triggers without judgment.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs border border-white/20 p-3.5 rounded-2xl">
            <div className="text-center px-2">
              <span className="text-[10px] text-emerald-200 uppercase font-bold block">Productive</span>
              <span className="text-xl font-black font-mono text-emerald-300">
                {stats.productiveCount}
              </span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <span className="text-[10px] text-rose-200 uppercase font-bold block">Counter-Prod</span>
              <span className="text-xl font-black font-mono text-rose-300">
                {stats.counterproductiveCount}
              </span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <span className="text-[10px] text-amber-200 uppercase font-bold block">Growth Ratio</span>
              <span className="text-xl font-black font-mono text-amber-300">
                {stats.productivePercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Activities', count: entries.length },
            { id: 'productive', label: '✨ Productive', count: stats.productiveCount },
            { id: 'counterproductive', label: '⚠️ Counter-Productive', count: stats.counterproductiveCount },
            { id: 'neutral', label: '⚖️ Neutral', count: stats.neutralCount },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterImpact(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                filterImpact === f.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterImpact === f.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries, triggers, notes..."
            className="w-full text-xs px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>
      </div>

      {/* Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
            🌱
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Activities Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? 'Try modifying your search keywords or clearing filters.'
              : 'Start logging your activities to discover behavioral patterns and build productive habits.'}
          </p>
          <button
            onClick={onOpenLogModal}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Log Your First Activity
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredEntries.map((entry) => {
            const isProductive = entry.impact === 'productive';
            const isCounterproductive = entry.impact === 'counterproductive';

            return (
              <div
                key={entry.id}
                className={`bg-white rounded-3xl border transition-all duration-200 shadow-2xs hover:shadow-md overflow-hidden ${
                  isProductive
                    ? 'border-emerald-200/90'
                    : isCounterproductive
                    ? 'border-rose-200/90'
                    : 'border-slate-200'
                }`}
              >
                {/* Header Tag Bar */}
                <div
                  className={`px-5 py-3 flex items-center justify-between border-b ${
                    isProductive
                      ? 'bg-emerald-50/70 border-emerald-100 text-emerald-900'
                      : isCounterproductive
                      ? 'bg-rose-50/70 border-rose-100 text-rose-900'
                      : 'bg-slate-50 border-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        isProductive
                          ? 'bg-emerald-600 text-white'
                          : isCounterproductive
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-600 text-white'
                      }`}
                    >
                      {isProductive ? '✨ Productive Habit' : isCounterproductive ? '⚠️ Counter-Productive' : '⚖️ Neutral'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {entry.timestamp} • {entry.durationMinutes} mins
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-500" title={`Energy Level: ${entry.energyLevel}/5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Zap
                          key={i}
                          className={`w-3.5 h-3.5 ${i < entry.energyLevel ? 'fill-current' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => deleteJournalEntry(entry.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Entry Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {entry.title}
                    </h3>
                    {entry.notes && (
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {entry.notes}
                      </p>
                    )}
                  </div>

                  {/* Context & Triggers */}
                  {(entry.triggerCue || entry.moodBefore || entry.moodAfter) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                      {entry.triggerCue && (
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            Trigger / Cue Observed:
                          </span>
                          <span className="font-medium text-slate-700">{entry.triggerCue}</span>
                        </div>
                      )}
                      {(entry.moodBefore || entry.moodAfter) && (
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            Emotional Shift:
                          </span>
                          <span className="font-medium text-slate-700">
                            {entry.moodBefore || 'Baseline'} → {entry.moodAfter || 'Recorded'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feedback Card (The Heart of the requirement: Positive words for productive, constructive advice for bad) */}
                  {isProductive ? (
                    /* PRODUCTIVE AFFIRMATION & CELEBRATION CARD */
                    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 border border-emerald-200 rounded-2xl p-4 space-y-2.5">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-black tracking-wide uppercase">
                          {entry.feedback.headline}
                        </span>
                      </div>

                      <blockquote className="text-xs italic text-slate-700 border-l-2 border-emerald-500 pl-3 py-0.5">
                        {entry.feedback.quote}
                      </blockquote>

                      <div className="text-xs font-semibold text-emerald-900 bg-white/80 p-2.5 rounded-xl border border-emerald-200/80">
                        🌱 Affirmation: <span className="font-normal">{entry.feedback.affirmation}</span>
                      </div>

                      {entry.feedback.actionableTips && entry.feedback.actionableTips.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                            Momentum Compounding Tips:
                          </span>
                          <ul className="space-y-1">
                            {entry.feedback.actionableTips.map((tip, idx) => (
                              <li key={idx} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : isCounterproductive ? (
                    /* COUNTER-PRODUCTIVE EXPLANATION & CONSTRUCTIVE GUIDANCE CARD */
                    <div className="bg-gradient-to-r from-rose-50/90 via-amber-50/70 to-rose-100/50 border border-rose-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-rose-800">
                          <ShieldAlert className="w-4 h-4 text-rose-600" />
                          <span className="text-xs font-black tracking-wide uppercase">
                            Behavioral Deconstruction & Gentle Advice
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveTab('strategies')}
                          className="text-[11px] font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 hover:underline"
                        >
                          <span>Open Strategy Lab</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {entry.underlyingWhy && (
                        <div className="bg-white/90 p-3 rounded-xl border border-rose-200/70 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-rose-800 block">
                            Why this happened (The Neurological Trigger):
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {entry.underlyingWhy}
                          </p>
                        </div>
                      )}

                      <blockquote className="text-xs italic text-slate-700 border-l-2 border-rose-400 pl-3 py-0.5">
                        {entry.feedback.quote}
                      </blockquote>

                      <div className="text-xs font-semibold text-rose-950 bg-white/80 p-2.5 rounded-xl border border-rose-200/80">
                        Compassionate Reframe: <span className="font-normal">{entry.feedback.affirmation}</span>
                      </div>

                      {entry.feedback.actionableTips && entry.feedback.actionableTips.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                            3-Step Immediate Realignment:
                          </span>
                          <ul className="space-y-1.5">
                            {entry.feedback.actionableTips.map((tip, idx) => (
                              <li key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
