import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Check } from 'lucide-react';

const SYMPTOM_OPTIONS = [
  'Cramps',
  'Headache',
  'Bloating',
  'Backache',
  'Breast tenderness',
  'Fatigue',
];

export const WatchSymptoms: React.FC = () => {
  const { loggedSymptoms, toggleSymptom, setWatchScreen } = useApp();

  return (
    <div className="h-full flex flex-col justify-between p-2.5 select-none bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('cycle')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-300">
          Log Symptoms
        </span>
      </div>

      <div className="my-1 overflow-y-auto max-h-[140px] pr-1 space-y-1">
        {SYMPTOM_OPTIONS.map((sym) => {
          const isActive = loggedSymptoms.includes(sym);
          return (
            <button
              key={sym}
              onClick={() => toggleSymptom(sym)}
              className={`w-full flex items-center justify-between p-1.5 rounded-lg text-[10px] font-medium transition-all ${
                isActive
                  ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50 shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{sym}</span>
              {isActive && <Check className="w-3 h-3 text-purple-300" />}
            </button>
          );
        })}
      </div>

      <div className="text-[9px] text-center text-slate-400 pt-1 border-t border-slate-800 flex justify-between items-center">
        <span>{loggedSymptoms.length} logged</span>
        <button
          onClick={() => setWatchScreen('cycle')}
          className="text-purple-400 font-semibold hover:underline"
        >
          Done
        </button>
      </div>
    </div>
  );
};
