import React from 'react';
import { useApp } from '../../../context/AppContext';
import { BatteryMedium, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const WatchRecovery: React.FC = () => {
  const { telemetry, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-teal-950/30 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-300 flex items-center gap-1">
          <BatteryMedium className="w-3 h-3" />
          Recovery
        </span>
      </div>

      <div className="text-center my-0.5">
        <div className="text-4xl font-black font-mono tracking-tight text-white flex items-baseline justify-center gap-1">
          {telemetry.recovery.score}<span className="text-lg text-teal-400 font-bold">%</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-0.5 text-[10px] text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-800/60">
          <CheckCircle2 className="w-3 h-3 text-teal-400" />
          <span>{telemetry.recovery.status} Recovery</span>
        </div>
      </div>

      <div className="bg-slate-900/80 rounded-lg border border-slate-800 p-2 text-[10px] space-y-1">
        <div className="flex justify-between text-slate-300">
          <span>Autonomic Balance:</span>
          <span className="font-mono text-teal-300 font-semibold">+14% HRV</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Strain Threshold:</span>
          <span className="text-slate-400">High Capacity</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: `${telemetry.recovery.score}%` }} />
        </div>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Overnight biometrics vs 30-day baseline
      </div>
    </div>
  );
};
