import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Droplet, ArrowLeft, Plus } from 'lucide-react';

export const WatchHydration: React.FC = () => {
  const { telemetry, addHydration, setWatchScreen } = useApp();
  const currentL = (telemetry.hydration.currentMl / 1000).toFixed(2);
  const goalL = (telemetry.hydration.goalMl / 1000).toFixed(1);
  const percent = Math.min(100, Math.round((telemetry.hydration.currentMl / telemetry.hydration.goalMl) * 100));

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-cyan-950/30 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1">
          <Droplet className="w-3 h-3 fill-cyan-400/50" />
          Hydration
        </span>
      </div>

      <div className="text-center my-0.5">
        <div className="text-3xl font-black font-mono tracking-tight text-white">
          {currentL} <span className="text-sm font-semibold text-cyan-300">/ {goalL} L</span>
        </div>
        <div className="text-[10px] text-slate-400">{percent}% of daily target achieved</div>

        {/* Liquid level fill bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mt-1.5 overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Interactive Drink Logger Button */}
      <button
        onClick={() => addHydration(250)}
        className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-900/40 active:scale-95 transition-all"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Log +250 ml Glass</span>
      </button>

      <div className="text-[9px] text-center text-slate-400 pt-0.5 border-t border-slate-800">
        Tap button to log water intake
      </div>
    </div>
  );
};
