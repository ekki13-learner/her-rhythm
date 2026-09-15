import React, { useState } from 'react';
import { SosSimulator } from './SosSimulator';
import { JourneyMonitoring } from './JourneyMonitoring';
import { SmartAlerts } from './SmartAlerts';
import { Shield, Radio, Navigation, Bell, Lock, HeartHandshake } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sos' | 'journey' | 'alerts'>('sos');

  return (
    <section id="safety-center" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Shield className="w-3.5 h-3.5" />
          Autonomous Protection
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Safety that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-roseHealth-300 to-purple-300">
            stays with her.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Standard smartwatches treat an emergency as a single passive dial. HerRhythm operates a proactive safety ecosystem—combining autonomous journey oversight, live encrypted telemetry dispatch, and instant crisis response.
        </p>

        {/* Feature switcher tabs */}
        <div className="inline-flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-red-500/20 mt-8 gap-1">
          <button
            onClick={() => setActiveTab('sos')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'sos'
                ? 'bg-red-600 text-white shadow-glow-sos'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Emergency SOS Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('journey')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'journey'
                ? 'bg-cyan-600 text-white shadow-glow-teal'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>"Watch My Journey" Live Map</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'alerts'
                ? 'bg-purple-600 text-white shadow-glow-lavender'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Smart Wellness Alerts</span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-300">
        {activeTab === 'sos' && <SosSimulator />}
        {activeTab === 'journey' && <JourneyMonitoring />}
        {activeTab === 'alerts' && <SmartAlerts />}
      </div>
    </section>
  );
};
