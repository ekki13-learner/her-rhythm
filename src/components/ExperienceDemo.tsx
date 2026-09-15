import React from 'react';
import { useApp } from '../context/AppContext';
import { WatchScreenId } from '../types';
import { SmartwatchHardware } from './Smartwatch/SmartwatchHardware';
import {
  Heart,
  Wind,
  Thermometer,
  Brain,
  Moon,
  Activity,
  Calendar,
  AlertCircle,
  Smile,
  Droplet,
  Zap,
  BatteryMedium,
  Sparkles,
  Shield,
  Home,
  Sliders,
  Play,
  RotateCcw,
} from 'lucide-react';

interface FeatureButtonItem {
  id: WatchScreenId;
  label: string;
  icon: React.ElementType;
  badge: string;
  explanation: string;
  hardwareDetail: string;
}

const DEMO_BUTTONS: FeatureButtonItem[] = [
  {
    id: 'home',
    label: 'Watch Home',
    icon: Home,
    badge: 'OLED Clock Face',
    explanation: 'The main ambient watch face displaying time, current date, real-time BPM, activity progress rings, and infradian cycle phase complication.',
    hardwareDetail: 'Touch-sensitive sapphire glass, haptic crown return',
  },
  {
    id: 'heart',
    label: 'Heart Rate',
    icon: Heart,
    badge: 'Live Waveform',
    explanation: 'Multichannel PPG sensor streaming real-time ECG waveform, resting heart rate (62 BPM), daily variance, and cardiovascular strain markers.',
    hardwareDetail: 'Sub-second optical green/infrared LED array',
  },
  {
    id: 'spo2',
    label: 'SpO₂ Blood Oxygen',
    icon: Wind,
    badge: 'Photoplethysmography',
    explanation: 'Reflective pulse oximetry monitoring blood oxygen saturation levels with animated wave tracking and nocturnal hypoxia alerts.',
    hardwareDetail: 'Dual red & infrared photodiode sensors',
  },
  {
    id: 'temp',
    label: 'Body Temperature',
    icon: Thermometer,
    badge: 'Biphasic Skin Temp',
    explanation: 'Sub-degree nocturnal skin temperature capturing biphasic thermal elevations that confirm ovulatory progesterone release.',
    hardwareDetail: 'Dual-sensor wrist + ambient temperature compensation',
  },
  {
    id: 'stress',
    label: 'Stress Score',
    icon: Brain,
    badge: 'HRV Autonomic Tone',
    explanation: 'Continuous analysis of sympathetic versus parasympathetic autonomic tone, scored 0-100 with on-wrist guided breathing cues.',
    hardwareDetail: 'Real-time RMSSD HRV frequency spectrum analysis',
  },
  {
    id: 'sleep',
    label: 'Sleep Lab',
    icon: Moon,
    badge: 'Architecture & REM',
    explanation: 'Hypnogram scoring deep sleep, REM cycles, and light rest with circadian thermoregulation correlation.',
    hardwareDetail: 'Tri-axial accelerometer + continuous PPG polysomnography',
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: Activity,
    badge: 'Movement & Burn',
    explanation: 'Track daily steps, distance, active minutes, and cycle-adjusted active calorie expenditure.',
    hardwareDetail: 'Custom low-power inertial measurement unit',
  },
  {
    id: 'cycle',
    label: 'Menstrual Cycle',
    icon: Calendar,
    badge: 'Infradian Ring',
    explanation: 'Infradian dial showing cycle day, follicular/luteal status, estimated ovulation, and upcoming period prediction.',
    hardwareDetail: 'On-device neuro-cycle prediction engine',
  },
  {
    id: 'symptoms',
    label: 'Symptoms Logger',
    icon: AlertCircle,
    badge: 'Wrist Haptics',
    explanation: 'Log cramps, bloating, backache, headache, and fatigue directly on your wrist with haptic confirmation.',
    hardwareDetail: 'Instant local sync with HerRhythm mobile & web dashboard',
  },
  {
    id: 'mood',
    label: 'Mood Tracking',
    icon: Smile,
    badge: 'Emotional Baseline',
    explanation: 'Select your current mood to correlate neurochemical shifts with estrogen and progesterone curves.',
    hardwareDetail: 'Mood timeline history & trend analytics',
  },
  {
    id: 'hydration',
    label: 'Hydration',
    icon: Droplet,
    badge: 'Tap-to-Drink',
    explanation: 'Interactive fluid tracking showing volume consumed vs target with a one-tap +250ml logger on the watch screen.',
    hardwareDetail: 'Dynamic fluid goals adjusted for temperature & workout strain',
  },
  {
    id: 'energy',
    label: 'Energy Reserve',
    icon: Zap,
    badge: 'Metabolic Readout',
    explanation: 'Real-time metabolic fuel estimation synthesizing sleep efficiency, recent strain, and cycle day hormone state.',
    hardwareDetail: 'Predictive diurnal energy curves',
  },
  {
    id: 'recovery',
    label: 'Recovery Readiness',
    icon: BatteryMedium,
    badge: 'Autonomic Score',
    explanation: 'Comprehensive biological readiness score dictating whether today calls for intensive training or restorative yoga.',
    hardwareDetail: 'Morning overnight baseline comparison',
  },
  {
    id: 'nyra',
    label: 'NYRA AI Assistant',
    icon: Sparkles,
    badge: 'Neural Companion',
    explanation: 'On-wrist access to your intelligent health assistant for cycle-aware answers, workout suggestions, and wellness tips.',
    hardwareDetail: 'Local LLM inference & neural audio synthesizer',
  },
  {
    id: 'safety',
    label: 'Emergency Safety',
    icon: Shield,
    badge: 'Hold-to-Activate SOS',
    explanation: 'Dedicated safety screen featuring hold-to-activate SOS, live GPS coordinates, trusted contact status, and journey beacon.',
    hardwareDetail: 'Dual GNSS (L1+L5) + audible distress transducer',
  },
];

