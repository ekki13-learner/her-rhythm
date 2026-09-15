import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WatchScreenId } from '../../types';
import { WatchHome } from './screens/WatchHome';
import { WatchHeartRate } from './screens/WatchHeartRate';
import { WatchSpO2 } from './screens/WatchSpO2';
import { WatchTemperature } from './screens/WatchTemperature';
import { WatchStress } from './screens/WatchStress';
import { WatchSleep } from './screens/WatchSleep';
import { WatchActivity } from './screens/WatchActivity';
import { WatchCycle } from './screens/WatchCycle';
import { WatchSymptoms } from './screens/WatchSymptoms';
import { WatchMood } from './screens/WatchMood';
import { WatchHydration } from './screens/WatchHydration';
import { WatchEnergy } from './screens/WatchEnergy';
import { WatchRecovery } from './screens/WatchRecovery';
import { WatchNyra } from './screens/WatchNyra';
import { WatchSafety } from './screens/WatchSafety';
import { RotateCw, ChevronLeft, ChevronRight, Home, Shield, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/audioFeedback';

interface SmartwatchHardwareProps {
  size?: 'sm' | 'md' | 'lg';
  showControls?: boolean;
}

const SCREENS_ORDER: WatchScreenId[] = [
  'home',
  'heart',
  'spo2',
  'temp',
  'stress',
  'sleep',
  'activity',
  'cycle',
  'symptoms',
  'mood',
  'hydration',
  'energy',
  'recovery',
  'nyra',
  'safety',
];

export const SmartwatchHardware: React.FC<SmartwatchHardwareProps> = ({
  size = 'md',
  showControls = true,
}) => {
  const { watchScreen, setWatchScreen, soundEnabled } = useApp();
  const [crownRotation, setCrownRotation] = useState(0);

  const currentIndex = SCREENS_ORDER.indexOf(watchScreen);

  const handleNext = () => {
    setCrownRotation((r) => r + 45);
    const nextIdx = (currentIndex + 1) % SCREENS_ORDER.length;
    setWatchScreen(SCREENS_ORDER[nextIdx]);
  };

  const handlePrev = () => {
    setCrownRotation((r) => r - 45);
    const prevIdx = (currentIndex - 1 + SCREENS_ORDER.length) % SCREENS_ORDER.length;
    setWatchScreen(SCREENS_ORDER[prevIdx]);
  };

  const handleCrownClick = () => {
    if (soundEnabled) playClickSound();
    setCrownRotation((r) => r + 90);
    // Crown click toggles back to home, or if already home, opens Heart Rate
    if (watchScreen === 'home') {
      setWatchScreen('heart');
    } else {
      setWatchScreen('home');
    }
  };

  const handleSideButtonClick = () => {
    if (soundEnabled) playClickSound();
    // Side button jumps to emergency safety or home
    if (watchScreen === 'safety') {
      setWatchScreen('home');
    } else {
      setWatchScreen('safety');
    }
  };

  const renderScreen = () => {
    switch (watchScreen) {
      case 'home':
        return <WatchHome />;
      case 'heart':
        return <WatchHeartRate />;
      case 'spo2':
        return <WatchSpO2 />;
      case 'temp':
        return <WatchTemperature />;
      case 'stress':
        return <WatchStress />;
      case 'sleep':
        return <WatchSleep />;
      case 'activity':
        return <WatchActivity />;
      case 'cycle':
        return <WatchCycle />;
      case 'symptoms':
        return <WatchSymptoms />;
      case 'mood':
        return <WatchMood />;
      case 'hydration':
        return <WatchHydration />;
      case 'energy':
        return <WatchEnergy />;
      case 'recovery':
        return <WatchRecovery />;
      case 'nyra':
        return <WatchNyra />;
      case 'safety':
        return <WatchSafety />;
      default:
        return <WatchHome />;
    }
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Smartwatch Enclosure Container */}
      <div className="relative flex flex-col items-center">
        {/* Top Silicone Strap */}
        <div className="w-28 sm:w-32 h-14 sm:h-16 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 rounded-t-3xl border-t border-x border-slate-600/40 shadow-inner flex flex-col items-center justify-end pb-1 space-y-1 overflow-hidden opacity-90">
          <div className="w-12 h-1 bg-slate-900/60 rounded-full" />
          <div className="w-12 h-1 bg-slate-900/60 rounded-full" />
          <div className="w-12 h-1 bg-slate-900/60 rounded-full" />
        </div>

        {/* Watch Chassis Body */}
        <div className="relative w-[260px] sm:w-[280px] h-[330px] sm:h-[350px] rounded-[52px] bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 p-3.5 shadow-2xl border-2 border-slate-600/40 transition-all duration-300">
          {/* Outer Metallic Bevel / Rose Gold Accent Ring */}
          <div className="absolute inset-1 rounded-[46px] border border-lavender-400/20 pointer-events-none shadow-watch-bevel" />

          {/* Digital Crown (Top Right Hardware Component) */}
          <button
            onClick={handleCrownClick}
            title="Digital Crown (Click for Home / App Switcher)"
            className="absolute -right-3 top-16 w-3.5 h-12 bg-gradient-to-r from-slate-700 via-slate-400 to-slate-800 rounded-r-md border border-slate-500 shadow-md cursor-pointer hover:brightness-110 active:scale-95 transition-transform flex items-center justify-center group"
            style={{ transform: `rotate(${crownRotation}deg)` }}
          >
            <div className="w-1 h-8 bg-slate-900/40 rounded-full" />
            <span className="sr-only">Digital Crown</span>
          </button>

          {/* Side Button (Bottom Right Hardware Component) */}
          <button
            onClick={handleSideButtonClick}
            title="Side Action Button (SOS / Power)"
            className="absolute -right-2.5 top-36 w-2.5 h-10 bg-gradient-to-r from-slate-700 via-roseHealth-700/60 to-slate-800 rounded-r-sm border border-slate-500 shadow-md cursor-pointer hover:brightness-125 active:scale-95 transition-transform"
          >
            <span className="sr-only">Side Button</span>
          </button>

          {/* Inner Curved Glass Screen Frame */}
          <div className="relative w-full h-full rounded-[38px] bg-black overflow-hidden border border-slate-800 shadow-inner flex flex-col">
            {/* Glossy Sapphire Glass Glare Overlay */}
            <div className="absolute inset-0 watch-screen-glare z-20 pointer-events-none" />

            {/* Active Watch Display Screen */}
            <div className="relative z-10 w-full h-full">
              {renderScreen()}
            </div>
          </div>
        </div>

        {/* Bottom Silicone Strap */}
        <div className="w-28 sm:w-32 h-14 sm:h-16 bg-gradient-to-t from-slate-800 via-slate-700 to-slate-900 rounded-b-3xl border-b border-x border-slate-600/40 shadow-inner flex flex-col items-center justify-start pt-1 space-y-1 overflow-hidden opacity-90">
          <div className="w-12 h-1 bg-slate-900/60 rounded-full" />
          <div className="w-12 h-1 bg-slate-900/60 rounded-full" />
          <div className="w-12 h-1 bg-slate-900/60 rounded-full" />
        </div>
      </div>

      {/* Hardware Interactive Navigation Controls Below Watch */}
      {showControls && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-purple-500/20 shadow-lg">
            <button
              onClick={handlePrev}
              title="Previous Screen"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setWatchScreen('home')}
              title="Watch Face / Home"
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                watchScreen === 'home'
                  ? 'bg-purple-600 text-white shadow-glow-lavender'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Watch Home</span>
            </button>

            <button
              onClick={() => setWatchScreen('nyra')}
              title="NYRA AI"
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                watchScreen === 'nyra'
                  ? 'bg-purple-600 text-white shadow-glow-lavender'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>NYRA</span>
            </button>

            <button
              onClick={() => setWatchScreen('safety')}
              title="Safety SOS"
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                watchScreen === 'safety'
                  ? 'bg-red-600 text-white shadow-glow-sos'
                  : 'text-slate-400 hover:text-roseHealth-300'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>

            <button
              onClick={handleNext}
              title="Next Screen"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <RotateCw className="w-3 h-3 text-purple-400" />
            <span>Click digital crown or arrows to cycle all 15 screens</span>
          </div>
        </div>
      )}
    </div>
  );
};
