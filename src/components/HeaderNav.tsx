import React from 'react';
import { useHabit } from '../context/HabitContext';
import { 
  Sparkles, 
  BookOpen, 
  Microscope, 
  ShieldCheck, 
  Bell, 
  BarChart3, 
  Plus, 
  Volume2, 
  VolumeX, 
  Flame, 
  Compass,
  Heart
} from 'lucide-react';

interface HeaderNavProps {
  onOpenLogModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenLogModal }) => {
  const { activeTab, setActiveTab, soundEnabled, setSoundEnabled, stats } = useHabit();

  const navItems = [
    { id: 'journal', label: 'Activity Journal', icon: BookOpen },
    { id: 'deconstruct_lab', label: 'Bad Habit Lab', icon: Microscope },
    { id: 'strategies', label: 'Strategy & Protocols', icon: ShieldCheck },
    { id: 'reminders', label: 'Smart Reminders', icon: Bell },
    { id: 'analytics', label: 'Growth Insights', icon: BarChart3 },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Inspiring Notification Strip */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> DAILY AFFIRMATION
            </span>
            <span className="hidden sm:inline">
              “Every action you take is a vote for the type of person you wish to become.”
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-black/20 px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{stats.streakDays} Day Mindful Streak</span>
            </div>
            <div className="text-[11px] bg-emerald-500/30 px-2 py-0.5 rounded font-semibold hidden md:block">
              {stats.productivePercentage}% Productive Ratio
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Habit<span className="text-emerald-600">Morph</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Mindful Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Identify Activities • Deconstruct Bad Habits • Cultivate Productivity
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <button
              onClick={onOpenLogModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Log Activity</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/70 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
