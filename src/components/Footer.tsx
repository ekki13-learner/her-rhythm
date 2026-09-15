import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Heart,
  Shield,
  Wifi,
  Battery,
  Radio,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { batteryLevel, isConnected, setIsOnboardingOpen } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Final CTA Banner */}
        <div className="glass-card-glow p-8 sm:p-12 rounded-3xl border border-purple-500/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
              The Next Evolution in Women's Health & Safety
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              "Your rhythm. Your health. Your safety."
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Experience the smartwatch designed around the unique rhythm of female physiology. Explore the virtual simulator, interact with NYRA AI, and test the autonomous safety shield.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollTo('interactive-demo')}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-roseHealth-500 hover:from-purple-500 hover:to-roseHealth-400 text-white font-black text-sm flex items-center gap-2 shadow-glow-lavender transition-all"
              >
                <span>Explore HerRhythm Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="px-6 py-3.5 rounded-2xl glass-panel-interactive text-white font-bold text-sm transition-all"
              >
                Personalize Your Profile
              </button>
            </div>
          </div>
        </div>

        {/* Device Status Panel */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                HerRhythm Watch
                <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-mono font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Firmware: HR-OS 2.4.1 (Stable Infradian Engine)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-teal-400" />
              <div>
                <div className="text-slate-500 text-[10px]">Battery:</div>
                <div className="font-bold text-white font-mono">{batteryLevel}% Capacity</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-slate-500 text-[10px]">Bluetooth:</div>
                <div className="font-bold text-white font-mono">5.3 Synced (Just now)</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-roseHealth-400" />
              <div>
                <div className="text-slate-500 text-[10px]">Health Monitoring:</div>
                <div className="font-bold text-emerald-400 font-mono">Active (24/7 PPG)</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-slate-500 text-[10px]">Safety Monitoring:</div>
                <div className="font-bold text-emerald-400 font-mono">Armed (Dual GNSS)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Links & Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 pt-6 border-t border-slate-800">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white">
                Her<span className="text-purple-400">Rhythm</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              "Your rhythm. Your health. Your safety."
              <br />
              The first wearable platform uniting women's infradian cycle biology, on-wrist AI intelligence, and active personal protection.
            </p>
            <div className="text-[11px] text-purple-300/80 font-mono">
              Designed for Hackathon Demonstration & Product Pitch
            </div>
          </div>

          <div>
            <span className="font-bold text-white block mb-3 text-xs uppercase tracking-wider">Product</span>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('smartwatch-simulator-section')} className="hover:text-purple-300 transition-colors">Smartwatch Hardware</button></li>
              <li><button onClick={() => scrollTo('features-showcase')} className="hover:text-purple-300 transition-colors">OS Features (18 Apps)</button></li>
              <li><button onClick={() => scrollTo('interactive-demo')} className="hover:text-purple-300 transition-colors">Interactive Demo Lab</button></li>
              <li><button onClick={() => scrollTo('health-dashboard')} className="hover:text-purple-300 transition-colors">Web / App Dashboard</button></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-white block mb-3 text-xs uppercase tracking-wider">Intelligence</span>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('womens-health')} className="hover:text-purple-300 transition-colors">Women's Health</button></li>
              <li><button onClick={() => scrollTo('womens-health')} className="hover:text-purple-300 transition-colors">Infradian Cycle Dial</button></li>
              <li><button onClick={() => scrollTo('nyra-ai')} className="hover:text-purple-300 transition-colors">NYRA AI Companion</button></li>
              <li><button onClick={() => scrollTo('nyra-ai')} className="hover:text-purple-300 transition-colors">Voice to NYRA</button></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-white block mb-3 text-xs uppercase tracking-wider">Movement & Safety</span>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('fitness-programs')} className="hover:text-purple-300 transition-colors">Fitness Programs</button></li>
              <li><button onClick={() => scrollTo('fitness-programs')} className="hover:text-purple-300 transition-colors">Workout Player</button></li>
              <li><button onClick={() => scrollTo('safety-center')} className="hover:text-purple-300 transition-colors">Safety Center</button></li>
              <li><button onClick={() => scrollTo('safety-center')} className="hover:text-purple-300 transition-colors">SOS Simulator</button></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-white block mb-3 text-xs uppercase tracking-wider">Trust</span>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('privacy')} className="hover:text-purple-300 transition-colors">Privacy & Control</button></li>
              <li><button onClick={() => scrollTo('privacy')} className="hover:text-purple-300 transition-colors">On-Device AI</button></li>
              <li><a href="#privacy" className="hover:text-purple-300 transition-colors">Data Sovereignty</a></li>
              <li><span className="text-slate-500">Contact: team@herrhythm.tech</span></li>
            </ul>
          </div>
        </div>

        {/* Legal, Prototype Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 HerRhythm Health Technologies. All rights reserved. • <strong className="text-slate-400">Prototype — For demonstration purposes</strong>
          </div>
          <div className="text-center md:text-right text-slate-500 max-w-md">
            Non-diagnostic wellness device prototype. Emergency SOS flow is an interactive simulation.
          </div>
        </div>
      </div>
    </footer>
  );
};
