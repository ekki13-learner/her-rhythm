import React from 'react';
import { smartAlertsList } from '../../utils/mockData';
import { Heart, Thermometer, ShieldCheck, AlertTriangle, Wind, Info, Bell } from 'lucide-react';

export const SmartAlerts: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Heart':
        return <Heart className="w-4 h-4 text-roseHealth-400" />;
      case 'Thermometer':
        return <Thermometer className="w-4 h-4 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2 text-purple-300">
          <Bell className="w-4 h-4 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Smart Wellness & Safety Alerts</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Non-Diagnostic Sensor Heuristics
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {smartAlertsList.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                    {getIcon(alert.icon)}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {alert.title}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {alert.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {alert.summary}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40 text-[11px] text-purple-200">
              <span className="font-semibold text-purple-300 block mb-0.5">Wellness Recommendation:</span>
              <span>{alert.recommendation}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <p>
          HerRhythm biometric alerts identify physiological variance against your personal baseline. They are designed for wellness reflection and do not replace certified medical evaluation.
        </p>
      </div>
    </div>
  );
};
