import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Sparkles, ArrowLeft, Calendar } from 'lucide-react';

export const WatchCycle: React.FC = () => {
  const { cycleDay, currentDayLog, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-purple-950/40 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-300">
          Infradian Cycle
        </span>
      </div>

      <div className="text-center my-0.5">
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-purple-500/30 bg-purple-950/40 mb-1">
          {/* Subtle ring progress */}
          <div className="text-center">
            <span className="text-[9px] uppercase font-bold text-purple-400 block -mb-1">DAY</span>
            <span className="text-2xl font-black font-mono text-white">{cycleDay}</span>
            <span className="text-[8px] text-slate-400 block -mt-1">/ 28</span>
          </div>
        </div>

        <div className="text-xs font-bold text-purple-200">
          {currentDayLog.phase} Phase
        </div>
        <div className="text-[10px] text-slate-400">Next period estimated in 14 days</div>
      </div>

      {/* Quick Action buttons */}
      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
        <button
          onClick={() => setWatchScreen('symptoms')}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-left transition-colors"
        >
          <div className="text-[9px] text-slate-400">Log Symptoms</div>
          <div className="font-semibold text-purple-300">Tap to edit →</div>
        </button>
        <button
          onClick={() => setWatchScreen('mood')}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-left transition-colors"
        >
          <div className="text-[9px] text-slate-400">Current Mood</div>
          <div className="font-semibold text-teal-300">{currentDayLog.mood} →</div>
        </button>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Cycle estimation based on basal skin temp & logs
      </div>
    </div>
  );
};
