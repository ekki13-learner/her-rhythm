import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WatchScreenId,
  UserProfile,
  HealthTelemetry,
  DayLog,
  SafetyState,
  NyraMessage,
  WorkoutProgram,
} from '../types';
import {
  initialProfile,
  initialTelemetry,
  initialSafety,
  generateCycleData,
  initialPrograms,
} from '../utils/mockData';
import {
  playClickSound,
  playHeartbeatSound,
  playSuccessChime,
  startSosSiren,
  stopSosSiren,
} from '../utils/audioFeedback';

interface AppContextType {
  // Watch Simulator State
  watchScreen: WatchScreenId;
  setWatchScreen: (screen: WatchScreenId) => void;
  batteryLevel: number;
  isConnected: boolean;

  // Profile & Onboarding
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;

  // Health Telemetry
  telemetry: HealthTelemetry;
  addHydration: (ml: number) => void;
  updateTelemetry: (data: Partial<HealthTelemetry>) => void;

  // Cycle & Women's Health
  cycleDay: number;
  setCycleDay: (day: number) => void;
  cycleData: Record<number, DayLog>;
  currentDayLog: DayLog;
  loggedFlow: 'none' | 'light' | 'moderate' | 'heavy';
  setLoggedFlow: (flow: 'none' | 'light' | 'moderate' | 'heavy') => void;
  loggedSymptoms: string[];
  toggleSymptom: (symptom: string) => void;
  loggedMood: string;
  setLoggedMood: (mood: string) => void;
  saveDayLog: (note?: string) => void;

  // Safety & SOS
  safety: SafetyState;
  triggerSos: () => void;
  dismissSos: () => void;
  toggleJourney: () => void;
  toggleSiren: () => void;

  // NYRA AI Companion
  nyraMessages: NyraMessage[];
  sendNyraMessage: (text: string, contextTag?: string) => void;
  isNyraThinking: boolean;

  // Fitness & Workouts
  programs: WorkoutProgram[];
  activeProgram: WorkoutProgram;
  setActiveProgram: (program: WorkoutProgram) => void;
  workoutPlayer: {
    isOpen: boolean;
    exerciseIndex: number;
    secondsLeft: number;
    isRunning: boolean;
  };
  openWorkoutPlayer: (program?: WorkoutProgram) => void;
  closeWorkoutPlayer: () => void;
  startPauseWorkout: () => void;
  nextExercise: () => void;
  prevExercise: () => void;
  resetExerciseTimer: () => void;

  // Demo split-view
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;

