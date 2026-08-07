import React from 'react';
import { Sprout, Sparkles } from 'lucide-react';

export default function LoadingScreen({ message = 'Loading AgriConnect Telemetry...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl">
      <div className="text-center space-y-6 max-w-sm px-4">
        
        {/* Pulsing Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-emerald-500/30 rounded-3xl blur-xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-3xl bg-slate-900 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-2xl">
            <Sprout className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
            AgriConnect AI <Sparkles className="w-4 h-4 text-emerald-400" />
          </h3>
          <p className="text-xs text-slate-400 animate-pulse">{message}</p>
        </div>

        {/* Spinner Bar */}
        <div className="w-48 mx-auto bg-slate-900 border border-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 animate-[shimmer_1.5s_infinite]" style={{ width: '100%' }} />
        </div>

      </div>
    </div>
  );
}
