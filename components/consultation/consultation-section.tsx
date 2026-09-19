'use client';

import React, { useState, useCallback } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import { MicrophoneControl } from './microphone-control';
import { SystemStatusPanel } from './system-status-panel';
import { TranscriptPanel, TranscriptMessage } from './transcript-panel';
import { ConsultationRoom } from './consultation-room';
import { AlertCircle, Lock, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export const ConsultationSection: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [livekitUrl, setLivekitUrl] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Start Voice Consultation: Fetches token from POST /api/token
  // Start Voice Consultation: Fetches token from POST /api/token
  const startConsultation = useCallback(async () => {
    setIsConnecting(true);
    setErrorMessage(null);

    try {
      console.log('[LiveKit Stage] 1/4 Requesting microphone permission...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (micErr) {
        console.error('[LiveKit Stage] Microphone permission error:', micErr);
        setErrorMessage(
          '[MICROPHONE_PERMISSION_ERROR] Microphone access is required for voice consultation. Please allow microphone access in your browser and try again.'
        );
        setIsConnecting(false);
        return;
      }

      console.log('[LiveKit Stage] 2/4 Fetching token from /api/token...');
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentName: 'my-agent' }),
      });

      console.log(`[LiveKit Stage] 2/4 Token response status: ${res.status}`);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`[TOKEN_ENDPOINT_ERROR] ${errorData.message || `Token request failed with status ${res.status}.`}`);
      }

      const data = await res.json();
      const sessionToken = data.token || data.participant_token;
      const sessionUrl = data.url || data.server_url;

      if (!sessionToken || !sessionUrl) {
        throw new Error('[TOKEN_ENDPOINT_ERROR] Server returned incomplete connection details (missing token or URL).');
      }

      console.log('[LiveKit Stage] 3/4 Token obtained. Initializing LiveKit room connection...');
      setToken(sessionToken);
      setLivekitUrl(sessionUrl);
    } catch (err: unknown) {
      console.error('[LiveKit Stage] Connection error:', err);
      const msg = err instanceof Error ? err.message : '[NETWORK_ERROR] Unable to connect to the AI agent. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // End Session / Disconnect
  const handleDisconnectSession = useCallback(() => {
    console.log('[LiveKit Stage] Disconnected session reset.');
    setToken(null);
    setLivekitUrl(null);
    setIsConnecting(false);
  }, []);

  // New Consultation: Disconnects and resets state
  const handleNewConsultation = useCallback(() => {
    handleDisconnectSession();
    setErrorMessage(null);
  }, [handleDisconnectSession]);

  return (
    <section id="consultation" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE AI VOICE SESSION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Live AI Health Consultation
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Speak naturally. Medico listens, processes your request through its AI agent, and responds through voice in Telugu, Hindi, or English.
          </p>
        </div>

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="max-w-3xl mx-auto bg-red-950/90 border-2 border-red-500/80 rounded-2xl p-5 shadow-xl text-white space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-red-200">Session Error</h4>
                <p className="text-xs text-red-300 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={startConsultation}
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Active Consultation Room vs Disconnected State */}
        {token && livekitUrl ? (
          <LiveKitRoom
            token={token}
            serverUrl={livekitUrl}
            connect={true}
            audio={true}
            video={false}
            onConnected={() => {
              console.log('[LiveKit Stage] 4/4 Successfully connected to LiveKit room. Waiting for agent dispatch...');
            }}
            onDisconnected={() => {
              console.log('[LiveKit Stage] LiveKit room disconnected.');
              handleDisconnectSession();
            }}
            onError={(err) => {
              console.error('[LiveKit Stage] LiveKitRoom error:', err);
              setErrorMessage(`[LIVEKIT_CONNECTION_ERROR] ${err.message || 'LiveKit voice connection error. Please try again.'}`);
              handleDisconnectSession();
            }}
            className="w-full"
          >
            <ConsultationRoom
              onDisconnectSession={handleDisconnectSession}
              onNewConsultation={handleNewConsultation}
            />
          </LiveKitRoom>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Empty Transcript Placeholder */}
            <div className="lg:col-span-7">
              <TranscriptPanel
                messages={[]}
                onNewConsultation={handleNewConsultation}
                isConnected={false}
              />
            </div>

            {/* Right Column: Microphone Control Teaser & System Status */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel rounded-3xl border border-slate-800/80 p-6 shadow-2xl space-y-6">
                <MicrophoneControl
                  connectionState={isConnecting ? 'connecting' : 'disconnected'}
                  isMuted={false}
                  onToggleMute={() => {}}
                  onStartSession={startConsultation}
                  onDisconnectSession={() => {}}
                />
              </div>

              <SystemStatusPanel connectionState={isConnecting ? 'connecting' : 'disconnected'} />
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="max-w-md mx-auto text-center pt-2">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            Your browser microphone is used only for the live voice session. Transcripts are kept in memory during your session.
          </p>
        </div>
      </div>
    </section>
  );
};
