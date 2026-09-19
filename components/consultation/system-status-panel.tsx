'use client';

import React from 'react';
import { Cpu, Database, Network, ShieldCheck, Zap } from 'lucide-react';
import { EmergencyAlert } from './emergency-alert';

interface SystemStatusPanelProps {
  connectionState: 'disconnected' | 'connecting' | 'connected' | 'error';
  emergencyDetected?: boolean;
  emergencyMessage?: string;
  onDismissEmergency?: () => void;
}

export const SystemStatusPanel: React.FC<SystemStatusPanelProps> = ({
  connectionState,
  emergencyDetected,
  emergencyMessage,
  onDismissEmergency,
}) => {
  return (
    <div className="space-y-4">
      {/* Emergency Red Flag Alert (If triggered) */}
      {emergencyDetected && (
        <EmergencyAlert message={emergencyMessage} onDismiss={onDismissEmergency} />
      )}

      {/* Connection & System Metadata Card */}
      <div className="glass-panel rounded-3xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white tracking-wide">System Connection</h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">LiveKit RTC</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Connection Status */}
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Status</span>
            <div className="flex items-center gap-1.5 font-bold">
              <span
                className={`w-2 h-2 rounded-full ${
                  connectionState === 'connected'
                    ? 'bg-emerald-400 animate-pulse'
                    : connectionState === 'connecting'
                    ? 'bg-amber-400 animate-ping'
                    : 'bg-slate-500'
                }`}
              />
              <span
                className={
                  connectionState === 'connected'
                    ? 'text-emerald-400'
                    : connectionState === 'connecting'
                    ? 'text-amber-400'
                    : 'text-slate-400'
                }
              >
                {connectionState.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Agent Target */}
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Deployed Agent</span>
            <div className="font-mono font-bold text-teal-300 truncate">my-agent</div>
          </div>

          {/* STT Engine */}
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">STT Engine</span>
            <div className="font-semibold text-slate-200 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Gladia Multilingual
            </div>
          </div>

          {/* Knowledge RAG Index */}
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Knowledge Index</span>
            <div className="font-semibold text-cyan-300 flex items-center gap-1">
              <Database className="w-3 h-3 text-cyan-400" />
              rural-health
            </div>
          </div>
        </div>

        {/* MOSS Grounding Explanation */}
        <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/90 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            MOSS Knowledge Grounding Active
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Medico&apos;s backend retrieves relevant health information from its curated{' '}
            <code className="text-cyan-300 font-mono">rural-health</code> knowledge base before generating substantive guidance.
          </p>
        </div>
      </div>
    </div>
  );
};
