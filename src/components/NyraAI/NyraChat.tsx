import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Bot, User, HelpCircle } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "How should I train during Day 14 (Ovulatory Phase)?",
  "I'm feeling tired with cramps, what do you suggest?",
  "Explain why my basal skin temperature rose +0.3°C.",
  "Analyze my sleep architecture from last night.",
];

export const NyraChat: React.FC = () => {
  const {
    nyraMessages,
    sendNyraMessage,
    isNyraThinking,
    cycleDay,
    currentDayLog,
    loggedMood,
    loggedFlow,
    loggedSymptoms,
  } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendNyraMessage(inputText);
    setInputText('');
  };

  return (
    <div className="glass-panel rounded-3xl border border-purple-500/25 flex flex-col h-[520px] overflow-hidden shadow-2xl">
      {/* Top Chat Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-roseHealth-500 flex items-center justify-center text-white shadow-glow-lavender">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">NYRA AI Companion</h3>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-purple-300">
                Active Telemetry Link
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Day {cycleDay} ({currentDayLog.phase})</span>
              <span>•</span>
              <span className="text-teal-300">Mood: {loggedMood}</span>
              {loggedSymptoms.length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-roseHealth-300">{loggedSymptoms.length} Symptoms</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:block text-right text-[11px] text-slate-400">
          <div>Continuous Infradian Synthesis</div>
          <div className="text-purple-400 font-mono">v3.4 Neuro-Model</div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {nyraMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-purple-300 border border-purple-500/30'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-tr-none shadow-md'
                    : 'bg-slate-900/90 text-slate-200 border border-purple-500/20 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.contextTag && (
                  <div className="text-[10px] font-mono uppercase tracking-wider text-purple-300 mb-1 font-semibold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    {msg.contextTag}
                  </div>
                )}
                <p>{msg.text}</p>
                <span className="text-[9px] text-slate-400 font-mono mt-1.5 block text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isNyraThinking && (
          <div className="flex items-center gap-2 text-xs text-purple-300 animate-pulse pl-9">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>NYRA is analyzing your cycle telemetry and formulating guidance...</span>
          </div>
        )}
      </div>

      {/* Preset Quick Chips */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
        <span className="text-[11px] text-slate-500 flex items-center gap-1 flex-shrink-0">
          <HelpCircle className="w-3 h-3" /> Ask:
        </span>
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => sendNyraMessage(q)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-purple-900/40 text-slate-300 hover:text-purple-200 border border-slate-800 text-xs transition-colors flex-shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-purple-500/20 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask NYRA about your cycle, sleep, workout, symptoms, or safety..."
          className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isNyraThinking}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-lavender transition-all"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
