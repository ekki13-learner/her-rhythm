import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Thermometer, ArrowLeft, TrendingUp } from 'lucide-react';

export const WatchTemperature: React.FC = () => {
  const { telemetry, cycleDay, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-400">
          Skin Temp
        </span>
      </div>

      <div className="text-center my-1">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 mb-1">
          <Thermometer className="w-5 h-5 animate-pulse" />
        </div>
        <div className="text-4xl font-black font-mono tracking-tight text-white flex items-baseline justify-center gap-1">
          {telemetry.temperature.celsius.toFixed(1)}<span className="text-lg text-purple-300">°C</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-1 text-[10px] text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-800/60">
          <TrendingUp className="w-3 h-3 text-purple-400" />
          <span>{telemetry.temperature.trend}</span>
        </div>
      </div>

      <div className="bg-slate-900/80 rounded-lg border border-slate-800 p-2 text-[10px] space-y-1">
        <div className="flex justify-between text-slate-300">
          <span>Cycle Correlation:</span>
          <span className="font-semibold text-purple-300">Day {cycleDay} Window</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Baseline Shift:</span>
          <span className="font-mono text-teal-400">+{telemetry.temperature.baselineDiff}°C</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-400 to-purple-400 h-full rounded-full" style={{ width: '68%' }} />
        </div>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Dual-thermistor nocturnal monitoring • Sub-degree precision
      </div>
    </div>
  );
};
