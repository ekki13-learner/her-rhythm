import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Shield, ArrowLeft, AlertTriangle, MapPin, PhoneCall, Radio, Check } from 'lucide-react';

export const WatchSafety: React.FC = () => {
  const { safety, triggerSos, dismissSos, toggleJourney, profile, setWatchScreen } = useApp();
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const isHolding = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = () => {
    if (safety.sosActive) return;
    isHolding.current = true;
    setHoldProgress(0);

    timerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current!);
          isHolding.current = false;
          triggerSos();
          return 0;
        }
        return prev + 10;
      });
    }, 150);
  };

  const endHold = () => {
    isHolding.current = false;
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
    <div className={`h-full flex flex-col justify-between p-2.5 select-none text-white transition-colors duration-300 ${
      safety.sosActive
        ? 'bg-gradient-to-b from-rose-950 via-red-950 to-black animate-pulse'
        : 'bg-gradient-to-b from-slate-950 via-rose-950/20 to-slate-950'
    }`}>
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWatchScreen('home')}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-roseHealth-400 flex items-center gap-1">
          <Shield className="w-3 h-3 text-roseHealth-400" />
          Safety Shield
        </span>
      </div>

      {safety.sosActive ? (
        /* EMERGENCY ACTIVE VIEW ON WATCH */
        <div className="text-center my-0.5 space-y-1">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-red-600 text-white animate-ping">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="text-sm font-black text-red-400 tracking-wider">
            EMERGENCY ACTIVE
          </div>
          <div className="text-[9px] text-slate-300">
            Contacts alerted with live GPS coordinates
          </div>
          <button
            onClick={dismissSos}
            className="mt-1 py-1 px-3 rounded-full bg-slate-800 text-white text-[10px] font-semibold hover:bg-slate-700 transition-colors"
          >
            Cancel Alert (Simulated)
          </button>
        </div>
      ) : (
        /* STANDBY SAFETY VIEW */
        <>
          {/* Main SOS Interactive Button */}
          <div className="text-center my-0.5">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="stroke-slate-800 fill-none"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="stroke-red-500 fill-none transition-all"
                  strokeWidth="4"
                  strokeDasharray="175"
                  strokeDashoffset={175 - (175 * holdProgress) / 100}
                />
              </svg>
              <button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className="absolute inset-1.5 rounded-full bg-gradient-to-br from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs flex flex-col items-center justify-center shadow-glow-sos active:scale-95 transition-all"
              >
                <span>SOS</span>
                <span className="text-[7px] font-normal tracking-tighter opacity-80">HOLD 1.5s</span>
              </button>
            </div>
            <div className="text-[9px] text-slate-400 mt-1">
              {holdProgress > 0 ? `Triggering... ${holdProgress}%` : 'Press & hold for emergency alert'}
            </div>
          </div>

          {/* Quick status details */}
          <div className="bg-slate-900/90 rounded-lg border border-slate-800 p-1.5 text-[9px] space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-teal-400" /> GPS Lock:
              </span>
              <span className="text-teal-400 font-mono">±3.5m active</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-2.5 h-2.5 text-purple-400" /> Contact:
              </span>
              <span className="truncate max-w-[90px] text-slate-200">
                {profile.contacts[0]?.name || 'Maya Lin'}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Footer Disclaimer */}
      <div className="text-[8px] text-center text-slate-400 pt-0.5 border-t border-slate-800">
        Simulated safety flow • Dual-band antenna
      </div>
    </div>
  );
};