  // Audio settings
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchScreen, setWatchScreenState] = useState<WatchScreenId>('home');
  const [batteryLevel] = useState<number>(82);
  const [isConnected] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Profile & Onboarding
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Health Telemetry
  const [telemetry, setTelemetry] = useState<HealthTelemetry>(initialTelemetry);

  // Cycle data
  const [cycleData, setCycleData] = useState<Record<number, DayLog>>(generateCycleData);
  const [cycleDay, setCycleDayState] = useState<number>(14); // default Day 14 (Ovulation)
  const currentDayLog = cycleData[cycleDay] || cycleData[14];
  const [loggedFlow, setLoggedFlow] = useState<DayLog['flow']>(currentDayLog.flow);
  const [loggedSymptoms, setLoggedSymptoms] = useState<string[]>(currentDayLog.symptoms);
  const [loggedMood, setLoggedMood] = useState<string>(currentDayLog.mood);

  // Safety
  const [safety, setSafety] = useState<SafetyState>(initialSafety);

  // NYRA AI
  const [nyraMessages, setNyraMessages] = useState<NyraMessage[]>([
    {
      id: 'm1',
      sender: 'nyra',
      text: "Hello Elena. You're on Day 14 (Ovulatory Phase) of your rhythm. Your resting heart rate (62 BPM) and recovery readiness (82%) are exceptional today. How are you feeling?",
      timestamp: '09:00 AM',
      contextTag: 'Cycle Sync & Daily Readiness',
    },
  ]);
  const [isNyraThinking, setIsNyraThinking] = useState<boolean>(false);

  // Fitness
  const [programs] = useState<WorkoutProgram[]>(initialPrograms);
  const [activeProgram, setActiveProgram] = useState<WorkoutProgram>(initialPrograms[0]);
  const [workoutPlayer, setWorkoutPlayer] = useState({
    isOpen: false,
    exerciseIndex: 0,
    secondsLeft: initialPrograms[0].exercises[0].durationSeconds,
    isRunning: false,
  });

  // Demo modal
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  // Switch watch screen with audio feedback
  const setWatchScreen = (screen: WatchScreenId) => {
    if (soundEnabled) playClickSound();
    setWatchScreenState(screen);
  };

  // Switch cycle day
  const setCycleDay = (day: number) => {
    if (soundEnabled) playClickSound();
    setCycleDayState(day);
    const dayData = cycleData[day];
    if (dayData) {
      setLoggedFlow(dayData.flow);
      setLoggedSymptoms([...dayData.symptoms]);
      setLoggedMood(dayData.mood);
      // Contextual telemetry adjustments
      setTelemetry((prev) => ({
        ...prev,
        temperature: {
          ...prev.temperature,
          celsius: dayData.basalTemp,
          trend: day >= 16 ? 'Luteal Rise' : 'Follicular Baseline',
        },
        energy: {
          ...prev.energy,
          percentage: dayData.energy,
          status: dayData.energy > 75 ? 'Peak' : dayData.energy > 55 ? 'Balanced' : 'Recharge Needed',
        },
      }));
    }
  };

  // Add hydration
  const addHydration = (ml: number) => {
    if (soundEnabled) playSuccessChime();
    setTelemetry((prev) => ({
      ...prev,
      hydration: {
        ...prev.hydration,
        currentMl: Math.min(prev.hydration.goalMl + 500, prev.hydration.currentMl + ml),
      },
    }));
  };

  const updateTelemetry = (data: Partial<HealthTelemetry>) => {
    setTelemetry((prev) => ({ ...prev, ...data }));
  };

  // Toggle symptom
  const toggleSymptom = (symptom: string) => {
    if (soundEnabled) playClickSound();
    setLoggedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  // Save current day log
  const saveDayLog = (note?: string) => {
    if (soundEnabled) playSuccessChime();
    setCycleData((prev) => ({
      ...prev,
      [cycleDay]: {
        ...prev[cycleDay],
        flow: loggedFlow,
        symptoms: loggedSymptoms,
        mood: loggedMood,
        notes: note || prev[cycleDay]?.notes,
      },
    }));
  };

  // Safety: Trigger SOS
  const triggerSos = () => {
    startSosSiren();
    setSafety((prev) => ({
      ...prev,
      sosActive: true,
      sosTimestamp: new Date().toLocaleTimeString(),
      trustedContactsNotified: true,
      sirenOn: true,
    }));
    // Also change watch screen to safety
    setWatchScreenState('safety');
  };

  const dismissSos = () => {
    stopSosSiren();
    setSafety((prev) => ({
      ...prev,
      sosActive: false,
      sirenOn: false,
    }));
  };

  const toggleJourney = () => {
    if (soundEnabled) playClickSound();
    setSafety((prev) => ({
      ...prev,
      journey: {
        ...prev.journey,
        active: !prev.journey.active,
        progressPercent: !prev.journey.active ? 10 : prev.journey.progressPercent,
      },
    }));
  };

  const toggleSiren = () => {
    if (safety.sirenOn) {
      stopSosSiren();
      setSafety((prev) => ({ ...prev, sirenOn: false }));
    } else {
      startSosSiren();
      setSafety((prev) => ({ ...prev, sirenOn: true }));
    }
  };

  // NYRA Chat: contextual responses based on cycle, symptoms, and health state
  const sendNyraMessage = (text: string, contextTag?: string) => {
    if (soundEnabled) playClickSound();
    const newMsg: NyraMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contextTag,
    };
    setNyraMessages((prev) => [...prev, newMsg]);
    setIsNyraThinking(true);

    setTimeout(() => {
      let responseText = '';
      const lower = text.toLowerCase();

      if (lower.includes('cramp') || lower.includes('tired') || lower.includes('pain')) {
        responseText = `I notice you're experiencing cramps and lower energy during Cycle Day ${cycleDay} (${currentDayLog.phase} phase). Your heart rate variability indicates your nervous system needs extra restorative time. Consider prioritizing warm herbal tea with ginger, magnesium glycinate, and gentle pelvic cat-cow stretches rather than high-intensity training.`;
      } else if (lower.includes('workout') || lower.includes('exercise') || lower.includes('fitness')) {
        if (cycleDay >= 12 && cycleDay <= 16) {
          responseText = `You are in your Ovulatory Window (Cycle Day ${cycleDay}) with high estrogen and peak muscular energy (74%). Your body is primed for strength breakthroughs, HIIT, and personal bests! Remember to warm up your ligaments thoroughly as relaxin levels are slightly elevated.`;
        } else if (cycleDay <= 5) {
          responseText = `During the Menstrual Phase (Day ${cycleDay}), your progesterone and estrogen are at baseline. Your energy is naturally directed toward internal renewal. I suggest gentle yin yoga, walking, or light mobility work today.`;
        } else {
          responseText = `In your current phase (${currentDayLog.phase}), steady-state cardio, pilates, or moderate resistance training will feel energizing without overstressing cortisol.`;
        }
      } else if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('rest')) {
        responseText = `Last night you achieved 7h 42m of sleep with 1h 45m in restorative Deep sleep. Your sleep score is 88/100. During the luteal phase, core body temperature stays +0.3°C higher, which can make it harder to fall asleep—setting your bedroom temperature to 18°C (65°F) will help maintain deep sleep cycles tonight.`;
      } else if (lower.includes('safety') || lower.includes('sos') || lower.includes('walk') || lower.includes('journey')) {
        responseText = `HerRhythm's safety ecosystem is armed and connected to dual-band GPS. If you are walking alone or in an unfamiliar area, you can activate 'Watch My Journey'—I will stream your live coordinates to Maya Lin and trigger instant check-in prompts if your route deviates.`;
      } else if (lower.includes('food') || lower.includes('nutrition') || lower.includes('bloat')) {
        responseText = `To manage water retention and sustain energy in Day ${cycleDay}, focus on potassium-rich foods like avocado, bananas, and coconut water. Decreasing sodium and drinking at least 2.2L of water will paradoxically reduce luteal bloating.`;
      } else {
        responseText = `Elena, based on your current telemetry (HR 76 BPM, SpO₂ 98%, Energy ${telemetry.energy.percentage}%), your body is in an optimal restorative state. You're logged as feeling '${loggedMood}' today. What specific area of your wellness or daily routine would you like to optimize?`;
      }

      const nyraReply: NyraMessage = {
        id: 'nyra-' + Date.now(),
        sender: 'nyra',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextTag: 'Contextual Health Synthesis',
      };

      setNyraMessages((prev) => [...prev, nyraReply]);
      setIsNyraThinking(false);
      if (soundEnabled) playHeartbeatSound();
    }, 900);
  };

  // Workout Player Controls
  const openWorkoutPlayer = (prog?: WorkoutProgram) => {
    const selected = prog || activeProgram;
    setActiveProgram(selected);
    setWorkoutPlayer({
      isOpen: true,
      exerciseIndex: 0,
      secondsLeft: selected.exercises[0]?.durationSeconds || 45,
      isRunning: false,
    });
  };

  const closeWorkoutPlayer = () => {
    setWorkoutPlayer((prev) => ({ ...prev, isOpen: false, isRunning: false }));
  };

  const startPauseWorkout = () => {
    if (soundEnabled) playClickSound();
    setWorkoutPlayer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const nextExercise = () => {
    if (soundEnabled) playClickSound();
    setWorkoutPlayer((prev) => {
      const nextIdx = Math.min(activeProgram.exercises.length - 1, prev.exerciseIndex + 1);
      return {
        ...prev,
        exerciseIndex: nextIdx,
        secondsLeft: activeProgram.exercises[nextIdx].durationSeconds,
      };
    });
  };

  const prevExercise = () => {
    if (soundEnabled) playClickSound();
    setWorkoutPlayer((prev) => {
      const prevIdx = Math.max(0, prev.exerciseIndex - 1);
      return {
        ...prev,
        exerciseIndex: prevIdx,
        secondsLeft: activeProgram.exercises[prevIdx].durationSeconds,
      };
    });
  };

  const resetExerciseTimer = () => {
    setWorkoutPlayer((prev) => ({
      ...prev,
      secondsLeft: activeProgram.exercises[prev.exerciseIndex].durationSeconds,
      isRunning: false,
    }));
  };

  // Workout countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (workoutPlayer.isOpen && workoutPlayer.isRunning && workoutPlayer.secondsLeft > 0) {
      interval = setInterval(() => {
        setWorkoutPlayer((prev) => {
          if (prev.secondsLeft <= 1) {
            if (soundEnabled) playSuccessChime();
            return { ...prev, secondsLeft: 0, isRunning: false };
          }
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workoutPlayer.isOpen, workoutPlayer.isRunning, workoutPlayer.secondsLeft, soundEnabled]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
    if (soundEnabled) playSuccessChime();
  };

  return (
    <AppContext.Provider
      value={{
        watchScreen,
        setWatchScreen,
        batteryLevel,
        isConnected,
        profile,
        updateProfile,
        isOnboardingOpen,
        setIsOnboardingOpen,
        telemetry,
        addHydration,
        updateTelemetry,
        cycleDay,
        setCycleDay,
        cycleData,
        currentDayLog,
        loggedFlow,
        setLoggedFlow,
        loggedSymptoms,
        toggleSymptom,
        loggedMood,
        setLoggedMood,
        saveDayLog,
        safety,
        triggerSos,
        dismissSos,
        toggleJourney,
        toggleSiren,
        nyraMessages,
        sendNyraMessage,
        isNyraThinking,
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
        isDemoModalOpen,
        setIsDemoModalOpen,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
