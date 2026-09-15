import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Moon, ArrowLeft, Sparkles } from 'lucide-react';

export const WatchSleep: React.FC = () => {
  const { telemetry, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-400 flex items-center gap-1">
          <Moon className="w-3 h-3" />
          Sleep Lab
        </span>
      </div>

      <div className="text-center my-0.5">
        <div className="text-3xl font-black font-mono tracking-tight text-white flex items-baseline justify-center gap-1">
          7<span className="text-xs text-indigo-300 font-semibold">H</span> 42<span className="text-xs text-indigo-300 font-semibold">M</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-0.5 text-[10px] text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800/60">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Sleep Score: {telemetry.sleep.score}/100</span>
        </div>
      </div>

      {/* Sleep Stages Pill Breakdown */}
      <div className="bg-slate-900/80 rounded-lg border border-slate-800 p-2 text-[10px] space-y-1.5">
        <div className="flex justify-between text-slate-400">
          <span>Stage Distribution</span>
          <span className="text-teal-400 font-mono">92% Eff.</span>
        </div>

        {/* Stacked bar */}
        <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
          <div className="bg-purple-600 h-full" style={{ width: '23%' }} title="Deep" />
          <div className="bg-indigo-400 h-full" style={{ width: '25%' }} title="REM" />
          <div className="bg-teal-500 h-full" style={{ width: '52%' }} title="Light" />
        </div>

        <div className="grid grid-cols-3 gap-1 text-center text-[9px] pt-0.5">
          <div className="text-purple-300">
            <span className="block font-bold">1h 45m</span>
            <span className="text-slate-500">Deep</span>
          </div>
          <div className="text-indigo-300">
            <span className="block font-bold">1h 55m</span>
            <span className="text-slate-500">REM</span>
          </div>
          <div className="text-teal-300">
            <span className="block font-bold">4h 02m</span>
            <span className="text-slate-500">Light</span>
          </div>
        </div>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Infradian REM & thermoregulation synced
      </div>
    </div>
  );
};
