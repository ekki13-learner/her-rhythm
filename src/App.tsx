import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoryPillars } from './components/StoryPillars';
import { SmartwatchSection } from './components/SmartwatchSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { HealthDashboard } from './components/HealthDashboard';
import { WomensHealth } from './components/WomensHealth';
import { NyraSection } from './components/NyraAI/NyraSection';
import { FitnessPrograms } from './components/FitnessPrograms';
import { SafetySection } from './components/SafetyCenter/SafetySection';
import { PrivacySection } from './components/PrivacySection';
import { ExperienceDemo } from './components/ExperienceDemo';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section with 3D-styled Watch */}
          <Hero />

          {/* 2. Storytelling & Three Pillars (Understand, Personalize, Protect) */}
          <StoryPillars />

          {/* 3. Dedicated Smartwatch Simulator View */}
          <SmartwatchSection />

          {/* 4. Feature Showcase (18 Synchronized Cards) */}
          <FeatureShowcase />

          {/* 5. Health Dashboard (10 Metrics, Interactive Charts, Insights) */}
          <HealthDashboard />

          {/* 6. Women's Health Intelligence (28-day Infradian Dial, Flow & Symptoms) */}
          <WomensHealth />

          {/* 7. NYRA AI Companion (Chat, Voice to NYRA, Custom Workout Generator) */}
          <NyraSection />

          {/* 8. Fitness & Programs (Workout Player & Curated Regimens) */}
          <FitnessPrograms />

          {/* 9. Safety Center (SOS Simulator, Journey Monitoring, Smart Alerts) */}
          <SafetySection />

          {/* 10. Privacy & Control */}
          <PrivacySection />

          {/* 11. Centerpiece: Experience HerRhythm Interactive Product Demo Lab */}
          <ExperienceDemo />
        </main>

        {/* Global Footer & Device Status Widget */}
        <Footer />

        {/* Interactive Profile Onboarding Modal Wizard */}
        <OnboardingModal />
      </div>
    </AppProvider>
  );
}

export default App;
