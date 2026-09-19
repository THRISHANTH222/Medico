'use client';

import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';

interface EmergencyAlertProps {
  message?: string;
  onDismiss?: () => void;
}

export const EmergencyAlert: React.FC<EmergencyAlertProps> = ({
  message = 'Some symptoms may require immediate professional or emergency medical assistance.',
  onDismiss,
}) => {
  return (
    <div className="bg-red-950/90 border-2 border-red-500/80 rounded-2xl p-5 shadow-2xl shadow-red-950/60 animate-bounce-short text-white space-y-3 relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-start gap-3.5">
        <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-md flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-red-100 tracking-wide uppercase">
              URGENT MEDICAL ATTENTION
            </h4>
            <span className="text-[10px] bg-red-900 text-red-200 px-2 py-0.5 rounded-full font-semibold border border-red-700">
              EMERGENCY WARNING
            </span>
          </div>
          <p className="text-sm text-red-200 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <a
          href="tel:108"
          className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          Seek Emergency Services (108 / 112)
        </a>
        <p className="text-[11px] text-red-300 font-medium">
          Do not delay seeking professional emergency care.
        </p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-red-400 hover:text-white text-xs underline cursor-pointer"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
