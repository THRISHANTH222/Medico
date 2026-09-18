'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useVoiceAssistant,
  useRoomContext,
  useConnectionState,
} from '@livekit/components-react';
import { ConnectionState, RoomEvent, TranscriptionSegment, Participant, ParticipantKind } from 'livekit-client';
import { Mic, MicOff, PhoneOff, AlertCircle, RefreshCw, Activity, HeartPulse, ShieldAlert } from 'lucide-react';
import { fetchLiveKitToken, ConnectionDetails } from '@/lib/livekit';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export function VoiceTester() {
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error' | 'ended'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startConversation = async () => {
    setStatus('connecting');
    setErrorMessage(null);
    try {
      console.log('[LiveKit] Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop temporary track, LiveKitRoom will handle microphone publishing
      stream.getTracks().forEach((track) => track.stop());

      console.log('[LiveKit] Fetching connection token...');
      const details = await fetchLiveKitToken();
      setConnectionDetails(details);
      setStatus('connected');
    } catch (err: unknown) {
      console.error('[LiveKit] Connection start error:', err);
      setStatus('error');
      if (err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
        setErrorMessage('Microphone access is required to use voice conversation. Please grant microphone permission in your browser and try again.');
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to connect to the voice assistant. Please verify your connection and try again.');
      }
    }
  };

  const endConversation = () => {
    setConnectionDetails(null);
    setStatus('ended');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {status === 'idle' && (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-6">
            <HeartPulse className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Rural Health AI
          </h1>
          <p className="text-emerald-400 font-medium text-lg mb-4">
            Voice-first health assistance & triage support
          </p>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Speak naturally and ask your health-related questions. Our voice assistant uses real-time medical knowledge retrieval to support your health inquiries.
          </p>

          <button
            onClick={startConversation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95 cursor-pointer"
          >
            <Mic className="w-6 h-6" />
            Start Conversation
          </button>
        </div>
      )}

      {status === 'connecting' && (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 animate-spin">
            <RefreshCw className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connecting to Assistant...</h2>
          <p className="text-slate-400 text-sm">Requesting microphone access and establishing LiveKit secure voice connection.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-slate-900/80 backdrop-blur-md border border-red-900/50 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Connection Failed</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            {errorMessage || 'Unable to establish connection with the voice assistant.'}
          </p>
          <button
            onClick={startConversation}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      )}

      {status === 'ended' && (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center p-4 bg-slate-800 border border-slate-700 rounded-2xl mb-6">
            <PhoneOff className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Conversation Ended</h2>
          <p className="text-slate-400 text-sm mb-8">Thank you for testing the Rural Health Voice Assistant.</p>
          <button
            onClick={startConversation}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition cursor-pointer"
          >
            <Mic className="w-5 h-5" />
            Start New Conversation
          </button>
        </div>
      )}

      {status === 'connected' && connectionDetails && (
        <LiveKitRoom
          token={connectionDetails.token}
          serverUrl={connectionDetails.url}
          connect={true}
          audio={true}
          video={false}
          onDisconnected={endConversation}
          onError={(error) => {
            console.error('[LiveKit] Room error:', error);
            setErrorMessage(error.message);
            setStatus('error');
          }}
          className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <RoomAudioRenderer />
          <ActiveVoiceSession onEndSession={endConversation} />
        </LiveKitRoom>
      )}

      {/* Safety Disclaimer Banner */}
      <div className="mt-6 p-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl flex items-start gap-3 text-xs text-slate-400">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Educational health assistance only.</strong> This service does not diagnose medical conditions or replace a qualified healthcare professional. For emergencies, contact local emergency services or seek urgent medical care immediately.
        </p>
      </div>
    </div>
  );
}

function ActiveVoiceSession({ onEndSession }: { onEndSession: () => void }) {
  const room = useRoomContext();
  const connectionState = useConnectionState();
  const { state: agentState } = useVoiceAssistant();
  const [messages, setMessages] = useState<Message[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for LiveKit real-time transcriptions
  useEffect(() => {
    if (!room) return;

    const handleTranscription = (segments: TranscriptionSegment[], participant?: Participant) => {
      const isAgent = participant?.kind === ParticipantKind.AGENT || participant?.identity.includes('agent');
      const sender = isAgent ? 'assistant' : 'user';

      for (const segment of segments) {
        if (!segment.text.trim()) continue;

        setMessages((prev) => {
          const existingIdx = prev.findIndex((m) => m.id === segment.id);
          const formattedMessage: Message = {
            id: segment.id,
            sender,
            text: segment.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          if (existingIdx !== -1) {
            const updated = [...prev];
            updated[existingIdx] = formattedMessage;
            return updated;
          } else {
            return [...prev, formattedMessage];
          }
        });
      }
    };

    room.on(RoomEvent.TranscriptionReceived, handleTranscription);

    return () => {
      room.off(RoomEvent.TranscriptionReceived, handleTranscription);
    };
  }, [room]);

  const isConnected = connectionState === ConnectionState.Connected;
  const isSpeaking = agentState === 'speaking';
  const isThinking = agentState === 'thinking';

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Rural Health AI</h3>
            <span className="text-xs text-slate-400">Live Voice Session</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Connected
        </div>
      </div>

      {/* Voice Status Indicator */}
      <div className="flex flex-col items-center justify-center py-6">
        <div className={`relative p-6 rounded-full transition-all duration-500 ${
          isSpeaking
            ? 'bg-blue-500/20 text-blue-400 pulse-speaking'
            : isConnected
            ? 'bg-emerald-500/20 text-emerald-400 pulse-active'
            : 'bg-slate-800 text-slate-400'
        }`}>
          {isSpeaking ? (
            <Activity className="w-12 h-12 animate-pulse" />
          ) : (
            <Mic className="w-12 h-12" />
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-lg font-bold text-white">
            {isSpeaking
              ? 'Assistant Speaking...'
              : isThinking
              ? 'Assistant Thinking...'
              : isConnected
              ? 'Listening...'
              : 'Connecting...'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {isSpeaking
              ? 'Listen to the health response'
              : 'Speak clearly into your microphone'}
          </p>
        </div>
      </div>

      {/* Conversation Transcript Area */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 h-64 overflow-y-auto flex flex-col gap-3">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Live Conversation Transcript
        </div>

        {messages.length === 0 ? (
          <div className="my-auto text-center text-slate-500 text-sm italic">
            Say &quot;Hello&quot; or ask a health question to start the conversation...
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div className="text-[10px] text-slate-400 mb-1 px-1">
                {msg.sender === 'user' ? 'You' : 'Assistant'} • {msg.timestamp}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={transcriptEndRef} />
      </div>

      {/* Action Footer */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onEndSession}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold rounded-2xl transition cursor-pointer"
        >
          <PhoneOff className="w-5 h-5" />
          End Conversation
        </button>
      </div>
    </div>
  );
}
