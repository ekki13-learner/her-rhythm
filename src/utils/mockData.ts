import { HealthTelemetry, UserProfile, DayLog, WorkoutProgram, SafetyState } from '../types';

export const initialProfile: UserProfile = {
  name: 'Elena Vance',
  dob: '1998-04-12',
  heightCm: 168,
  weightKg: 62,
  cycleLengthDays: 28,
  periodDurationDays: 5,
  healthConditions: ['None reported', 'Mild seasonal allergies'],
  fitnessLevel: 'Intermediate',
  contacts: [
    {
      id: 'c1',
      name: 'Maya Lin',
      relationship: 'Sister & Primary Contact',
      phone: '+1 (555) 349-8821',
      isPrimary: true,
      status: 'ready',
    },
    {
      id: 'c2',
      name: 'Dr. Sarah Jenkins',
      relationship: 'Family Physician',
      phone: '+1 (555) 902-4411',
      isPrimary: false,
      status: 'ready',
    },
  ],
  preferences: {
    cycleTracking: true,
    fitnessTracking: true,
    sleepAnalysis: true,
    safetySharing: true,
    voiceFeedback: true,
  },
};

export const initialTelemetry: HealthTelemetry = {
  heartRate: {
    bpm: 76,
    resting: 62,
    min: 54,
    max: 138,
    status: 'Optimal',
    waveform: [72, 74, 76, 75, 73, 76, 80, 110, 50, 76, 75, 76, 74, 77, 76],
  },
  spo2: {
    percent: 98,
    status: 'Normal',
    trend: 'stable',
  },
  temperature: {
    celsius: 36.7,
    baselineDiff: 0.1,
    trend: 'Follicular Baseline',
  },
  stress: {
    score: 32,
    level: 'Calm',
    recommendation: 'Parasympathetic tone is stable. Great balance for creative focus.',
  },
  sleep: {
    score: 88,
    totalHours: 7.7,
    deepMinutes: 105,
    remMinutes: 115,
    lightMinutes: 242,
    efficiency: 92,
  },
  activity: {
    steps: 7842,
    goalSteps: 10000,
    distanceKm: 5.2,
    caloriesKcal: 1842,
    activeMinutes: 44,
  },
  hydration: {
    currentMl: 1750,
    goalMl: 2500,
  },
  energy: {
    percentage: 74,
    status: 'Peak',
    suggestedActivity: 'Ideal window for moderate cardio or resistance training.',
  },
  recovery: {
    score: 82,
    status: 'Optimal',
    sleepActivityRatio: 'Exceeded overnight restorative threshold by 12%.',
  },
};

export const initialSafety: SafetyState = {
  sosArmed: true,
  sosActive: false,
  gpsActive: true,
  coordinates: {
    lat: 37.7749,
    lng: -122.4194,
    address: 'Market St & 4th St, San Francisco, CA (Simulated GPS)',
    accuracyM: 3.5,
  },
  journey: {
    active: false,
    origin: 'Financial District Office',
    destination: 'Hayes Valley Residence',
    etaMinutes: 18,
    progressPercent: 35,
    driverOrMode: 'Walking & Metro Commute',
    lastPing: '30 seconds ago',
    deviationAlert: false,
  },
  trustedContactsNotified: false,
  sirenOn: false,
};

