import React, { useState } from 'react';
import { NyraChat } from './NyraChat';
import { NyraVoice } from './NyraVoice';
import { NyraWorkoutGen } from './NyraWorkoutGen';
import { Sparkles, MessageSquare, Mic, Dumbbell, ShieldCheck, Info } from 'lucide-react';

export const NyraSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'workout'>('chat');

  return (
    <section id="nyra-ai" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Intelligent Health Companion
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-lavender-300 to-roseHealth-300">NYRA</span>
        </h2>
        <p className="text-lg sm:text-xl font-medium text-purple-200 mt-1">
          Your intelligent health companion.
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          NYRA bridges the gap between raw biometric signals and daily lived experience. By combining continuous HRV, skin temperature, sleep stages, and cycle tracking, NYRA delivers actionable, empathetic wellness guidance right when you need it.
        </p>

        {/* Feature switcher tabs */}
        <div className="inline-flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-purple-500/20 mt-8 gap-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'chat'
                ? 'bg-purple-600 text-white shadow-glow-lavender'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Interactive Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'voice'
                ? 'bg-purple-600 text-white shadow-glow-lavender'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Voice to NYRA</span>
          </button>

          <button
            onClick={() => setActiveTab('workout')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'workout'
                ? 'bg-purple-600 text-white shadow-glow-lavender'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Custom Workout Generator</span>
          </button>
        </div>
      </div>

      {/* Active Tab Component */}
      <div className="transition-all duration-300">
        {activeTab === 'chat' && <NyraChat />}
        {activeTab === 'voice' && <NyraVoice />}
        {activeTab === 'workout' && <NyraWorkoutGen />}
      </div>

      {/* Mandatory Disclaimer */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />
        <span>
          <strong>Disclaimer:</strong> NYRA provides lifestyle and wellness information and is not a substitute for professional medical diagnosis or clinical advice.
        </span>
      </div>
    </section>
  );
};
