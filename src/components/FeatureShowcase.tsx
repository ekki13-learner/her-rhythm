import React from 'react';
import { useApp } from '../context/AppContext';
import { WatchScreenId } from '../types';
import {
  Heart,
  Wind,
  Thermometer,
  Brain,
  Moon,
  Activity,
  Flame,
  Footprints,
  Compass,
  Zap,
  BatteryMedium,
  Calendar,
  AlertCircle,
  Smile,
  Droplet,
  Sparkles,
  ShieldAlert,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

interface FeatureCardItem {
  id: WatchScreenId;
  title: string;
  category: 'Vitals' | 'Women’s Health' | 'AI & Safety' | 'Readiness';
  description: string;
  icon: React.ElementType;
  badge: string;
  accentColor: string;
}

const FEATURES: FeatureCardItem[] = [
  {
    id: 'heart',
    title: 'Heart Rate & ECG',
    category: 'Vitals',
    description: 'Continuous optical sensor with sub-second resting BPM & HRV anomaly tracking.',
    icon: Heart,
    badge: '76 BPM Live',
    accentColor: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-roseHealth-400',
  },
  {
    id: 'spo2',
    title: 'SpO₂ Blood Oxygen',
    category: 'Vitals',
    description: 'Red and infrared photoplethysmography monitoring respiratory saturation.',
    icon: Wind,
    badge: '98% Optimal',
    accentColor: 'from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-400',
  },
  {
    id: 'temp',
    title: 'Basal Body Temp',
    category: 'Women’s Health',
    description: 'Sub-degree nocturnal skin temperature capturing biphasic ovulatory shifts.',
    icon: Thermometer,
    badge: '+0.3°C Trend',
    accentColor: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300',
  },
  {
    id: 'cycle',
    title: 'Menstrual Cycle',
    category: 'Women’s Health',
    description: 'Infradian 28-day mapping with predictive flow, ovulation, and phase intelligence.',
    icon: Calendar,
    badge: 'Day 14 Ovulation',
    accentColor: 'from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-500/30 text-fuchsia-300',
  },
  {
    id: 'symptoms',
    title: 'Symptom Logger',
    category: 'Women’s Health',
    description: 'Log cramps, bloating, backache, and fatigue with one-tap wrist haptics.',
    icon: AlertCircle,
    badge: 'Real-time Sync',
    accentColor: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300',
  },
  {
    id: 'mood',
    title: 'Mood Tracking',
    category: 'Women’s Health',
    description: 'Track emotional patterns and correlate hormonal phases with neurochemistry.',
    icon: Smile,
    badge: 'Mood History',
    accentColor: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300',
  },
  {
    id: 'nyra',
    title: 'NYRA AI Assistant',
    category: 'AI & Safety',
    description: 'Context-aware intelligence that analyzes your cycle and metrics for personalized advice.',
    icon: Sparkles,
    badge: 'Voice & Chat',
    accentColor: 'from-lavender-500/25 to-purple-600/15 border-lavender-400/40 text-lavender-300',
  },
  {
    id: 'safety',
    title: 'Emergency SOS',
    category: 'AI & Safety',
    description: '3-second press-and-hold trigger dispatches live GPS, vitals, and siren to contacts.',
    icon: ShieldAlert,
    badge: 'Instant Dispatch',
    accentColor: 'from-red-500/20 to-rose-700/10 border-red-500/40 text-red-400',
  },
  {
    id: 'safety',
    title: 'GPS & Journey Watch',
    category: 'AI & Safety',
    description: 'Dual-band GNSS with live ETA tracking, deviation alerts, and safe arrival pings.',
    icon: MapPin,
    badge: 'Dual GNSS',
    accentColor: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30 text-cyan-400',
  },
  {
    id: 'stress',
    title: 'Stress & Autonomic HRV',
    category: 'Readiness',
    description: 'Continuous sympathetic vs parasympathetic tone analysis with breathing cues.',
    icon: Brain,
    badge: 'Score 32 Calm',
    accentColor: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-300',
  },
  {
    id: 'sleep',
    title: 'Sleep Architecture',
    category: 'Readiness',
    description: 'Stage breakdown across Deep, REM, and Light phases with sleep efficiency scoring.',
    icon: Moon,
    badge: '7h 42m (88/100)',
    accentColor: 'from-blue-500/20 to-indigo-600/10 border-blue-500/30 text-blue-300',
  },
  {
    id: 'energy',
    title: 'Energy Reserve',
    category: 'Readiness',
    description: 'Real-time metabolic fuel estimation synthesizing sleep debt and cycle phase.',
    icon: Zap,
    badge: '74% Peak',
    accentColor: 'from-yellow-500/20 to-amber-600/10 border-yellow-500/30 text-yellow-300',
  },
  {
    id: 'recovery',
    title: 'Readiness & Recovery',
    category: 'Readiness',
    description: 'Holistic biological recovery index to optimize your training load.',
    icon: BatteryMedium,
    badge: '82% Optimal',
    accentColor: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-300',
  },
  {
    id: 'hydration',
    title: 'Hydration Target',
    category: 'Readiness',
    description: 'Log water intake directly from wrist or watch prompts during high-temperature phases.',
    icon: Droplet,
    badge: '1.75L / 2.5L',
    accentColor: 'from-cyan-500/20 to-sky-600/10 border-cyan-500/30 text-cyan-300',
  },
  {
    id: 'activity',
    title: 'Steps & Daily Movement',
    category: 'Readiness',
    description: '3-axis accelerometer and gyro tracking steps against personalized daily targets.',
    icon: Footprints,
    badge: '7,842 Steps',
    accentColor: 'from-teal-500/20 to-emerald-600/10 border-teal-500/30 text-teal-300',
  },
  {
    id: 'activity',
    title: 'Active Calories',
    category: 'Readiness',
    description: 'Dynamic metabolic burn calculation adjusted for menstrual phase baseline.',
    icon: Flame,
    badge: '1,842 Kcal',
    accentColor: 'from-rose-500/20 to-orange-600/10 border-rose-500/30 text-rose-300',
  },
  {
    id: 'activity',
    title: 'Distance & Cadence',
    category: 'Readiness',
    description: 'Accurate outdoor distance measurement paired with real-time pace metrics.',
    icon: Compass,
    badge: '5.2 km Today',
    accentColor: 'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-300',
  },
  {
    id: 'home',
    title: 'Watch OS & Faces',
    category: 'Vitals',
    description: 'High-density OLED display, customizable complications, and instant haptic crown.',
    icon: Activity,
    badge: 'HerRhythm OS',
    accentColor: 'from-purple-500/20 to-lavender-600/10 border-purple-500/30 text-purple-200',
  },
];

export const FeatureShowcase: React.FC = () => {
  const { watchScreen, setWatchScreen } = useApp();

  const handleCardClick = (id: WatchScreenId) => {
    setWatchScreen(id);
    // Smooth scroll to the interactive smartwatch simulator if not already visible
    const watchElement = document.getElementById('smartwatch-simulator-section');
    if (watchElement) {
      watchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="features-showcase" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Ecosystem
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Everything she needs.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-roseHealth-300 to-teal-300">
            Right on her wrist.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Click any capability card below to dynamically switch the virtual smartwatch simulator to that screen and test its interactive features.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon;
          const isCurrentActive = watchScreen === item.id;

          return (
            <button
              key={idx}
              onClick={() => handleCardClick(item.id)}
              className={`p-5 rounded-2xl text-left transition-all duration-300 relative group overflow-hidden ${
                isCurrentActive
                  ? 'bg-gradient-to-br ' + item.accentColor + ' border-2 border-purple-400 shadow-glow-lavender scale-[1.02]'
                  : 'glass-panel-interactive hover:border-purple-500/40'
              }`}
            >
              {/* Card top banner */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 font-mono">
                    {item.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Card description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Indicator bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-medium">
                <span>{isCurrentActive ? '● Active on Watch' : 'Click to preview on watch'}</span>
                <span className="text-[11px] font-mono text-slate-500">Screen: {item.id}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
