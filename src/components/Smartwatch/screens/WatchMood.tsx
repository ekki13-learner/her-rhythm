import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft } from 'lucide-react';

const MOODS = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Energetic', emoji: '⚡' },
  { label: 'Calm', emoji: '😌' },
  { label: 'Anxious', emoji: '😰' },
  { label: 'Moody', emoji: '😐' },
  { label: 'Tired', emoji: '😴' },
  { label: 'Irritated', emoji: '😠' },
];

export const WatchMood: React.FC = () => {
  const { loggedMood, setLoggedMood, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-2.5 select-none bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('cycle')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-300">
          How are you feeling?
        </span>
      </div>

      {/* Mood chips grid */}
      <div className="grid grid-cols-2 gap-1.5 my-1 overflow-y-auto max-h-[140px] pr-0.5">
        {MOODS.map((m) => {
          const isSelected = loggedMood === m.label;
          return (
            <button
              key={m.label}
              onClick={() => setLoggedMood(m.label)}
              className={`flex items-center gap-1.5 p-1.5 rounded-lg text-[10px] font-medium transition-all ${
                isSelected
                  ? 'bg-teal-500/30 text-teal-200 border border-teal-400/50 shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-sm">{m.emoji}</span>
              <span className="truncate">{m.label}</span>
            </button>
          );
        })}
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800 flex justify-between items-center">
        <span>Logged: <strong className="text-teal-300">{loggedMood}</strong></span>
        <button
          onClick={() => setWatchScreen('cycle')}
          className="text-teal-400 font-semibold hover:underline"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
