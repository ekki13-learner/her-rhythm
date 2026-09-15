import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Zap, ArrowLeft, BatteryCharging } from 'lucide-react';

export const WatchEnergy: React.FC = () => {
  const { telemetry, cycleDay, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400 flex items-center gap-1">
          <Zap className="w-3 h-3 fill-amber-400" />
          Energy Reserve
        </span>
      </div>

      <div className="text-center my-0.5">
        <div className="text-4xl font-black font-mono tracking-tight text-white flex items-baseline justify-center gap-1">
          {telemetry.energy.percentage}<span className="text-lg text-amber-400 font-bold">%</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-0.5 text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60">
          <BatteryCharging className="w-3 h-3 text-amber-400" />
          <span>{telemetry.energy.status} Readiness</span>
        </div>
      </div>

      <div className="bg-slate-900/80 rounded-lg border border-slate-800 p-2 text-[10px] space-y-1">
        <div className="text-slate-300 font-medium">Infradian Dynamic:</div>
        <p className="text-[9px] text-slate-400 leading-tight">
          Day {cycleDay} peak estrogen surge. Muscular glycogen synthesis is at maximum weekly efficiency.
        </p>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Calculated from sleep depth, HRV & cycle phase
      </div>
    </div>
  );
};
