import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Sparkles,
  Droplet,
  Smile,
  AlertCircle,
  TrendingUp,
  Info,
  Check,
  Save,
} from 'lucide-react';

const SYMPTOM_LIST = [
  'Cramps',
  'Headache',
  'Bloating',
  'Backache',
  'Breast tenderness',
  'Fatigue',
  'Nausea',
  'Mood changes',
  'Insomnia',
  'Pelvic heaviness',
];

const MOOD_OPTIONS = [
  { label: 'Happy', emoji: '😊', desc: 'Positive & Content' },
  { label: 'Energetic', emoji: '⚡', desc: 'Dynamic & Focused' },
  { label: 'Calm', emoji: '😌', desc: 'Relaxed & Centered' },
  { label: 'Anxious', emoji: '😰', desc: 'Restless or Uneasy' },
  { label: 'Moody', emoji: '😐', desc: 'Fluctuating Sensations' },
  { label: 'Tired', emoji: '😴', desc: 'Low Stamina' },
  { label: 'Irritated', emoji: '😠', desc: 'Heightened Sensitivity' },
];

export const WomensHealth: React.FC = () => {
  const {
    cycleDay,
    setCycleDay,
    currentDayLog,
    loggedFlow,
    setLoggedFlow,
    loggedSymptoms,
    toggleSymptom,
    loggedMood,
    setLoggedMood,
    saveDayLog,
    cycleData,
    setWatchScreen,
  } = useApp();

  const [noteText, setNoteText] = useState(currentDayLog.notes || '');
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    saveDayLog(noteText);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Phase colors
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Menstrual':
        return 'border-roseHealth-500 bg-roseHealth-500/20 text-roseHealth-300';
      case 'Follicular':
        return 'border-purple-500 bg-purple-500/20 text-purple-300';
      case 'Ovulatory':
        return 'border-amber-400 bg-amber-400/20 text-amber-300';
      case 'Luteal':
        return 'border-indigo-500 bg-indigo-500/20 text-indigo-300';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <section id="womens-health" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-roseHealth-500/10 border border-roseHealth-500/20 text-roseHealth-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Calendar className="w-3.5 h-3.5" />
          Hormonal Intelligence
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Health that understands{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-roseHealth-400 via-purple-300 to-lavender-400">
            her cycle.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Traditional trackers view health in isolated 24-hour fragments. HerRhythm places cardiovascular telemetry, skin temperature, sleep quality, and workouts inside the context of your natural 28-day infradian rhythm.
        </p>
      </div>

      {/* Main Cycle Dial & Interactive Day Picker */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 mb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Circular Phase Wheel Indicator */}
          <div className="relative flex flex-col items-center justify-center w-64 h-64 flex-shrink-0">
            {/* Outer Infradian ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-slate-800 fill-none"
                strokeWidth="16"
              />
              {/* Menstrual Phase (Days 1-5, ~18%) */}
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-roseHealth-500 fill-none"
                strokeWidth="16"
                strokeDasharray="690"
                strokeDashoffset="565"
              />
              {/* Follicular Phase (Days 6-12, ~25%) */}
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-purple-500 fill-none"
                strokeWidth="16"
                strokeDasharray="690"
                strokeDashoffset="392"
                style={{ transformOrigin: 'center', transform: 'rotate(64deg)' }}
              />
              {/* Ovulation Phase (Days 13-16, ~14%) */}
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-amber-400 fill-none"
                strokeWidth="16"
                strokeDasharray="690"
                strokeDashoffset="593"
                style={{ transformOrigin: 'center', transform: 'rotate(154deg)' }}
              />
              {/* Luteal Phase (Days 17-28, ~43%) */}
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-indigo-400 fill-none"
                strokeWidth="16"
                strokeDasharray="690"
                strokeDashoffset="393"
                style={{ transformOrigin: 'center', transform: 'rotate(205deg)' }}
              />
            </svg>

            {/* Inner Center Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
                Cycle Day
              </span>
              <span className="text-5xl font-black font-mono text-white tracking-tight">
                {cycleDay}
              </span>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-800/60 mt-1">
                {currentDayLog.phase}
              </span>
            </div>
          </div>

          {/* 28-Day Interactive Day Clicker Matrix */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">28-Day Infradian Calendar</h3>
                <p className="text-xs text-slate-400">Click any day to inspect and simulate symptoms, flow, and biological phase logs.</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-roseHealth-500" /> Menstrual</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Follicular</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Ovulation</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Luteal</span>
              </div>
            </div>

            {/* Days Grid 1-28 */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                const dayInfo = cycleData[day];
                const isSelected = cycleDay === day;
                const phaseCls = getPhaseColor(dayInfo.phase);

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setCycleDay(day);
                      setNoteText(dayInfo.notes || '');
                    }}
                    className={`h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                      isSelected
                        ? 'border-2 border-white ring-2 ring-purple-400 shadow-glow-lavender scale-105 z-10 bg-purple-600 text-white'
                        : `border ${phaseCls} hover:scale-102 hover:brightness-125`
                    }`}
                  >
                    <span className="font-mono text-sm">{day}</span>
                    <span className="text-[9px] font-normal truncate opacity-80 max-w-[40px]">
                      {dayInfo.flow !== 'none' ? `${dayInfo.flow}` : dayInfo.phase.slice(0, 3)}
                    </span>
                    {day === 14 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" title="Estimated Ovulation" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Selected Day {cycleDay}: <strong className="text-white">{currentDayLog.phase} Phase</strong> • Basal Skin Temp ~{currentDayLog.basalTemp}°C
              </span>
              <button
                onClick={() => setWatchScreen('cycle')}
                className="text-purple-300 font-semibold hover:underline"
              >
                Inspect on Watch →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Logging Section: Flow, Symptoms, Mood & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 1. Menstrual Flow Tracker */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-roseHealth-400 mb-3">
              <Droplet className="w-5 h-5 fill-roseHealth-500/40" />
              <h3 className="text-base font-bold text-white">Menstrual Flow Tracking</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Log today's flow intensity to dynamically calibrate metabolic estimates.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {(['none', 'light', 'moderate', 'heavy'] as const).map((flowOption) => {
                const isActive = loggedFlow === flowOption;
                return (
                  <button
                    key={flowOption}
                    onClick={() => setLoggedFlow(flowOption)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-roseHealth-500 text-white shadow-glow-rose border border-roseHealth-400'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{flowOption}</span>
                    {isActive && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Currently logged: <strong className="text-roseHealth-300 uppercase">{loggedFlow}</strong>
          </div>
        </div>

        {/* 2. Symptom Tracking Chips */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-300 mb-3">
              <AlertCircle className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white">Symptom Tracking</h3>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Select any bodily sensations you're feeling today:
            </p>

            <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1">
              {SYMPTOM_LIST.map((sym) => {
                const isSelected = loggedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    onClick={() => toggleSymptom(sym)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white border border-purple-400 shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {sym} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
            <span>{loggedSymptoms.length} active symptoms logged</span>
          </div>
        </div>

        {/* 3. Mood Tracking */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-300 mb-3">
              <Smile className="w-5 h-5 text-teal-400" />
              <h3 className="text-base font-bold text-white">Mood & Neuro-Resilience</h3>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Track neurochemical shifts corresponding to progesterone/estrogen:
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
              {MOOD_OPTIONS.map((m) => {
                const isCurrent = loggedMood === m.label;
                return (
                  <button
                    key={m.label}
                    onClick={() => setLoggedMood(m.label)}
                    className={`p-2 rounded-xl text-left text-xs font-medium transition-all flex items-center gap-2 ${
                      isCurrent
                        ? 'bg-teal-500/30 text-teal-100 border border-teal-400 shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <div className="truncate">
                      <div className="font-bold">{m.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
            <span>Active Mood: <strong className="text-teal-300">{loggedMood}</strong></span>
          </div>
        </div>
      </div>

      {/* Cycle Notes & Save Action Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-2/3">
          <label className="text-xs font-semibold text-slate-300 mb-1 block">
            Personal Health Notes for Day {cycleDay} ({currentDayLog.phase})
          </label>
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="e.g., Felt great energy during afternoon run, slight cramping after dinner..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {saveToast && (
            <span className="text-xs text-teal-400 font-semibold animate-pulse">
              ✓ Day {cycleDay} Log Synced!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-roseHealth-500 hover:from-purple-500 hover:to-roseHealth-400 text-white font-bold text-sm flex items-center gap-2 shadow-glow-lavender transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Today's Log</span>
          </button>
        </div>
      </div>

      {/* Mandatory Non-Diagnostic Disclaimer */}
      <div className="mt-6 flex items-start gap-2.5 p-4 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs text-slate-400">
        <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Wellness Information Disclaimer:</strong> HerRhythm calculates menstrual cycle phases, basal temperature shifts, and symptoms using biometric estimation models. Menstrual cycle lengths and ovulatory days naturally vary. These insights are intended for fitness and general wellness tracking only, and are not designed for contraception or medical diagnoses.
        </p>
      </div>
    </section>
  );
};
