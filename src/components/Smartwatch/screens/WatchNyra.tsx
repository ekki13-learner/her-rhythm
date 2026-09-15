import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Sparkles, ArrowLeft, Mic, Send } from 'lucide-react';

export const WatchNyra: React.FC = () => {
  const { cycleDay, currentDayLog, telemetry, setWatchScreen, sendNyraMessage } = useApp();
  const [prompt, setPrompt] = useState('');

  const handleAsk = (text: string) => {
    sendNyraMessage(text, 'Watch Voice Input');
    // Scroll smoothly to Nyra section on the webpage if desired or show confirmation
  };

  return (
    <div className="h-full flex flex-col justify-between p-2.5 select-none bg-gradient-to-b from-slate-950 via-purple-950/40 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
          NYRA AI
        </span>
      </div>

      {/* Pulsing AI Orb and Brief Insight */}
      <div className="text-center my-0.5 px-1">
        <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 mb-1 shadow-glow-lavender">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="text-[10px] text-purple-200 font-semibold mb-0.5">
          Day {cycleDay} • {currentDayLog.phase}
        </div>
        <p className="text-[9px] text-slate-300 leading-tight bg-purple-950/60 p-1.5 rounded-lg border border-purple-800/40 text-left">
          "Your readiness is at {telemetry.recovery.score}%. Estrogen is peaking today—a prime window for personal bests in strength or endurance."
        </p>
      </div>

      {/* Quick Voice Question Tap */}
      <div className="space-y-1">
        <button
          onClick={() => handleAsk("What workout fits my energy today?")}
          className="w-full py-1.5 px-2 rounded-lg bg-slate-900 border border-purple-900/50 hover:border-purple-400/50 text-[9px] font-medium text-purple-200 flex items-center justify-between transition-colors"
        >
          <span className="truncate">"Best workout for today?"</span>
          <Mic className="w-3 h-3 text-purple-400 flex-shrink-0" />
        </button>
      </div>

      <div className="text-[8px] text-center text-slate-400 pt-0.5 border-t border-slate-800">
        AI companion • Non-diagnostic wellness guide
      </div>
    </div>
  );
};