export const ExperienceDemo: React.FC = () => {
  const { watchScreen, setWatchScreen, telemetry, updateTelemetry, cycleDay, setCycleDay } = useApp();

  const activeFeature = DEMO_BUTTONS.find((b) => b.id === watchScreen) || DEMO_BUTTONS[0];
  const ActiveIcon = activeFeature.icon;

  return (
    <section id="interactive-demo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Flagship Prototype Experience
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-roseHealth-300 to-teal-300">HerRhythm</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          The centerpiece interactive simulator. Click any feature button on the right to test how HerRhythm OS responds on the physical watch display on the left.
        </p>
      </div>

      {/* Flagship Split Experience Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Virtual Smartwatch Simulator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900/60 via-purple-950/20 to-slate-900/60 rounded-3xl border border-slate-800">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              HerRhythm Smartwatch Hardware Simulator
            </span>

            <SmartwatchHardware size="lg" showControls={true} />
          </div>

          {/* RIGHT: Feature Controller & Technical Inspector (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Active Screen Inspector Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 shadow-glow-lavender">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                      Screen Inspector
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {activeFeature.label}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold">
                  {activeFeature.badge}
                </span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed mt-2">
                {activeFeature.explanation}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Hardware: <strong>{activeFeature.hardwareDetail}</strong></span>
                <span className="text-teal-400 font-mono">Active on Display</span>
              </div>
            </div>

            {/* Feature Selector Buttons (15 Screens Grid) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Select Watch Application (15 Interactive Screens):
                </span>
                <span className="text-xs text-purple-400 font-mono">Click to Switch Watch</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {DEMO_BUTTONS.map((btn) => {
                  const Icon = btn.icon;
                  const isCurrent = watchScreen === btn.id;

                  return (
                    <button
                      key={btn.id}
                      onClick={() => setWatchScreen(btn.id)}
                      className={`p-2.5 rounded-xl text-center text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1.5 ${
                        isCurrent
                          ? 'bg-purple-600 text-white shadow-glow-lavender border border-purple-400 scale-105 z-10'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] truncate w-full">{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real-time Telemetry Modifier Bar (Simulate Changes) */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-400" />
                  Simulate Live Telemetry Inputs:
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Real-time Reactive State</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Heart Rate Modifier */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                    <span>Heart Rate:</span>
                    <span className="font-mono text-roseHealth-400 font-bold">{telemetry.heartRate.bpm} BPM</span>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="145"
                    value={telemetry.heartRate.bpm}
                    onChange={(e) =>
                      updateTelemetry({
                        heartRate: { ...telemetry.heartRate, bpm: Number(e.target.value) },
                      })
                    }
                    className="w-full accent-roseHealth-500 cursor-pointer"
                  />
                </div>

                {/* Cycle Day Modifier */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                    <span>Cycle Day:</span>
                    <span className="font-mono text-purple-300 font-bold">Day {cycleDay} / 28</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="28"
                    value={cycleDay}
                    onChange={(e) => setCycleDay(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Quick Stress / Energy State */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                    <span>Quick Trigger:</span>
                    <span className="font-mono text-teal-300 font-bold">{telemetry.stress.score}/100</span>
                  </div>
                  <button
                    onClick={() =>
                      updateTelemetry({
                        stress: {
                          score: telemetry.stress.score === 32 ? 72 : 32,
                          level: telemetry.stress.score === 32 ? 'Elevated' : 'Calm',
                          recommendation:
                            telemetry.stress.score === 32
                              ? 'Sympathetic arousal detected. Suggested 2-min box breathing.'
                              : 'Parasympathetic tone is optimal.',
                        },
                      })
                    }
                    className="w-full py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-[10px] transition-colors"
                  >
                    Toggle Stress State
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