// Generate 28-day cycle calendar records
export function generateCycleData(): Record<number, DayLog> {
  const data: Record<number, DayLog> = {};

  for (let d = 1; d <= 28; d++) {
    let phase: DayLog['phase'] = 'Follicular';
    let flow: DayLog['flow'] = 'none';
    let symptoms: string[] = [];
    let mood = 'Calm';
    let energy = 70;
    let basalTemp = 36.4;
    let notes = '';

    if (d >= 1 && d <= 5) {
      phase = 'Menstrual';
      flow = d === 1 ? 'moderate' : d === 2 ? 'heavy' : d <= 4 ? 'moderate' : 'light';
      symptoms = d <= 3 ? ['Cramps', 'Fatigue', 'Backache'] : ['Mild Fatigue'];
      mood = d <= 2 ? 'Tired' : 'Calm';
      energy = d <= 2 ? 45 : 60;
      basalTemp = 36.4;
      notes = 'Day ' + d + ' of cycle. Prioritize magnesium-rich meals and warm hydration.';
    } else if (d >= 6 && d <= 12) {
      phase = 'Follicular';
      flow = 'none';
      symptoms = [];
      mood = d % 2 === 0 ? 'Energetic' : 'Happy';
      energy = 80 + (d - 6) * 2;
      basalTemp = 36.5;
      notes = 'Estrogen rising. Optimal mental agility and endurance capacity.';
    } else if (d >= 13 && d <= 16) {
      phase = 'Ovulatory';
      flow = 'none';
      symptoms = ['Mild Ovulation Twinge'];
      mood = 'Energetic';
      energy = 90;
      basalTemp = 36.6;
      notes = 'Peak LH surge and metabolic vitality. High neuromuscular power.';
    } else {
      phase = 'Luteal';
      flow = 'none';
      symptoms = d >= 24 ? ['Bloating', 'Headache', 'Breast tenderness'] : ['Mild Bloating'];
      mood = d >= 24 ? 'Moody' : 'Calm';
      energy = Math.max(50, 75 - (d - 17) * 2);
      basalTemp = 36.8 + (d % 2 === 0 ? 0.1 : 0);
      notes = 'Progesterone dominant. Body temperature shifts upward by ~0.3°C.';
    }

    data[d] = {
      day: d,
      phase,
      flow,
      symptoms,
      mood,
      energy,
      basalTemp: Number(basalTemp.toFixed(1)),
      notes,
    };
  }

  return data;
}

export const initialPrograms: WorkoutProgram[] = [
  {
    id: 'glow-up',
    title: 'Weight Loss Glow Up',
    subtitle: 'Cycle-Synced Metabolic & Strength Burn',
    badge: 'Trending • Infradian Sync',
    durationWeeks: 6,
    completionPercent: 68,
    dailyWorkoutName: 'Follicular Phase HIIT & Glute Sculpt',
    targetKcal: 380,
    exercises: [
      {
        id: 'ex1',
        name: 'Alternating Lunges with High Knees',
        targetMuscle: 'Quads, Glutes & Core',
        setsReps: '3 sets × 12 reps each leg',
        durationSeconds: 45,
        instructions: 'Stand tall with feet hip-width apart. Step forward into a lunge at 90°, push through your front heel, and drive your back knee upward.',
        difficulty: 'Moderate',
        cyclePhaseAlignment: 'High Estrogen / Follicular',
      },
      {
        id: 'ex2',
        name: 'Tempo Goblet Squats',
        targetMuscle: 'Gluteus Maximus & Hamstrings',
        setsReps: '3 sets × 15 reps',
        durationSeconds: 50,
        instructions: 'Lower down for 3 slow seconds, pause for 1 second at parallel depth, then explosively drive upward while exhaling.',
        difficulty: 'Moderate',
        cyclePhaseAlignment: 'High neuromuscular recruitment',
      },
      {
        id: 'ex3',
        name: 'Glute Bridges with Pulse',
        targetMuscle: 'Posterior Chain & Pelvic Floor',
        setsReps: '3 sets × 20 reps',
        durationSeconds: 60,
        instructions: 'Lie on your back with knees bent. Drive your hips upward, squeeze your glutes at the top with a 2-second pulse before controlled descent.',
        difficulty: 'Gentle',
        cyclePhaseAlignment: 'Pelvic health & lower back relief',
      },
      {
        id: 'ex4',
        name: 'Forearm Plank with Hip Dips',
        targetMuscle: 'Deep Core & Obliques',
        setsReps: '3 sets × 40 seconds',
        durationSeconds: 40,
        instructions: 'Maintain a flat neutral spine from neck to heels. Gently pivot hips side to side without collapsing lower back.',
        difficulty: 'Intense',
        cyclePhaseAlignment: 'Core stabilization',
      },
    ],
  },
  {
    id: 'yoga-women',
    title: 'Yoga for Women & Hormone Harmony',
    subtitle: 'Restorative Asanas for Pelvic Comfort & Adrenal Calming',
    badge: 'Gentle • Restorative',
    durationWeeks: 4,
    completionPercent: 85,
    dailyWorkoutName: 'Luteal & Menstrual Flow Decompress',
    targetKcal: 190,
    exercises: [
      {
        id: 'yg1',
        name: 'Supta Baddha Konasana (Reclining Bound Angle)',
        targetMuscle: 'Inner Groin, Pelvic Diaphragm & Chest',
        setsReps: 'Hold for 3 minutes',
        durationSeconds: 180,
        instructions: 'Recline with soles of feet together and knees resting outward. Place hands on your lower abdomen and breathe into pelvic space.',
        difficulty: 'Gentle',
        cyclePhaseAlignment: 'Cramp relief & parasympathetic calm',
      },
      {
        id: 'yg2',
        name: 'Cat-Cow Spinal Undulation with Rib Waves',
        targetMuscle: 'Spine, Lower Back & Abdominal Viscera',
        setsReps: '10 smooth continuous breath cycles',
        durationSeconds: 90,
        instructions: 'On hands and knees, inhale to softly drop belly and broaden collarbones. Exhale to round the spine upward, releasing neck tension.',
        difficulty: 'Gentle',
        cyclePhaseAlignment: 'Relieves backache & bloating',
      },
      {
        id: 'yg3',
        name: 'Supported Viparita Karani (Legs Up the Wall)',
        targetMuscle: 'Circulatory & Lymphatic Return',
        setsReps: 'Hold for 5 minutes',
        durationSeconds: 300,
        instructions: 'Position hips close to wall and extend legs vertically. Allow blood flow and lymphatic drainage to naturally soothe tired extremities.',
        difficulty: 'Gentle',
        cyclePhaseAlignment: 'Sleep induction & cortisol reduction',
      },
    ],
  },
];

