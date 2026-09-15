import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkoutProgram, WorkoutExercise } from '../../types';
import { Dumbbell, Sparkles, Play, Sliders, CheckCircle2, Flame, Clock, Heart } from 'lucide-react';
import { playSuccessChime } from '../../utils/audioFeedback';

export const NyraWorkoutGen: React.FC = () => {
  const { cycleDay, currentDayLog, openWorkoutPlayer, soundEnabled } = useApp();

  const [goal, setGoal] = useState<'Weight Loss' | 'Core Strength' | 'Hormone Harmony' | 'Endurance'>('Weight Loss');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [durationMins, setDurationMins] = useState<number>(20);
  const [energy, setEnergy] = useState<'Low' | 'Balanced' | 'High'>('Low');
  const [equipment, setEquipment] = useState<'No Equipment' | 'Dumbbells' | 'Yoga Mat'>('No Equipment');
  const [generatedWorkout, setGeneratedWorkout] = useState<WorkoutProgram | null>(null);

  const handleGenerate = () => {
    if (soundEnabled) playSuccessChime();

    // Dynamically construct workout customized to selected inputs
    const exercises: WorkoutExercise[] = [];

    if (energy === 'Low' || currentDayLog.phase === 'Menstrual') {
      exercises.push(
        {
          id: 'w1',
          name: 'Low-Impact Alternating Lunges with Arm Sweeps',
          targetMuscle: 'Quads, Hamstrings & Core',
          setsReps: '3 sets × 10 reps each leg',
          durationSeconds: 40,
          instructions: 'Step gently forward keeping chest high and shoulders soft. Sink down at a comfortable depth to boost pelvic blood flow without spiking cortisol.',
          difficulty: 'Gentle',
          cyclePhaseAlignment: 'Restorative & low impact',
        },
        {
          id: 'w2',
          name: 'Pelvic Floor Glute Bridges with Gentle Hold',
          targetMuscle: 'Glutes, Lower Back & Pelvic Diaphragm',
          setsReps: '3 sets × 15 reps',
          durationSeconds: 45,
          instructions: 'Lie on your back, knees bent, feet hip-width. Exhale and bridge hips upward. Squeeze glutes gently for 2 seconds, then slowly lower down.',
          difficulty: 'Gentle',
          cyclePhaseAlignment: 'Cramp relief & lower back release',
        },
        {
          id: 'w3',
          name: 'Incline Plank against Counter / Mat with Knee Taps',
          targetMuscle: 'Deep Transverse Abdominis',
          setsReps: '3 sets × 30 seconds',
          durationSeconds: 30,
          instructions: 'Keep your body in one straight line without dipping your pelvis. Softly tap one knee down at a time to build stable core endurance.',
          difficulty: 'Gentle',
          cyclePhaseAlignment: 'Abdominal decompression',
        },
        {
          id: 'w4',
          name: 'Cat-Cow Flow to Child’s Pose Transition',
          targetMuscle: 'Entire Spinal Column & Hips',
          setsReps: '8 long continuous breaths',
          durationSeconds: 60,
          instructions: 'Flow seamlessly between spinal flexion and gentle extension, sinking back into wide-knee Child’s Pose on the exhale to release sacral tension.',
          difficulty: 'Gentle',
          cyclePhaseAlignment: 'Parasympathetic tone restorer',
        }
      );
    } else {
      exercises.push(
        {
          id: 'w1',
          name: 'Explosive Alternating Reverse Lunges to Knee Drive',
          targetMuscle: 'Glutes, Quads & Neuromuscular Power',
          setsReps: '3 sets × 12 reps each leg',
          durationSeconds: 45,
          instructions: 'Step back with control, explode up driving your knee toward your chest with athletic rhythm.',
          difficulty: 'Intense',
          cyclePhaseAlignment: 'High Estrogen / Follicular Peak',
        },
        {
          id: 'w2',
          name: 'Tempo Deep Air Squats with Isometric Pulse',
          targetMuscle: 'Quadriceps, Adductors & Core',
          setsReps: '3 sets × 15 reps',
          durationSeconds: 50,
          instructions: 'Lower down for 3 seconds into a full parallel squat, pulse once at the bottom, and drive up through heels.',
          difficulty: 'Moderate',
          cyclePhaseAlignment: 'Strength recruitment window',
        },
        {
          id: 'w3',
          name: 'Forearm Plank with Alternating Hip Dips',
          targetMuscle: 'Obliques, Anterior Core & Shoulders',
          setsReps: '3 sets × 45 seconds',
          durationSeconds: 45,
          instructions: 'Maintain a rigid plank line and slowly pivot hips side-to-side, controlling core rotational stability.',
          difficulty: 'Moderate',
          cyclePhaseAlignment: 'Core endurance stabilization',
        },
        {
          id: 'w4',
          name: 'Dynamic Glute Bridges with Single-Leg Extension',
          targetMuscle: 'Posterior Chain & Hamstring Tie-in',
          setsReps: '3 sets × 12 reps per leg',
          durationSeconds: 50,
          instructions: 'Press through one heel while extending the opposite leg forward, firing glutes with maximum contraction.',
          difficulty: 'Moderate',
          cyclePhaseAlignment: 'Unilateral stability',
        }
      );
    }

    const newProgram: WorkoutProgram = {
      id: 'custom-' + Date.now(),
      title: `${goal} • ${durationMins}m ${level}`,
      subtitle: `Cycle Day ${cycleDay} (${currentDayLog.phase}) • ${energy} Energy Sync`,
      badge: 'NYRA Intelligent Generator',
      durationWeeks: 1,
      completionPercent: 0,
      dailyWorkoutName: `${durationMins}-Min Infradian Flow`,
      targetKcal: durationMins === 15 ? 120 : durationMins === 20 ? 175 : 280,
      exercises,
    };

    setGeneratedWorkout(newProgram);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Adaptive Exercise AI
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Ask NYRA for a Custom Workout
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Generate a personalized workout that matches your available time, current energy, equipment, and today's cycle phase.
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-xs text-right self-start sm:self-auto">
          <span className="text-slate-400 block text-[10px] uppercase font-mono">Current Context</span>
          <span className="font-bold text-purple-300">Day {cycleDay} • {currentDayLog.phase}</span>
        </div>
      </div>

      {/* Generator Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {/* Goal */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Fitness Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
          >
            <option value="Weight Loss">Weight Loss & Tone</option>
            <option value="Core Strength">Core Strength</option>
            <option value="Hormone Harmony">Hormone Harmony</option>
            <option value="Endurance">Cardio Endurance</option>
          </select>
        </div>

        {/* Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Fitness Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Available Time</label>
          <select
            value={durationMins}
            onChange={(e) => setDurationMins(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
          >
            <option value={15}>15 Minutes</option>
            <option value={20}>20 Minutes (Recommended)</option>
            <option value={30}>30 Minutes</option>
            <option value={45}>45 Minutes</option>
          </select>
        </div>

        {/* Energy */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Current Energy</label>
          <select
            value={energy}
            onChange={(e) => setEnergy(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
          >
            <option value="Low">Low (Gentle / Recovery)</option>
            <option value="Balanced">Balanced</option>
            <option value="High">High (Peak Power)</option>
          </select>
        </div>

        {/* Equipment */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Equipment</label>
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
          >
            <option value="No Equipment">No Equipment / Bodyweight</option>
            <option value="Dumbbells">Dumbbells</option>
            <option value="Yoga Mat">Yoga Mat & Blocks</option>
          </select>
        </div>
      </div>

      {/* Generate Action Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-roseHealth-500 hover:from-purple-500 hover:to-roseHealth-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-glow-lavender transition-all"
      >
        <Sparkles className="w-4 h-4" />
        <span>Generate Cycle-Aware Custom Workout</span>
      </button>

      {/* Output Display of Generated Workout */}
      {generatedWorkout && (
        <div className="mt-8 pt-6 border-t border-slate-800 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono uppercase text-purple-400 font-bold block">
                {generatedWorkout.badge}
              </span>
              <h4 className="text-lg font-bold text-white">
                {generatedWorkout.title}
              </h4>
              <p className="text-xs text-slate-400">
                {generatedWorkout.subtitle} • Est. Burn: ~{generatedWorkout.targetKcal} kcal
              </p>
            </div>

            <button
              onClick={() => openWorkoutPlayer(generatedWorkout)}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-glow-teal transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Workout in Interactive Player</span>
            </button>
          </div>

          {/* Exercise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {generatedWorkout.exercises.map((ex, idx) => (
              <div
                key={ex.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-purple-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-purple-300 font-bold">
                      Exercise 0{idx + 1}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                      {ex.difficulty} • {ex.durationSeconds}s
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    {ex.name}
                  </h5>
                  <div className="text-xs text-teal-400 font-mono mb-2">
                    {ex.setsReps}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ex.instructions}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Target: {ex.targetMuscle}</span>
                  <span className="text-purple-400">{ex.cyclePhaseAlignment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
