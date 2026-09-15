import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  AlertTriangle,
  MapPin,
  Heart,
  Brain,
  PhoneCall,
  Volume2,
  VolumeX,
  CheckCircle2,
  Clock,
  Radio,
  X,
} from 'lucide-react';

export const SosSimulator: React.FC = () => {
  const { safety, triggerSos, dismissSos, toggleSiren, profile, telemetry } = useApp();
  const [holdProgress, setHoldProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = () => {
    if (safety.sosActive) return;
    setHoldProgress(0);

    timerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current!);
          triggerSos();
          return 0;
        }
        return prev + 5; // ~2.0s hold
      });
    }, 100);
  };

  const endHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!safety.sosActive) {
      setHoldProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all duration-500 shadow-2xl relative overflow-hidden ${
      safety.sosActive
        ? 'border-red-500/80 bg-red-950/30 shadow-glow-sos'
        : 'border-red-500/20'
    }`}>
      {/* Background strobe overlay if emergency is active */}
      {safety.sosActive && (
        <div className="absolute inset-0 bg-red-600/10 animate-pulse pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Emergency Protocol Simulation
          </div>
          <h3 className="text-2xl font-black text-white">
            Emergency SOS Simulation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Hold the button for 2 seconds to simulate HerRhythm's full emergency alert cascade.
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-400 self-start sm:self-auto">
          PROTOTYPE DEMO
        </span>
      </div>

      {!safety.sosActive ? (
        /* Standby Hold Trigger View */
        <div className="py-8 flex flex-col items-center justify-center text-center relative z-10">
          <div className="relative mb-6">
            {/* SVG Circular Fill Progress */}
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-slate-800 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-red-500 fill-none transition-all duration-75"
                strokeWidth="8"
                strokeDasharray="440"
                strokeDashoffset={440 - (440 * holdProgress) / 100}
              />
            </svg>

            {/* Press and Hold Central Button */}
            <button
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className="absolute inset-3 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm sm:text-base flex flex-col items-center justify-center shadow-glow-sos active:scale-95 transition-all select-none"
            >
              <ShieldAlert className="w-8 h-8 mb-1" />
              <span>PRESS & HOLD</span>
              <span className="text-[10px] font-mono tracking-widest text-red-200 opacity-90">
                FOR SOS
              </span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {holdProgress > 0 ? (
              <span className="text-red-400 font-bold animate-pulse">
                Activating Emergency Broadcast... {holdProgress}%
              </span>
            ) : (
              'Click and hold mouse / finger to simulate real-time SOS trigger.'
            )}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-teal-400" /> Dual-band GPS Ready
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-purple-400" /> Primary: {profile.contacts[0]?.name}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Auto-SMS Gateway Armed
            </span>
          </div>
        </div>
      ) : (
        /* Emergency Alert Activated Display */
        <div className="py-4 space-y-6 relative z-10 animate-fade-in">
          {/* Simulated Push Notification Banner */}
          <div className="p-4 rounded-2xl bg-red-600 text-white shadow-xl flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="text-xs uppercase font-mono tracking-wider font-extrabold text-red-200">
                  Simulated Notification Dispatched
                </div>
                <div className="text-sm font-bold mt-0.5">
                  HerRhythm Emergency Alert: Trusted contacts notified. Live GPS beacon broadcasting.
                </div>
                <div className="text-xs text-red-100 mt-1">
                  Sent to: {profile.contacts.map((c) => c.name).join(', ')}
                </div>
              </div>
            </div>

            <button
              onClick={dismissSos}
              className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
              title="Cancel Alert"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real-time Emergency Telemetry Snapshot Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* GPS Location */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Live GPS Location</span>
              </div>
              <div className="text-sm font-bold text-white">
                37.7749° N, 122.4194° W
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Market & 4th St (Accuracy: ±3.5m)
              </div>
            </div>

            {/* Vitals Snapshot */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-1">
                <Heart className="w-3.5 h-3.5 animate-pulse" />
                <span>Cardiac Telemetry</span>
              </div>
              <div className="text-sm font-bold text-white">
                114 BPM (Acute Surge)
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                SpO₂: 98% • Temp: 36.7°C
              </div>
            </div>

            {/* Stress Snapshot */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                <Brain className="w-3.5 h-3.5" />
                <span>Autonomic Stress Index</span>
              </div>
              <div className="text-sm font-bold text-white">
                84 / 100 (High Sympathetic)
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Sudden spike detected
              </div>
            </div>

            {/* Emergency Status */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-400 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Broadcast Timestamp</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {safety.sosTimestamp || 'Just now'}
              </div>
              <div className="text-[11px] text-teal-400 mt-0.5">
                Encrypted Peer Link Active
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-red-900/40">
            <button
              onClick={toggleSiren}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                safety.sirenOn
                  ? 'bg-red-600 text-white shadow-glow-sos'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {safety.sirenOn ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span>{safety.sirenOn ? 'Audible Siren ON (Synthesized)' : 'Mute Audible Siren'}</span>
            </button>

            <button
              onClick={dismissSos}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <span>Cancel Emergency Flow & Reset Simulator</span>
            </button>
          </div>
        </div>
      )}

      {/* Safety Legal / Prototype Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
        <strong>Important Prototype Notice:</strong> This is an interactive simulation of HerRhythm's emergency broadcast architecture. It does NOT dial real-world public safety answering points (PSAP / 911). Intended for hackathon demonstration.
      </div>
    </div>
  );
};
