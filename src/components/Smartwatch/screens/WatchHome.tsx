import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Heart, Flame, Footprints, Battery, Wifi, Sparkles, Shield, Moon } from 'lucide-react';

export const WatchHome: React.FC = () => {
  const { telemetry, cycleDay, currentDayLog, setWatchScreen, batteryLevel } = useApp();

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="h-full flex flex-col justify-between p-3.5 select-none bg-gradient-to-b from-navy-950 via-slate-950 to-navy-900 text-white">
      {/* Top micro bar */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
        <div className="flex items-center gap-1 text-teal-400">
          <Wifi className="w-3 h-3 animate-pulse" />
          <span className="text-[10px] tracking-wider uppercase font-mono">HR-LINK</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-300 font-mono">{batteryLevel}%</span>
          <div className="w-5 h-2.5 rounded-sm border border-slate-500 flex items-center p-0.5">
            <div className="h-full bg-teal-400 rounded-2xs" style={{ width: `${batteryLevel}%` }} />
          </div>
        </div>
      </div>

      {/* Main Clock Face */}
      <div className="text-center my-auto">
        <span className="text-[11px] tracking-widest uppercase font-semibold text-lavender-300 block mb-0.5">
          {currentDate}
        </span>
        <div className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-lavender-200 font-mono leading-none">
          {currentTime}
        </div>
        <button
          onClick={() => setWatchScreen('cycle')}
          className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-semibold text-purple-200 hover:bg-purple-500/30 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-roseHealth-400 animate-ping" />
          DAY {cycleDay} • {currentDayLog.phase.toUpperCase()}
        </button>
      </div>

      {/* Metric Tiles Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {/* Heart Rate Tile */}
        <button
          onClick={() => setWatchScreen('heart')}
          className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-roseHealth-500/40 transition-all text-left group"
        >
          <div className="w-7 h-7 rounded-lg bg-roseHealth-500/20 border border-roseHealth-500/30 flex items-center justify-center text-roseHealth-400 group-hover:scale-105 transition-transform">
            <Heart className="w-3.5 h-3.5 fill-roseHealth-500/50 animate-heartbeat" />
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-medium">Heart</div>
            <div className="text-xs font-bold text-white font-mono flex items-baseline gap-0.5">
              {telemetry.heartRate.bpm} <span className="text-[9px] text-slate-400 font-normal">BPM</span>
            </div>
          </div>
        </button>

        {/* Steps / Activity Tile */}
        <button
          onClick={() => setWatchScreen('activity')}
          className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all text-left group"
        >
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
            <Footprints className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-medium">Steps</div>
            <div className="text-xs font-bold text-white font-mono">
              {telemetry.activity.steps.toLocaleString()}
            </div>
          </div>
        </button>
      </div>

      {/* Quick App Dock at Bottom */}
      <div className="flex items-center justify-around pt-1 border-t border-slate-800/80">
        <button
          onClick={() => setWatchScreen('nyra')}
          title="NYRA AI"
          className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-500/20 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
        </button>
        <button
          onClick={() => setWatchScreen('sleep')}
          title="Sleep"
          className="p-1.5 rounded-lg text-indigo-300 hover:bg-indigo-500/20 transition-colors"
        >
          <Moon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setWatchScreen('safety')}
          title="Emergency Safety"
          className="p-1.5 rounded-lg text-roseHealth-400 hover:bg-roseHealth-500/20 transition-colors"
        >
          <Shield className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