export const smartAlertsList = [
  {
    id: 'a1',
    type: 'wellness',
    icon: 'Heart',
    title: 'Unusual Resting Heart-Rate Variation',
    summary: 'Resting BPM was 6 bpm higher than your 14-day follicular baseline overnight. Common during luteal progesterone rise or mild dehydration.',
    recommendation: 'Consider checking how you feel, drink an extra glass of water, and ensure gentle recovery today.',
    severity: 'info',
    timestamp: 'Today at 07:15 AM',
  },
  {
    id: 'a2',
    type: 'wellness',
    icon: 'Thermometer',
    title: 'Biphasic Skin Temperature Shift Detected',
    summary: 'Wrist temperature shifted +0.32°C over the past 48 hours, correlating with estimated ovulation confirmation.',
    recommendation: 'HerRhythm has automatically updated your estimated cycle phase to Early Luteal.',
    severity: 'info',
    timestamp: 'Yesterday at 06:40 AM',
  },
  {
    id: 'a3',
    type: 'safety',
    icon: 'ShieldCheck',
    title: 'Safe Arrival Geofence Verification',
    summary: 'You reached Hayes Valley Residence at 08:42 PM. Journey monitoring concluded successfully with zero alerts.',
    recommendation: 'Primary contact Maya Lin received the safe arrival notification automatically.',
    severity: 'success',
    timestamp: 'Yesterday at 08:42 PM',
  },
  {
    id: 'a4',
    type: 'safety',
    icon: 'AlertTriangle',
    title: 'Fall Detection & Motion Sensor Test',
    summary: 'Automated rapid impact sensor diagnostics completed. Dual accelerometer and gyroscopic response are operating within optimal parameters.',
    recommendation: 'Fall detection is active and will countdown 30 seconds before notifying trusted contacts if triggered.',
    severity: 'info',
    timestamp: 'Sep 12 at 11:00 AM',
  },
];
