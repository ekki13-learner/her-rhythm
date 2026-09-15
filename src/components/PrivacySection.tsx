import React, { useState } from 'react';
import { ShieldCheck, Lock, EyeOff, UserCheck, HardDriveDownload, Trash2, CheckCircle2 } from 'lucide-react';
import { playSuccessChime } from '../utils/audioFeedback';

export const PrivacySection: React.FC = () => {
  const [onDeviceAI, setOnDeviceAI] = useState(true);
  const [allowContactLocation, setAllowContactLocation] = useState(true);
  const [anonymousResearch, setAnonymousResearch] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    playSuccessChime();
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section id="privacy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Lock className="w-3.5 h-3.5" />
          Data Sovereignty
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Privacy & Control.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-roseHealth-300 to-teal-300">
            Your health data belongs to you.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Women's biometric, cycle, and location telemetry are deeply sensitive. HerRhythm is engineered with strict user permissions, local on-device intelligence, and zero third-party monetization.
        </p>
      </div>

      {/* Privacy Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              On-Device AI Computation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              NYRA AI processes cycle symptoms and daily HRV patterns directly on your smartwatch and paired smartphone, minimizing transmission of sensitive biological data.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-400 font-mono">
            Local-First Architecture
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Granular Contact Permissions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your trusted contacts only receive your live location and vitals during explicit SOS hold activations or active "Watch My Journey" sessions.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-teal-400 font-mono">
            Zero Constant Surveillance
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-roseHealth-500/20 border border-roseHealth-500/30 flex items-center justify-center text-roseHealth-300 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Zero Advertising Data Sales
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              HerRhythm does not sell, license, or broker your reproductive cycle information, workout routines, or identity to advertising brokers or insurers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-roseHealth-300 font-mono">
            Ethical Health-Tech Oath
          </div>
        </div>
      </div>

      {/* Interactive Privacy Settings Control Center */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Your Privacy Controls</h3>
            <p className="text-xs text-slate-400">Toggle live permissions or request data archive simulation.</p>
          </div>
          {toastMessage && (
            <span className="text-xs text-teal-400 font-semibold animate-pulse">
              ✓ {toastMessage}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {/* Toggle 1: On-Device AI */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Local On-Device NYRA Processing</div>
              <div className="text-xs text-slate-400">Keep symptom inference and hormone pattern recognition on your personal hardware.</div>
            </div>
            <button
              onClick={() => {
                setOnDeviceAI(!onDeviceAI);
                triggerToast(`On-device processing ${!onDeviceAI ? 'Enabled' : 'Disabled'}`);
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                onDeviceAI ? 'bg-purple-600' : 'bg-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${onDeviceAI ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Toggle 2: Location sharing */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Trusted Contact Emergency Broadcast</div>
              <div className="text-xs text-slate-400">Allow automatic GPS coordinates broadcast to primary contacts when SOS is triggered.</div>
            </div>
            <button
              onClick={() => {
                setAllowContactLocation(!allowContactLocation);
                triggerToast(`Emergency contact broadcast ${!allowContactLocation ? 'Enabled' : 'Disabled'}`);
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                allowContactLocation ? 'bg-teal-500' : 'bg-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${allowContactLocation ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Data Actions */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => triggerToast('Health telemetry export JSON prepared for download (Simulation)')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <HardDriveDownload className="w-4 h-4 text-purple-400" />
              <span>Export My Health Telemetry (.JSON)</span>
            </button>

            <button
              onClick={() => triggerToast('Data purge verification prompt displayed (Simulation)')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-rose-300 border border-rose-900/40 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>Erase All Local Sensor Data</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
