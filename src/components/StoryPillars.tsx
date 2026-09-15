import React from 'react';
import { Sparkles, Calendar, Shield, Activity, ArrowRight, HeartPulse, Brain, Radio } from 'lucide-react';

export const StoryPillars: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* The Problem */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-roseHealth-400 font-bold block mb-2">
          The Problem With Conventional Wearables
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          "Women's health is more than a number on a screen."
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Most smartwatches were designed for a 24-hour male hormonal rhythm, treating female physiology as an afterthought with generic step counters and retrospective period calendars. They ignore that body temperature, cardiovascular output, sleep depth, and emotional stamina fluctuate continuously across the 28-day infradian cycle.
        </p>
      </div>

      {/* The Solution */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold block mb-2">
          The Solution
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
          Meet HerRhythm.
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          A groundbreaking ecosystem linking sub-degree biometric hardware, context-aware AI guidance, and proactive personal safety.
        </p>
      </div>

      {/* The Three Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pillar 1: Understand */}
        <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/50 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 block mb-1">
              Pillar 01 • Understand
            </span>
            <h4 className="text-2xl font-bold text-white mb-3">
              Women's Health Intelligence
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Synthesizes continuous skin temperature shifts, HRV, and SpO₂ with your 28-day cycle. Understand why you feel energized on Day 14 and tired on Day 26—and adapt your life accordingly.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-xs font-mono text-purple-300 flex items-center justify-between">
            <span>Cycle • Temp • Symptoms • Recovery</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 2: Personalize */}
        <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 hover:border-lavender-400/50 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600/30 to-roseHealth-500/20 border border-purple-400/30 flex items-center justify-center text-lavender-300 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-lavender-400 block mb-1">
              Pillar 02 • Personalize
            </span>
            <h4 className="text-2xl font-bold text-white mb-3">
              NYRA AI Health Companion
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              An intelligent, empathetic health assistant that speaks your language. Ask NYRA via voice or chat to generate cycle-synced workouts, analyze sleep architecture, or advise on cramp relief.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-xs font-mono text-lavender-300 flex items-center justify-between">
            <span>Voice • Chat • Custom Workouts</span>
            <ArrowRight className="w-4 h-4 text-lavender-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 3: Protect */}
        <div className="glass-panel p-8 rounded-3xl border border-red-500/20 hover:border-red-500/50 transition-all flex flex-col justify-between group shadow-xl">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-roseHealth-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-roseHealth-400 block mb-1">
              Pillar 03 • Protect
            </span>
            <h4 className="text-2xl font-bold text-white mb-3">
              Personal Safety Ecosystem
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              True safety requires more than a panic button. HerRhythm combines hold-to-activate SOS, live route journey monitoring, dual-band GPS, fall detection, and real-time vital broadcasts to trusted contacts.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-xs font-mono text-roseHealth-300 flex items-center justify-between">
            <span>SOS • Live Journey • GPS • Fall Detection</span>
            <ArrowRight className="w-4 h-4 text-roseHealth-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};
