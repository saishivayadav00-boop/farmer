import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, ShieldAlert } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'error':
        return {
          border: 'border-red-500/40',
          bg: 'bg-slate-900/95',
          text: 'text-red-400',
          icon: <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />,
          progressBg: 'bg-red-500'
        };
      case 'warning':
        return {
          border: 'border-amber-500/40',
          bg: 'bg-slate-900/95',
          text: 'text-amber-400',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          progressBg: 'bg-amber-500'
        };
      case 'info':
        return {
          border: 'border-blue-500/40',
          bg: 'bg-slate-900/95',
          text: 'text-blue-400',
          icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
          progressBg: 'bg-blue-500'
        };
      default:
        return {
          border: 'border-emerald-500/40',
          bg: 'bg-slate-900/95',
          text: 'text-emerald-400',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          progressBg: 'bg-emerald-500'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed top-24 right-6 z-50 animate-slide-in-right max-w-sm w-full">
      <div className={`glass-panel p-4 rounded-2xl border ${styles.border} ${styles.bg} shadow-2xl space-y-2 relative overflow-hidden`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {styles.icon}
            <p className="text-xs font-bold text-white leading-snug">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div className={`h-full ${styles.progressBg} animate-[pulse_1s_infinite]`} style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
}
