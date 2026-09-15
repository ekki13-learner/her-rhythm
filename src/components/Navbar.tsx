import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Heart,
  Menu,
  X,
  Volume2,
  VolumeX,
  Shield,
  Calendar,
  Activity,
  Play,
  User,
  Wifi,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    batteryLevel,
    isConnected,
    setIsOnboardingOpen,
    soundEnabled,
    setSoundEnabled,
    profile,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-navy-950/80 backdrop-blur-xl border-b border-purple-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-roseHealth-500 flex items-center justify-center text-white shadow-glow-lavender group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M3.5 12h3l2-4 3 8 2-5 2 3h4" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-black text-white tracking-tight flex items-center gap-1">
              Her<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-lavender-300 to-roseHealth-400">Rhythm</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-1 font-medium tracking-wider">
              Health & Safety Wearable
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-purple-300 transition-colors">
            Home
          </button>
          <button onClick={() => scrollTo('smartwatch-simulator-section')} className="hover:text-purple-300 transition-colors">
            Smartwatch
          </button>
          <button onClick={() => scrollTo('health-dashboard')} className="hover:text-purple-300 transition-colors">
            Health
          </button>
          <button onClick={() => scrollTo('womens-health')} className="hover:text-purple-300 transition-colors">
            Women's Health
          </button>
          <button onClick={() => scrollTo('nyra-ai')} className="hover:text-purple-300 transition-colors">
            NYRA AI
          </button>
          <button onClick={() => scrollTo('fitness-programs')} className="hover:text-purple-300 transition-colors">
            Fitness
          </button>
          <button onClick={() => scrollTo('safety-center')} className="hover:text-purple-300 transition-colors">
            Safety
          </button>
          <button onClick={() => scrollTo('privacy')} className="hover:text-purple-300 transition-colors">
            Privacy
          </button>
          <button onClick={() => scrollTo('interactive-demo')} className="text-purple-300 font-bold hover:text-white transition-colors">
            Demo
          </button>
        </div>

        {/* Right side: Watch status pill + Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Smartwatch Connection Pill */}
          <div
            onClick={() => scrollTo('interactive-demo')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-purple-500/40 transition-colors"
            title="HerRhythm Watch Connected"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono font-medium text-[11px]">Watch 82%</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={soundEnabled ? 'Mute synthesized sound effects' : 'Enable synthesized sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Profile Onboarding Trigger */}
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold hover:border-purple-500/40 transition-all"
            title="Configure Profile"
          >
            <User className="w-4 h-4 text-purple-300" />
            <span className="hidden lg:inline">{profile.name.split(' ')[0]}</span>
          </button>

          {/* Primary CTA: Try Interactive Demo */}
          <button
            onClick={() => scrollTo('interactive-demo')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-roseHealth-500 hover:from-purple-500 hover:to-roseHealth-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-lavender transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Try Interactive Demo</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-navy-950/95 border-b border-purple-500/20 px-6 py-6 space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button onClick={() => scrollTo('smartwatch-simulator-section')} className="p-3 rounded-xl bg-slate-900 text-left text-slate-200">
              Smartwatch
            </button>
            <button onClick={() => scrollTo('health-dashboard')} className="p-3 rounded-xl bg-slate-900 text-left text-slate-200">
              Health Dashboard
            </button>
            <button onClick={() => scrollTo('womens-health')} className="p-3 rounded-xl bg-slate-900 text-left text-slate-200">
              Women's Health
            </button>
            <button onClick={() => scrollTo('nyra-ai')} className="p-3 rounded-xl bg-slate-900 text-left text-slate-200">
              NYRA AI Companion
            </button>
            <button onClick={() => scrollTo('fitness-programs')} className="p-3 rounded-xl bg-slate-900 text-left text-slate-200">
              Fitness & Programs
            </button>
            <button onClick={() => scrollTo('safety-center')} className="p-3 rounded-xl bg-slate-900 text-left text-slate-200">
              Safety Center
            </button>
            <button onClick={() => scrollTo('privacy')} className="p-3 rounded-xl bg-slate-900 text-left text-slate-200">
              Privacy & Control
            </button>
            <button onClick={() => scrollTo('interactive-demo')} className="p-3 rounded-xl bg-purple-950 text-left text-purple-300 border border-purple-800">
              Flagship Demo
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOnboardingOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-purple-400" />
              <span>Personalize Profile ({profile.name})</span>
            </button>

            <button
              onClick={() => scrollTo('interactive-demo')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-roseHealth-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-lavender"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Experience Flagship Simulator</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
