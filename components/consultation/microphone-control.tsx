'use client';

import React from 'react';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { BarVisualizer, TrackReference } from '@livekit/components-react';

interface MicrophoneControlProps {
  connectionState: 'disconnected' | 'connecting' | 'connected' | 'error';
  isMuted: boolean;
  onToggleMute: () => void;
  onStartSession: () => void;
  onDisconnectSession: () => void;
  agentState?: string;
  audioTrack?: TrackReference;
}

export const MicrophoneControl: React.FC<MicrophoneControlProps> = ({
  connectionState,
  isMuted,
  onToggleMute,
  onStartSession,
  onDisconnectSession,
  agentState,
  audioTrack,
}) => {
  // Determine button state label and background colors based on real LiveKit connection and agent state
  let buttonLabel = 'Start Consultation';
  let statusBadge = 'READY TO CONNECT';
  let buttonColorClass = 'from-emerald-500 via-teal-600 to-emerald-600 glow-emerald';
  let icon = <Mic className="w-10 h-10 text-emerald-950" />;
  let isConnecting = false;

  if (connectionState === 'connecting') {
    buttonLabel = 'Connecting to Medico...';
    statusBadge = 'CONNECTING TO LIVEKIT';
    buttonColorClass = 'from-amber-500 to-orange-600 animate-pulse';
    icon = <Loader2 className="w-10 h-10 text-white animate-spin" />;
    isConnecting = true;
  } else if (connectionState === 'connected') {
    if (agentState === 'thinking') {
      buttonLabel = 'Medico is thinking...';
      statusBadge = 'PROCESSING REQUEST';
      buttonColorClass = 'from-cyan-500 via-blue-600 to-indigo-600 animate-pulse';
      icon = <Loader2 className="w-10 h-10 text-white animate-spin" />;
    } else if (agentState === 'speaking') {
      buttonLabel = 'Medico is responding...';
      statusBadge = 'MEDICO IS SPEAKING';
      buttonColorClass = 'from-emerald-400 via-teal-500 to-cyan-500 glow-cyan';
      icon = <Volume2 className="w-10 h-10 text-slate-950 animate-bounce-short" />;
    } else if (isMuted) {
      buttonLabel = 'Microphone Muted';
      statusBadge = 'MIC MUTED';
      buttonColorClass = 'from-red-600 to-red-800';
      icon = <MicOff className="w-10 h-10 text-white" />;
    } else {
      buttonLabel = 'Listening to your voice...';
      statusBadge = 'LISTENING';
      buttonColorClass = 'from-emerald-500 via-teal-500 to-cyan-500 glow-emerald';
      icon = <Mic className="w-10 h-10 text-slate-950" />;
    }
  } else if (connectionState === 'error') {
    buttonLabel = 'Connection Error — Try Again';
    statusBadge = 'CONNECTION FAILED';
    buttonColorClass = 'from-red-600 to-orange-600';
    icon = <Mic className="w-10 h-10 text-white" />;
  }

  const handleMainButtonClick = () => {
    if (connectionState === 'disconnected' || connectionState === 'error') {
      onStartSession();
    } else if (connectionState === 'connected') {
      onToggleMute();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      {/* Dynamic Status Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider bg-slate-900 border border-slate-800 text-slate-300">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            connectionState === 'connected'
              ? agentState === 'speaking'
                ? 'bg-cyan-400 animate-ping'
                : 'bg-emerald-400 animate-pulse'
              : connectionState === 'connecting'
              ? 'bg-amber-400 animate-ping'
              : 'bg-slate-500'
          }`}
        />
        {statusBadge}
      </div>

      {/* Audio Visualizer & Central Microphone Button */}
      <div className="relative flex items-center justify-center p-4">
        {/* Pulse Effect Rings when active */}
        {connectionState === 'connected' && !isMuted && (
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse-ring pointer-events-none" />
        )}

        <button
          onClick={handleMainButtonClick}
          disabled={isConnecting}
          aria-label={buttonLabel}
          className={`relative z-10 w-36 h-36 rounded-full bg-gradient-to-br ${buttonColorClass} p-1 flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75 disabled:cursor-wait`}
        >
          <div className="w-full h-full rounded-full bg-slate-950/90 flex flex-col items-center justify-center text-white transition-colors hover:bg-slate-950/70">
            {icon}
            <span className="mt-1 text-[11px] font-bold text-slate-200 tracking-tight">
              {connectionState === 'connected'
                ? isMuted
                  ? 'Unmute'
                  : 'Mute Mic'
                : 'Start'}
            </span>
          </div>
        </button>
      </div>

      {/* LiveKit Bar Visualizer for Agent Audio Track */}
      {connectionState === 'connected' && audioTrack && (
        <div className="w-full max-w-xs h-12 bg-slate-900/80 rounded-2xl border border-slate-800 p-2 flex items-center justify-center overflow-hidden">
          <BarVisualizer
            trackRef={audioTrack}
            barCount={16}
            options={{ minHeight: 4, maxHeight: 32 }}
            className="w-full h-full text-emerald-400"
          />
        </div>
      )}

      {/* Descriptive Status Copy */}
      <div className="space-y-1">
        <p className="text-base font-semibold text-white">{buttonLabel}</p>
        <p className="text-xs text-slate-400 max-w-xs">
          {connectionState === 'disconnected'
            ? 'Click to start live voice consultation in Telugu, Hindi, or English.'
            : connectionState === 'connected'
            ? 'Speak into your microphone. Medico listens and responds automatically.'
            : 'Connecting securely to LiveKit AI agent...'}
        </p>
      </div>

      {/* Secondary Controls (Disconnect Button when connected) */}
      {connectionState === 'connected' && (
        <div className="pt-2">
          <button
            onClick={onDisconnectSession}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-950/80 text-slate-300 hover:text-red-300 border border-slate-800 hover:border-red-800 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="w-3 h-3 bg-red-400 rounded-sm inline-block" />
            End Consultation Session
          </button>
        </div>
      )}
    </div>
  );
};
