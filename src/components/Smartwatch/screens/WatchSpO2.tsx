import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Wind, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const WatchSpO2: React.FC = () => {
  const { telemetry, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-teal-950/40 to-slate-950 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-400">
          Pulse Oximetry
        </span>
      </div>

      {/* SpO2 Main percentage */}
      <div className="text-center my-1">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-400 mb-1">
          <Wind className="w-5 h-5 animate-pulse" />
        </div>
        <div className="text-4xl font-black font-mono tracking-tight text-white flex items-baseline justify-center gap-1">
          {telemetry.spo2.percent}<span className="text-lg text-teal-400 font-bold">%</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-1 text-[10px] text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-800/60">
          <CheckCircle2 className="w-3 h-3 text-teal-400" />
          <span>Optimal Oxygenation</span>
        </div>
      </div>

      {/* Simulated Oxygen Waveform */}
      <div className="relative h-12 w-full bg-slate-900/80 rounded-lg border border-teal-900/40 p-1 flex items-center overflow-hidden">
        <svg viewBox="0 0 200 40" className="w-full h-full stroke-teal-400 fill-none" strokeWidth="2">
          <path
            d="M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20"
            className="animate-wave-flow"
          />
        </svg>
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800">
        Continuous photoplethysmography • Simulated sensor reading
      </div>
    </div>
  );
};
