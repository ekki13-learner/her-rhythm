import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Wind,
  Thermometer,
  Brain,
  Moon,
  Zap,
  BatteryMedium,
  Footprints,
  Flame,
  Droplet,
  TrendingUp,
  Sparkles,
  Info,
  Calendar,
  Clock,
  ArrowUpRight,
  Plus,
} from 'lucide-react';

type TimeRange = 'day' | 'week' | 'month';

export const HealthDashboard: React.FC = () => {
  const { telemetry, cycleDay, currentDayLog, addHydration, setWatchScreen } = useApp();
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [activeMetricDetail, setActiveMetricDetail] = useState<string>('heart');

  // Realistic sample trends for Day, Week, Month
  const hourlyData = [
    { time: '06:00', hr: 58, stress: 18, temp: 36.4 },
    { time: '08:00', hr: 74, stress: 28, temp: 36.5 },
    { time: '10:00', hr: 82, stress: 35, temp: 36.6 },
    { time: '12:00', hr: 78, stress: 32, temp: 36.7 },
    { time: '14:00', hr: 88, stress: 42, temp: 36.7 },
    { time: '16:00', hr: 76, stress: 30, temp: 36.7 },
    { time: '18:00', hr: 112, stress: 48, temp: 36.9 }, // workout
    { time: '20:00', hr: 72, stress: 22, temp: 36.7 },
    { time: '22:00', hr: 64, stress: 15, temp: 36.6 },
  ];

  const weeklyData = [
    { day: 'Mon', steps: 8420, sleep: 7.2, recovery: 78, phase: 'Follicular' },
    { day: 'Tue', steps: 10150, sleep: 7.8, recovery: 82, phase: 'Follicular' },
    { day: 'Wed', steps: 7230, sleep: 6.9, recovery: 74, phase: 'Follicular' },
    { day: 'Thu', steps: 9400, sleep: 8.1, recovery: 88, phase: 'Ovulation' },
    { day: 'Fri', steps: 11200, sleep: 7.5, recovery: 85, phase: 'Ovulation' },
    { day: 'Sat', steps: 6800, sleep: 8.4, recovery: 80, phase: 'Ovulation' },
    { day: 'Sun', steps: 7842, sleep: 7.7, recovery: 82, phase: 'Ovulation' },
  ];

  return (
    <section id="health-dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-roseHealth-400" />
            Comprehensive Biometrics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            HerRhythm Health Dashboard
          </h2>
          <p className="mt-2 text-base text-slate-300">
            Real-time multisensor telemetry contextualized by the 28-day infradian cycle.
          </p>
        </div>

        {/* Time Range Switcher */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-purple-500/20 self-start md:self-auto">
          {(['day', 'week', 'month'] as TimeRange[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeRange(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                timeRange === tab
                  ? 'bg-purple-600 text-white shadow-glow-lavender'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab === 'day' ? "Today's Health" : tab === 'week' ? 'Weekly Trends' : 'Monthly Trends'}
            </button>
          ))}
        </div>
      </div>

      {/* 10 Core Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
        {/* 1. Heart Rate */}
        <div
          onClick={() => { setActiveMetricDetail('heart'); setWatchScreen('heart'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-roseHealth-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-roseHealth-500/20 flex items-center justify-center">
              <Heart className="w-4 h-4 animate-heartbeat" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-roseHealth-950 px-2 py-0.5 rounded text-roseHealth-300">
              Live
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.heartRate.bpm} <span className="text-xs text-slate-400 font-normal">BPM</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Heart Rate</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Resting: 62 BPM</div>
        </div>

        {/* 2. SpO2 */}
        <div
          onClick={() => { setActiveMetricDetail('spo2'); setWatchScreen('spo2'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-teal-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Wind className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-teal-950 px-2 py-0.5 rounded text-teal-300">
              98%
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.spo2.percent}<span className="text-sm text-teal-400">%</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">SpO₂ Oxygen</div>
          <div className="text-[11px] text-teal-400 mt-0.5">Optimal Saturation</div>
        </div>

        {/* 3. Skin Temperature */}
        <div
          onClick={() => { setActiveMetricDetail('temp'); setWatchScreen('temp'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Thermometer className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-purple-950 px-2 py-0.5 rounded text-purple-300">
              ±0.1°C
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.temperature.celsius.toFixed(1)}<span className="text-sm text-purple-300">°C</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Basal Skin Temp</div>
          <div className="text-[11px] text-purple-300 mt-0.5">+{telemetry.temperature.baselineDiff}°C Shift</div>
        </div>

        {/* 4. Stress */}
        <div
          onClick={() => { setActiveMetricDetail('stress'); setWatchScreen('stress'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-indigo-950 px-2 py-0.5 rounded text-indigo-300">
              Calm
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.stress.score}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Stress Level</div>
          <div className="text-[11px] text-teal-400 mt-0.5">{telemetry.stress.level} Balance</div>
        </div>

        {/* 5. Sleep */}
        <div
          onClick={() => { setActiveMetricDetail('sleep'); setWatchScreen('sleep'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-blue-950 px-2 py-0.5 rounded text-blue-300">
              88 Score
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            7h 42m
          </div>
          <div className="text-xs text-slate-300 mt-1">Sleep Duration</div>
          <div className="text-[11px] text-blue-300 mt-0.5">Deep 1h 45m • 92% Eff.</div>
        </div>

        {/* 6. Energy */}
        <div
          onClick={() => { setActiveMetricDetail('energy'); setWatchScreen('energy'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-amber-950 px-2 py-0.5 rounded text-amber-300">
              Peak
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.energy.percentage}<span className="text-sm text-amber-400">%</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Energy Fuel</div>
          <div className="text-[11px] text-amber-300 mt-0.5">{telemetry.energy.status} Readiness</div>
        </div>

        {/* 7. Recovery */}
        <div
          onClick={() => { setActiveMetricDetail('recovery'); setWatchScreen('recovery'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <BatteryMedium className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-950 px-2 py-0.5 rounded text-emerald-300">
              Optimal
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.recovery.score}<span className="text-sm text-emerald-400">%</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Recovery Score</div>
          <div className="text-[11px] text-emerald-300 mt-0.5">+14% Above Baseline</div>
        </div>

        {/* 8. Steps */}
        <div
          onClick={() => { setActiveMetricDetail('activity'); setWatchScreen('activity'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-teal-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Footprints className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-teal-950 px-2 py-0.5 rounded text-teal-300">
              78% Goal
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.activity.steps.toLocaleString()}
          </div>
          <div className="text-xs text-slate-300 mt-1">Steps Walked</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{telemetry.activity.distanceKm} km • 44m Active</div>
        </div>

        {/* 9. Calories */}
        <div
          onClick={() => { setActiveMetricDetail('activity'); setWatchScreen('activity'); }}
          className="glass-panel-interactive p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between text-orange-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-orange-950 px-2 py-0.5 rounded text-orange-300">
              Burn
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {telemetry.activity.caloriesKcal.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kcal</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Active Burn</div>
          <div className="text-[11px] text-orange-300 mt-0.5">Cycle Metabolic Match</div>
        </div>

        {/* 10. Hydration */}
        <div className="glass-panel-interactive p-4 rounded-2xl relative group">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Droplet className="w-4 h-4 fill-cyan-400/40" />
            </div>
            <button
              onClick={() => addHydration(250)}
              title="Add 250ml"
              className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 text-[10px] font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> 250ml
            </button>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {(telemetry.hydration.currentMl / 1000).toFixed(2)} <span className="text-xs text-cyan-300">/ 2.5L</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">Hydration Intake</div>
          <div className="text-[11px] text-cyan-400 mt-0.5">
            {Math.round((telemetry.hydration.currentMl / telemetry.hydration.goalMl) * 100)}% of Daily Goal
          </div>
        </div>
      </div>

      {/* Main Interactive Chart & Insights Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interactive Telemetry Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block">
                {timeRange === 'day' ? '24-Hour Continuous Timeline' : timeRange === 'week' ? '7-Day Physiological Rhythm' : '28-Day Infradian Wave'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {timeRange === 'day' ? 'Heart Rate & Autonomic Tone' : 'Cycle Synced Readiness'}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-roseHealth-400" />
                <span className="text-slate-300">Heart Rate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                <span className="text-slate-300">Stress</span>
              </div>
            </div>
          </div>

          {/* SVG Smooth Curve Trend Chart */}
          <div className="relative h-64 w-full pt-4">
            <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb7185" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 100, 160, 220].map((y, idx) => (
                <line
                  key={idx}
                  x1="0"
                  y1={y}
                  x2="800"
                  y2={y}
                  stroke="#1e294b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Stress Area and Line */}
              <path
                d="M 0,180 Q 100,160 200,140 T 400,150 T 600,110 T 800,190 L 800,240 L 0,240 Z"
                fill="url(#stressGrad)"
              />
              <path
                d="M 0,180 Q 100,160 200,140 T 400,150 T 600,110 T 800,190"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="2.5"
              />

              {/* Heart Rate Area and Line */}
              <path
                d="M 0,130 Q 100,80 200,70 T 400,90 T 600,30 T 800,140 L 800,240 L 0,240 Z"
                fill="url(#hrGrad)"
              />
              <path
                d="M 0,130 Q 100,80 200,70 T 400,90 T 600,30 T 800,140"
                fill="none"
                stroke="#fb7185"
                strokeWidth="3"
              />

              {/* Key points with hover nodes */}
              {[
                { x: 200, y: 70, label: 'Morning Peak: 82 BPM' },
                { x: 600, y: 30, label: 'Workout: 112 BPM' },
                { x: 400, y: 150, label: 'Stress: 32 (Calm)' },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
                </g>
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
              {hourlyData.map((d, i) => (
                <span key={i}>{d.time}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-purple-400" />
              Simulated telemetry dataset for HerRhythm prototype validation.
            </span>
            <button
              onClick={() => setWatchScreen('home')}
              className="text-purple-300 font-semibold hover:underline flex items-center gap-1"
            >
              Inspect on Virtual Watch <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Dynamic "Today's Insights" Card Feed */}
        <div className="glass-card-glow p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-300 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                Today's Contextual Insights
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-4">
              Synthesized Bio-Guidance
            </h3>

            <div className="space-y-3.5 text-sm">
              {/* Insight 1: Cycle */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-purple-500/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Cycle Phase: Day {cycleDay} ({currentDayLog.phase})
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Estrogen peak detected alongside a +0.1°C skin temp elevation. Metabolic and muscular capacity are optimal for progressive overload or cardio.
                </p>
              </div>

              {/* Insight 2: Sleep */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Sleep Architecture (+24m above baseline)
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Your restorative Deep Sleep (1h 45m) reached 23% of total slumber. Overnight autonomic recovery was scored at 82%.
                </p>
              </div>

              {/* Insight 3: Hydration & Temp */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-teal-500/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Hydration Target Status
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  You've consumed 1.75L of your 2.5L goal. Staying hydrated keeps resting HRV high and reduces late-luteal fluid retention.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Powered by NYRA On-Device Engine</span>
            <span className="text-purple-400 font-semibold">Non-Diagnostic</span>
          </div>
        </div>
      </div>
    </section>
  );
};
