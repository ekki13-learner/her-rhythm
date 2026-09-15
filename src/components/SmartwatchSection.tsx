import React from 'react';
import { useApp } from '../context/AppContext';
import { SmartwatchHardware } from './Smartwatch/SmartwatchHardware';
import { Sparkles, Watch, Shield, Heart, Zap, Cpu, Radio, RotateCw } from 'lucide-react';

export const SmartwatchSection: React.FC = () => {
  const { watchScreen, setWatchScreen } = useApp();

  return (
    <section id="smartwatch-simulator-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Watch className="w-3.5 h-3.5" />
          Flagship Wearable Hardware
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The HerRhythm Smartwatch.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-roseHealth-300 to-teal-300">
            Interactive Simulator.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Operate the watch simulator just like the real wearable. Rotate the digital crown, tap screen complications, log symptoms, track hydration, talk to NYRA, or test the safety SOS trigger.
        </p>
      </div>

      {/* Interactive Watch Display & Specifications Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Specification highlights (3 cols) */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          <div className="glass-panel p-5 rounded-2xl border border-purple-500/20">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Dual-Core Infradian Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ultra-low-power ARM Cortex processor running on-device AI algorithms and continuous biometrics.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-roseHealth-500/20">
            <div className="w-8 h-8 rounded-lg bg-roseHealth-500/20 flex items-center justify-center text-roseHealth-400 mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Multispectral Sensor Array</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Green, red, and infrared optical sensors with sub-degree thermistors for ovulatory temperature confirmation.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-teal-500/20">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 mb-2">
              <Radio className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Dual-Band GNSS & SOS</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              L1+L5 satellite positioning with independent emergency distress beacon and journey monitoring antenna.
            </p>
          </div>
        </div>

        {/* Center: Interactive Smartwatch Simulator (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/80 via-purple-950/20 to-slate-900/80 border border-purple-500/20 shadow-2xl order-1 lg:order-2">
          <SmartwatchHardware size="lg" showControls={true} />
        </div>

        {/* Right: Quick Screen Switcher Drawer (3 cols) */}
        <div className="lg:col-span-3 space-y-2 order-3">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-3 flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Instant Screen Switcher:</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[420px] overflow-y-auto pr-1">
            {[
              { id: 'home', label: '1. Watch Home' },
              { id: 'heart', label: '2. Heart Rate (ECG)' },
              { id: 'spo2', label: '3. SpO₂ Oxygen' },
              { id: 'temp', label: '4. Body Temperature' },
              { id: 'stress', label: '5. Stress Score' },
              { id: 'sleep', label: '6. Sleep Architecture' },
              { id: 'activity', label: '7. Activity & Steps' },
              { id: 'cycle', label: '8. Menstrual Cycle' },
              { id: 'symptoms', label: '9. Log Symptoms' },
              { id: 'mood', label: '10. Log Mood' },
              { id: 'hydration', label: '11. Log Hydration (+250ml)' },
              { id: 'energy', label: '12. Energy Reserve' },
              { id: 'recovery', label: '13. Recovery Score' },
              { id: 'nyra', label: '14. NYRA AI on Wrist' },
              { id: 'safety', label: '15. Emergency SOS' },
            ].map((screen) => {
              const isActive = watchScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => setWatchScreen(screen.id as any)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-glow-lavender border border-purple-400'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-purple-500/30'
                  }`}
                >
                  {screen.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
