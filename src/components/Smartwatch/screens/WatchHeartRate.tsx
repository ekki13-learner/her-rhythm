import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Heart, Activity, ArrowLeft } from 'lucide-react';

export const WatchHeartRate: React.FC = () => {
  const { telemetry, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none bg-gradient-to-b from-slate-950 via-navy-950 to-slate-950 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-roseHealth-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-roseHealth-500 animate-ping" />
          Live ECG
        </span>
      </div>

      {/* Main BPM */}
      <div className="text-center my-1">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-roseHealth-500/20 border border-roseHealth-500/30 text-roseHealth-400 mb-1">
          <Heart className="w-5 h-5 fill-roseHealth-500/60 animate-heartbeat" />
        </div>
        <div className="text-3xl font-black font-mono tracking-tight text-white flex items-baseline justify-center gap-1">
          {telemetry.heartRate.bpm} <span className="text-xs text-roseHealth-400 font-semibold">BPM</span>
        </div>
        <div className="text-[10px] text-slate-400">Resting 62 • Zone: Resting Optimal</div>
      </div>

      {/* Animated ECG Waveform */}
      <div className="relative h-12 w-full bg-slate-900/80 rounded-lg border border-slate-800 p-1 flex items-center overflow-hidden">
        <svg viewBox="0 0 200 40" className="w-full h-full stroke-roseHealth-400 fill-none" strokeWidth="2">
          <path
            d="M 0,20 L 25,20 L 30,12 L 35,28 L 40,20 L 55,20 L 60,4 L 65,36 L 70,16 L 75,22 L 80,20 L 105,20 L 110,10 L 115,28 L 120,20 L 140,20 L 145,2 L 150,38 L 155,18 L 160,20 L 200,20"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Range Bar */}
      <div className="grid grid-cols-2 gap-1.5 text-center pt-1 border-t border-slate-800 text-[10px]">
        <div className="bg-slate-900/60 p-1 rounded-md border border-slate-800">
          <div className="text-slate-400">Min Today</div>
          <div className="font-bold text-teal-400 font-mono">54 BPM</div>
        </div>
        <div className="bg-slate-900/60 p-1 rounded-md border border-slate-800">
          <div className="text-slate-400">Peak Today</div>
          <div className="font-bold text-amber-400 font-mono">138 BPM</div>
        </div>
      </div>
    </div>
  );
};
