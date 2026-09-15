import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
  PhoneCall,
  Navigation,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const JourneyMonitoring: React.FC = () => {
  const { safety, toggleJourney, profile } = useApp();
  const [customDestination, setCustomDestination] = useState('Hayes Valley Residence');

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-2xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-2">
            <Compass className="w-3.5 h-3.5" />
            Active Route Guardian
          </div>
          <h3 className="text-2xl font-black text-white">
            Watch My Journey
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Intelligent autonomous route tracking with route deviation alerts and auto-check-in pings.
          </p>
        </div>

        <button
          onClick={toggleJourney}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-auto ${
            safety.journey.active
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-glow-sos'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-glow-teal'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>{safety.journey.active ? 'End Journey (Safe Arrival)' : 'Activate "Watch My Journey"'}</span>
        </button>
      </div>

      {/* Simulated Live Route Map Graphic */}
      <div className="relative h-64 sm:h-72 w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden mb-6 p-4 flex flex-col justify-between">
        {/* Subtle grid and simulated street map topography */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Route Path SVG */}
        <svg className="absolute inset-0 w-full h-full stroke-cyan-500/80 fill-none" strokeWidth="3" strokeDasharray="6 4">
          <path d="M 60,60 C 140,80 180,180 320,130 S 480,200 620,160" />
        </svg>

        {/* Origin Pin */}
        <div className="absolute top-10 left-10 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-glow-teal" />
          <span className="text-[11px] font-mono text-emerald-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
            Start: Financial District
          </span>
        </div>

        {/* Destination Pin */}
        <div className="absolute bottom-12 right-12 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-400 border-2 border-slate-900 shadow-glow-lavender" />
          <span className="text-[11px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
            Dest: {customDestination}
          </span>
        </div>

        {/* Moving Traveler Beacon Dot */}
        <div className="absolute top-[48%] left-[45%] flex items-center gap-2">
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-glow-teal animate-pulse" />
            <div className="absolute -inset-2 rounded-full border border-cyan-400/60 animate-ping" />
          </div>
          <div className="bg-slate-900/95 border border-cyan-500/40 px-2.5 py-1 rounded-xl text-xs text-white font-mono shadow-lg">
            <span className="text-cyan-300 font-bold block">Elena Vance (HerRhythm Watch)</span>
            <span className="text-[10px] text-slate-400">Moving • 18 km/h • On Scheduled Route</span>
          </div>
        </div>

        {/* Top Floating Telemetry Overlay */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300">
            <span className={`w-2 h-2 rounded-full ${safety.journey.active ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
            <span>Status: <strong>{safety.journey.active ? 'Live Monitoring Active' : 'Standby'}</strong></span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>ETA: <strong>18 mins</strong></span>
          </div>
        </div>

        {/* Bottom Floating Contact Sync Pill */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
            Live Share: <strong>{profile.contacts[0]?.name} (+1 555-349-8821)</strong>
          </span>
          <span className="text-teal-400 font-mono">Dual GNSS (L1+L5) Locked</span>
        </div>
      </div>

      {/* NYRA Voice Scenario Box */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>NYRA Voice Scenario:</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
          "Journey monitoring activated. I'll keep an eye on your path and notify your trusted contact ({profile.contacts[0]?.name}) if an unexpected deviation or emergency is detected."
        </p>
      </div>

      <div className="text-[11px] text-slate-400 text-center">
        Simulated live mapping engine with geofence verification for prototype presentation.
      </div>
    </div>
  );
};
