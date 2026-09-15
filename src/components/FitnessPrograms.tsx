import React from 'react';
import { useApp } from '../context/AppContext';
import { WorkoutProgram } from '../types';
import {
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Award,
} from 'lucide-react';

export const FitnessPrograms: React.FC = () => {
  const {
    programs,
    activeProgram,
    setActiveProgram,
    workoutPlayer,
    openWorkoutPlayer,
    closeWorkoutPlayer,
    startPauseWorkout,
    nextExercise,
    prevExercise,
    resetExerciseTimer,
    setWatchScreen,
  } = useApp();

  const currentExercise = activeProgram.exercises[workoutPlayer.exerciseIndex] || activeProgram.exercises[0];

  return (
    <section id="fitness-programs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Dumbbell className="w-3.5 h-3.5" />
          Cycle-Synced Movement
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Fitness & Programs that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-purple-300 to-roseHealth-300">
            flow with her.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Match your physical exertion with your body's hormonal windows—high-estrogen strength surges, ovulatory peak PRs, and luteal restorative recovery.
        </p>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {programs.map((prog) => {
          const isSelected = activeProgram.id === prog.id;

          return (
            <div
              key={prog.id}
              className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-teal-400/60 shadow-glow-teal'
                  : 'border-purple-500/20 hover:border-teal-500/40'
              }`}
            >
              <div>
                {/* Badge & Week indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-mono font-bold">
                    {prog.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {prog.durationWeeks} Weeks Plan
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  {prog.title}
                </h3>
                <p className="text-sm text-purple-200/80 mb-6">
                  {prog.subtitle}
                </p>

                {/* Progress Bar */}
                <div className="mb-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-300">Program Completion</span>
                    <span className="text-teal-400 font-mono">{prog.completionPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-purple-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${prog.completionPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                    <span>Daily: <strong>{prog.dailyWorkoutName}</strong></span>
                    <span className="flex items-center gap-1 text-orange-400 font-mono">
                      <Flame className="w-3.5 h-3.5" /> {prog.targetKcal} kcal
                    </span>
                  </div>
                </div>

                {/* Exercise Preview Chips */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                    Curated Exercises ({prog.exercises.length} movements):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {prog.exercises.slice(0, 4).map((ex, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-200 font-medium truncate">{ex.name}</span>
                        <span className="text-[10px] text-teal-400 font-mono flex-shrink-0 ml-1">{ex.durationSeconds}s</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => openWorkoutPlayer(prog)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-teal transition-all"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start Workout Player</span>
                </button>

                <button
                  onClick={() => {
                    setActiveProgram(prog);
                    setWatchScreen('activity');
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
                >
                  View on Watch
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Workout Screen / Player Modal Overlay */}
      {workoutPlayer.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-teal-500/30 p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between">
            {/* Close modal button */}
            <button
              onClick={closeWorkoutPlayer}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Bar */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                {activeProgram.title} • Exercise {workoutPlayer.exerciseIndex + 1} of {activeProgram.exercises.length}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {currentExercise.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-800 font-mono text-teal-300 font-bold">
                  {currentExercise.setsReps}
                </span>
                <span>•</span>
                <span className="text-purple-300">Phase Match: {currentExercise.cyclePhaseAlignment}</span>
              </div>
            </div>

            {/* Big Countdown Timer and Circle */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    className="stroke-slate-800 fill-none"
                    strokeWidth="10"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    className="stroke-teal-400 fill-none transition-all duration-1000"
                    strokeWidth="10"
                    strokeDasharray="527"
                    strokeDashoffset={
                      527 - (527 * workoutPlayer.secondsLeft) / (currentExercise.durationSeconds || 45)
                    }
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl font-black font-mono text-white tracking-tight">
                    {workoutPlayer.secondsLeft}
                  </span>
                  <span className="text-xs uppercase font-mono text-slate-400 mt-1">
                    {workoutPlayer.secondsLeft === 0 ? 'Completed!' : 'Seconds Left'}
                  </span>
                </div>
              </div>

              {/* Form Instructions */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-lg text-center">
                <div className="text-[11px] font-mono uppercase text-teal-400 font-bold mb-1">
                  Movement Coaching Cue:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  "{currentExercise.instructions}"
                </p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={prevExercise}
                disabled={workoutPlayer.exerciseIndex === 0}
                className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 transition-all"
                title="Previous Exercise"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={startPauseWorkout}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-glow-teal transition-all"
              >
                {workoutPlayer.isRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-slate-950" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-slate-950" />
                    <span>{workoutPlayer.secondsLeft === 0 ? 'Restart' : 'Start Timer'}</span>
                  </>
                )}
              </button>

              <button
                onClick={resetExerciseTimer}
                className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-all"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={nextExercise}
                disabled={workoutPlayer.exerciseIndex === activeProgram.exercises.length - 1}
                className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 transition-all"
                title="Next Exercise"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
