import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { playHeartbeatSound, playSuccessChime } from '../../utils/audioFeedback';

export const NyraVoice: React.FC = () => {
  const { cycleDay, currentDayLog, soundEnabled } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [speechState, setSpeechState] = useState<'idle' | 'listening' | 'processing' | 'responded'>('idle');
  const [transcribedText, setTranscribedText] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');

  const handleStartVoice = () => {
    if (soundEnabled) playSuccessChime();
    setIsListening(true);
    setSpeechState('listening');
    setTranscribedText('Listening to your voice...');
    setVoiceResponse('');

    // Simulate voice recording and speech recognition
    setTimeout(() => {
      setSpeechState('processing');
      setTranscribedText('"I’m feeling tired and I’m having cramps today."');
    }, 2200);

    setTimeout(() => {
      setSpeechState('responded');
      setIsListening(false);
      if (soundEnabled) playHeartbeatSound();
      setVoiceResponse(
        `"Elena, I hear you. You’re on Day ${cycleDay} (${currentDayLog.phase} phase) with natural progesterone shifts. I’ve logged your fatigue and cramps. Today, I recommend skipping high-intensity cardio in favor of restorative pelvic stretching, warm chamomile tea with magnesium, and an early bedtime at 10 PM. I’ll keep checking your recovery metrics."`
      );
    }, 4000);
  };

  const handleReset = () => {
    setIsListening(false);
    setSpeechState('idle');
    setTranscribedText('');
    setVoiceResponse('');
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 relative overflow-hidden flex flex-col justify-between shadow-2xl">
      {/* Glow background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Voice to NYRA</h3>
            <p className="text-xs text-slate-400">Futuristic hands-free voice intelligence on wrist and mobile.</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-950 border border-purple-800 text-purple-300">
          Neural Audio Engine
        </span>
      </div>

      {/* Animated Orb / Listening Core */}
      <div className="py-6 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          {/* Pulsing concentric rings when listening */}
          {speechState === 'listening' && (
            <>
              <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
              <span className="absolute -inset-4 rounded-full border border-purple-400/40 animate-pulse" />
              <span className="absolute -inset-8 rounded-full border border-roseHealth-400/20 animate-pulse" style={{ animationDuration: '2s' }} />
            </>
          )}

          {/* Center Mic Button */}
          <button
            onClick={speechState === 'listening' ? handleReset : handleStartVoice}
            className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl ${
              speechState === 'listening'
                ? 'bg-gradient-to-br from-roseHealth-500 to-purple-600 text-white shadow-glow-rose scale-110'
                : speechState === 'responded'
                ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-glow-teal'
                : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-glow-lavender hover:scale-105'
            }`}
          >
            {speechState === 'listening' ? (
              <Mic className="w-8 h-8 animate-bounce" />
            ) : speechState === 'responded' ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
              {speechState === 'listening' ? 'Listening' : speechState === 'responded' ? 'Completed' : 'Tap to Speak'}
            </span>
          </button>
        </div>

        {/* Audio Waveform Bars */}
        {speechState === 'listening' && (
          <div className="flex items-center gap-1.5 h-8 mb-4">
            {[40, 80, 60, 100, 75, 90, 50, 85, 30, 95, 65, 45].map((h, idx) => (
              <div
                key={idx}
                className="w-1 bg-gradient-to-t from-purple-500 to-roseHealth-400 rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDelay: `${idx * 0.08}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Status / Transcription Card */}
        {speechState === 'idle' && (
          <p className="text-sm text-slate-300 max-w-md">
            Click the microphone to test natural speech synthesis. Try asking: <span className="text-purple-300 italic">"I'm feeling tired and I'm having cramps."</span>
          </p>
        )}

        {speechState !== 'idle' && (
          <div className="w-full max-w-lg space-y-3">
            {/* User Speech Transcription */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                Your Voice Prompt:
              </div>
              <p className="text-sm font-semibold text-white">
                {transcribedText}
              </p>
            </div>

            {/* NYRA Voice Synthesized Answer */}
            {voiceResponse && (
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-left animate-fade-in shadow-glow-lavender">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NYRA Voice Response (Synthesized Context):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  {voiceResponse}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer controls */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Simulated multi-turn voice interaction</span>
        {speechState === 'responded' && (
          <button
            onClick={handleReset}
            className="text-purple-300 font-semibold hover:underline"
          >
            Try Another Voice Query
          </button>
        )}
      </div>
    </div>
  );
};
