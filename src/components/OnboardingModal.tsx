import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  User,
  Calendar,
  Heart,
  PhoneCall,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import { playSuccessChime } from '../utils/audioFeedback';

export const OnboardingModal: React.FC = () => {
  const { profile, updateProfile, isOnboardingOpen, setIsOnboardingOpen, soundEnabled } = useApp();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: profile.name,
    dob: profile.dob,
    heightCm: profile.heightCm,
    weightKg: profile.weightKg,
    cycleLengthDays: profile.cycleLengthDays,
    fitnessLevel: profile.fitnessLevel,
    contactName: profile.contacts[0]?.name || 'Maya Lin',
    contactRelation: profile.contacts[0]?.relationship || 'Sister',
    contactPhone: profile.contacts[0]?.phone || '+1 (555) 349-8821',
  });

  if (!isOnboardingOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save and close
      updateProfile({
        name: formData.name,
        dob: formData.dob,
        heightCm: Number(formData.heightCm),
        weightKg: Number(formData.weightKg),
        cycleLengthDays: Number(formData.cycleLengthDays),
        fitnessLevel: formData.fitnessLevel as any,
        contacts: [
          {
            id: 'c1',
            name: formData.contactName,
            relationship: formData.contactRelation,
            phone: formData.contactPhone,
            isPrimary: true,
            status: 'ready',
          },
        ],
      });
      if (soundEnabled) playSuccessChime();
      setIsOnboardingOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-purple-500/30 p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={() => setIsOnboardingOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step progress pills */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-purple-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Wizard Steps */}
        <div className="min-h-[300px] flex flex-col justify-between">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">Step 1 of 4 • Biometrics</span>
                <h3 className="text-2xl font-black text-white mt-1">Welcome to HerRhythm</h3>
                <p className="text-xs text-slate-300">Set up your profile to calibrate baseline health heuristics.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Your Preferred Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.heightCm}
                      onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weightKg}
                      onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">Step 2 of 4 • Infradian Rhythm</span>
                <h3 className="text-2xl font-black text-white mt-1">Cycle Intelligence Calibration</h3>
                <p className="text-xs text-slate-300">HerRhythm adapts recovery suggestions to your typical cycle duration.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Typical Cycle Length (Days)</label>
                  <select
                    value={formData.cycleLengthDays}
                    onChange={(e) => setFormData({ ...formData, cycleLengthDays: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value={26}>26 Days (Shorter)</option>
                    <option value={28}>28 Days (Standard Regular)</option>
                    <option value={30}>30 Days</option>
                    <option value={32}>32 Days (Extended)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Activity & Fitness Level</label>
                  <select
                    value={formData.fitnessLevel}
                    onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Beginner">Beginner (Gentle walking & wellness)</option>
                    <option value="Intermediate">Intermediate (Cardio & resistance 3x/week)</option>
                    <option value="Advanced">Advanced (High-performance athlete)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <span className="text-xs font-mono uppercase text-red-400 font-bold">Step 3 of 4 • Safety Shield</span>
                <h3 className="text-2xl font-black text-white mt-1">Primary Emergency Contact</h3>
                <p className="text-xs text-slate-300">Who should be instantly notified if you trigger SOS or deviate during a journey?</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Contact Full Name</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Relationship</label>
                    <input
                      type="text"
                      value={formData.contactRelation}
                      onChange={(e) => setFormData({ ...formData, contactRelation: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in text-center py-4">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto shadow-glow-teal">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-white">
                Your HerRhythm profile is ready.
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Elena, your virtual smartwatch and AI companion NYRA have synchronized your customized biometrics, cycle parameters, and safety network.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs text-slate-300 max-w-sm mx-auto space-y-1">
                <div>• User: <strong className="text-white">{formData.name}</strong></div>
                <div>• Cycle Duration: <strong className="text-purple-300">{formData.cycleLengthDays} Days</strong></div>
                <div>• Emergency Contact: <strong className="text-roseHealth-300">{formData.contactName} ({formData.contactRelation})</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Wizard Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-roseHealth-500 hover:from-purple-500 hover:to-roseHealth-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-lavender transition-all"
          >
            <span>{step === 4 ? 'Launch Configured Experience' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
