export type WatchScreenId =
  | 'home'
  | 'heart'
  | 'spo2'
  | 'temp'
  | 'stress'
  | 'sleep'
  | 'activity'
  | 'cycle'
  | 'symptoms'
  | 'mood'
  | 'hydration'
  | 'energy'
  | 'recovery'
  | 'nyra'
  | 'safety';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
  status: 'active' | 'notified' | 'ready';
}

export interface UserProfile {
  name: string;
  dob: string;
  heightCm: number;
  weightKg: number;
  cycleLengthDays: number;
  periodDurationDays: number;
  healthConditions: string[];
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  contacts: EmergencyContact[];
  preferences: {
    cycleTracking: boolean;
    fitnessTracking: boolean;
    sleepAnalysis: boolean;
    safetySharing: boolean;
    voiceFeedback: boolean;
  };
}

export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulatory' | 'Luteal';

export interface DayLog {
  day: number;
  phase: CyclePhase;
  flow: 'none' | 'light' | 'moderate' | 'heavy';
  symptoms: string[];
  mood: string;
  energy: number; // 1-100
  basalTemp: number; // e.g. 36.4 to 37.0
  notes?: string;
}

export interface HealthTelemetry {
  heartRate: {
    bpm: number;
    resting: number;
    min: number;
    max: number;
    status: 'Optimal' | 'Elevated' | 'Resting';
    waveform: number[];
  };
  spo2: {
    percent: number;
    status: 'Normal' | 'Monitor';
    trend: 'stable' | 'rising' | 'dipping';
  };
  temperature: {
    celsius: number;
    baselineDiff: number;
    trend: 'Follicular Baseline' | 'Luteal Rise' | 'Neutral';
  };
  stress: {
    score: number; // 0-100
    level: 'Calm' | 'Moderate' | 'Elevated';
    recommendation: string;
  };
  sleep: {
    score: number;
    totalHours: number;
    deepMinutes: number;
    remMinutes: number;
    lightMinutes: number;
    efficiency: number;
  };
  activity: {
    steps: number;
    goalSteps: number;
    distanceKm: number;
    caloriesKcal: number;
    activeMinutes: number;
  };
  hydration: {
    currentMl: number;
    goalMl: number;
  };
  energy: {
    percentage: number;
    status: 'Peak' | 'Balanced' | 'Recharge Needed';
    suggestedActivity: string;
  };
  recovery: {
    score: number;
    status: 'Optimal' | 'Adequate' | 'Rest Suggested';
    sleepActivityRatio: string;
  };
}

export interface SafetyState {
  sosArmed: boolean;
  sosActive: boolean;
  sosTimestamp?: string;
  gpsActive: boolean;
  coordinates: {
    lat: number;
    lng: number;
    address: string;
    accuracyM: number;
  };
  journey: {
    active: boolean;
    origin: string;
    destination: string;
    etaMinutes: number;
    progressPercent: number;
    driverOrMode: string;
    lastPing: string;
    deviationAlert: boolean;
  };
  trustedContactsNotified: boolean;
  sirenOn: boolean;
}

export interface NyraMessage {
  id: string;
  sender: 'user' | 'nyra';
  text: string;
  timestamp: string;
  contextTag?: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  targetMuscle: string;
  setsReps: string;
  durationSeconds: number;
  instructions: string;
  difficulty: 'Gentle' | 'Moderate' | 'Intense';
  cyclePhaseAlignment: string;
}

export interface WorkoutProgram {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  durationWeeks: number;
  completionPercent: number;
  dailyWorkoutName: string;
  targetKcal: number;
  exercises: WorkoutExercise[];
}
