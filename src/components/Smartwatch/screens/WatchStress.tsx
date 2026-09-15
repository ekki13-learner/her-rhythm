import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Brain, ArrowLeft, Smile } from 'lucide-react';

export const WatchStress: React.FC = () => {
  const { telemetry, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-navy-900 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-400">
          Stress Score
        </span>
      </div>

      <div className="text-center my-1">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-400 mb-1">
          <Brain className="w-5 h-5 animate-pulse" />
        </div>
        <div className="text-4xl font-black font-mono tracking-tight text-white flex items-baseline justify-center gap-1">
          {telemetry.stress.score}<span className="text-xs text-slate-400 font-normal">/100</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-1 text-[10px] text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-800/60">
          <Smile className="w-3 h-3 text-teal-400" />
          <span>{telemetry.stress.level} Status</span>
        </div>
      </div>

      {/* Mini Stress Bar Distribution */}
      <div className="bg-slate-900/80 rounded-lg border border-slate-800 p-2 text-[10px] space-y-1.5">
        <div className="flex justify-between text-slate-400">
          <span>Today's Stress Graph</span>
          <span className="text-teal-400 font-mono">HRV 68ms</span>
        </div>
        <div className="flex items-end gap-1 h-8 px-1">
          {[25, 30, 28, 45, 38, 32, 29, 35, 32].map((val, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-teal-500 to-indigo-400 rounded-2xs transition-all"
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Continuous Autonomic HRV analysis
      </div>
    </div>
  );
};
