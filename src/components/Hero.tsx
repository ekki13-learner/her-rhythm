import React from 'react';
import { useApp } from '../context/AppContext';
import { SmartwatchHardware } from './Smartwatch/SmartwatchHardware';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Heart,
  Calendar,
  Zap,
  Activity,
  Play,
  CheckCircle2,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setWatchScreen, setIsOnboardingOpen } = useApp();

  const handleExploreWatch = () => {
    const el = document.getElementById('smartwatch-simulator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTryDemo = () => {
    const el = document.getElementById('interactive-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-700/20 via-roseHealth-500/15 to-teal-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 left-10 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline, Value Proposition & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-roseHealth-500/10 border border-purple-500/30 text-purple-200 text-xs font-semibold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>A smartwatch designed around the unique rhythm of women's health</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Technology that understands{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-roseHealth-300 to-teal-300">
              her rhythm.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
            HerRhythm combines continuous health monitoring, women's health intelligence, AI-powered guidance, and personal safety in one intelligent wearable.
          </p>

          {/* Core 3 Pillars Micro-Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-purple-500/20">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>1. Infradian Health Intelligence</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-purple-500/20">
              <Sparkles className="w-4 h-4 text-lavender-400" />
              <span>2. NYRA AI Companion</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-red-500/20">
              <Shield className="w-4 h-4 text-roseHealth-400" />
              <span>3. Proactive Safety Ecosystem</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={handleExploreWatch}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-roseHealth-500 hover:from-purple-500 hover:to-roseHealth-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-glow-lavender hover:scale-102 active:scale-98 transition-all"
            >
              <span>Explore the Watch</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleTryDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel-interactive text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:border-purple-400 transition-all"
            >
              <Play className="w-4 h-4 text-teal-400 fill-teal-400" />
              <span>Try Interactive Demo</span>
            </button>
          </div>

          {/* Live Device Status Pill */}
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              HerRhythm Smartwatch: Connected
            </span>
            <span>•</span>
            <span>Battery: 82%</span>
            <span>•</span>
            <span>Bluetooth 5.3 Synced</span>
          </div>
        </div>

        {/* Right Column: 3D-Style Interactive Smartwatch in Center with Floating Particles (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Floating Vital Particle 1: Heart Rate */}
          <div className="hidden sm:flex absolute -top-4 -left-6 glass-panel p-3 rounded-2xl border border-roseHealth-500/30 shadow-lg items-center gap-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="w-8 h-8 rounded-xl bg-roseHealth-500/20 flex items-center justify-center text-roseHealth-400">
              <Heart className="w-4 h-4 fill-roseHealth-500 animate-heartbeat" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Resting Vitals</div>
              <div className="text-xs font-bold text-white font-mono">62 BPM • Optimal</div>
            </div>
          </div>

          {/* Floating Vital Particle 2: Cycle Phase */}
          <div className="hidden sm:flex absolute -bottom-6 -left-8 glass-panel p-3 rounded-2xl border border-purple-500/30 shadow-lg items-center gap-2.5 animate-bounce" style={{ animationDuration: '5s' }}>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Infradian Phase</div>
              <div className="text-xs font-bold text-purple-200">Day 14 • Ovulation</div>
            </div>
          </div>

          {/* Floating Vital Particle 3: Safety Armed */}
          <div className="hidden sm:flex absolute top-1/3 -right-6 glass-panel p-3 rounded-2xl border border-teal-500/30 shadow-lg items-center gap-2.5 animate-bounce" style={{ animationDuration: '4.5s' }}>
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Safety Shield</div>
              <div className="text-xs font-bold text-teal-300">Dual GNSS Active</div>
            </div>
          </div>

          {/* 3D-styled physical smartwatch */}
          <div className="relative group">
            {/* Ambient drop glow behind watch */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-roseHealth-500/20 to-teal-500/20 rounded-[60px] blur-2xl transform scale-105 group-hover:scale-110 transition-transform duration-500" />
            <SmartwatchHardware size="lg" showControls={false} />
          </div>

          <p className="mt-4 text-xs font-mono text-slate-400 text-center">
            Tap watch screen or buttons to operate simulator directly
          </p>
        </div>
      </div>
    </section>
  );
};
