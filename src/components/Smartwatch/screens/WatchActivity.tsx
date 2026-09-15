import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Footprints, Flame, Timer, ArrowLeft } from 'lucide-react';

export const WatchActivity: React.FC = () => {
  const { telemetry, setWatchScreen } = useApp();
  const stepPercent = Math.min(100, Math.round((telemetry.activity.steps / telemetry.activity.goalSteps) * 100));

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-400">
          Daily Movement
        </span>
      </div>

      {/* Main Steps */}
      <div className="text-center my-0.5">
        <div className="text-3xl font-black font-mono tracking-tight text-white">
          {telemetry.activity.steps.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400">Goal: {telemetry.activity.goalSteps.toLocaleString()} steps ({stepPercent}%)</div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all" style={{ width: `${stepPercent}%` }} />
        </div>
      </div>

      {/* Triple Ring / Sub-metrics */}
      <div className="grid grid-cols-3 gap-1.5 text-center text-[9px]">
        <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
          <div className="text-roseHealth-400 flex items-center justify-center mb-0.5">
            <Flame className="w-3 h-3" />
          </div>
          <div className="font-bold text-white font-mono text-[10px]">{telemetry.activity.caloriesKcal}</div>
          <div className="text-slate-400">Kcal</div>
        </div>

        <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
          <div className="text-teal-400 flex items-center justify-center mb-0.5">
            <Footprints className="w-3 h-3" />
          </div>
          <div className="font-bold text-white font-mono text-[10px]">{telemetry.activity.distanceKm}</div>
          <div className="text-slate-400">km</div>
        </div>

        <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
          <div className="text-purple-400 flex items-center justify-center mb-0.5">
            <Timer className="w-3 h-3" />
          </div>
          <div className="font-bold text-white font-mono text-[10px]">{telemetry.activity.activeMinutes}</div>
          <div className="text-slate-400">Active M</div>
        </div>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Cycle-adapted calorie baseline
      </div>
    </div>
  );
};
