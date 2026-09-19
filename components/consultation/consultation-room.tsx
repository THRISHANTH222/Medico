'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  RoomAudioRenderer,
  useConnectionState,
  useVoiceAssistant,
  useLocalParticipant,
  useRoomContext,
} from '@livekit/components-react';
import { ConnectionState, RoomEvent } from 'livekit-client';
import { MicrophoneControl } from './microphone-control';
import { TranscriptPanel, TranscriptMessage } from './transcript-panel';
import { SystemStatusPanel } from './system-status-panel';

interface ConsultationRoomProps {
  onDisconnectSession: () => void;
  onNewConsultation: () => void;
}

export const ConsultationRoom: React.FC<ConsultationRoomProps> = ({
  onDisconnectSession,
  onNewConsultation,
}) => {
  const room = useRoomContext();
  const connState = useConnectionState();
  const { state: agentState, audioTrack } = useVoiceAssistant();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();

  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [emergencyDetected, setEmergencyDetected] = useState<boolean>(false);
  const [emergencyMessage, setEmergencyMessage] = useState<string>('');

  // Map LiveKit connection state to simple string format
  let simpleState: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';
  if (connState === ConnectionState.Connected) {
    simpleState = 'connected';
  } else if (connState === ConnectionState.Connecting || connState === ConnectionState.Reconnecting) {
    simpleState = 'connecting';
  }

  // Handle toggling microphone mute state
  const handleToggleMute = useCallback(async () => {
    if (localParticipant) {
      await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    }
  }, [localParticipant, isMicrophoneEnabled]);

  // Listen to transcription events from room
  useEffect(() => {
    if (!room) return;

    const handleTranscription = (
      segments: Array<{ id: string; text: string; firstReceivedTime?: number }>,
      participant?: { identity?: string }
    ) => {
      if (!segments || segments.length === 0) return;

      const isUser = participant?.identity === localParticipant?.identity;
      const sender = isUser ? 'user' : 'assistant';
      const text = segments.map((s) => s.text).join(' ').trim();

      if (!text) return;

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.sender === sender && Date.now() - last.timestamp.getTime() < 3000) {
          return [
            ...prev.slice(0, -1),
            { ...last, text: `${last.text} ${text}`.trim(), timestamp: new Date() },
          ];
        }
        return [
          ...prev,
          {
            id: `msg-${Date.now()}-${Math.random()}`,
            sender,
            text,
            timestamp: new Date(),
          },
        ];
      });
    };

    const handleDataReceived = (payload: Uint8Array) => {
      try {
        const str = new TextDecoder().decode(payload);
        const data = JSON.parse(str);
        if (data.event === 'emergency_detected' || data.event === 'red_flag_detected') {
          setEmergencyDetected(true);
          if (data.message) setEmergencyMessage(data.message);
        }
      } catch {
        // Ignore non-json data
      }
    };

    room.on(RoomEvent.TranscriptionReceived, handleTranscription);
    room.on(RoomEvent.DataReceived, handleDataReceived);

    return () => {
      room.off(RoomEvent.TranscriptionReceived, handleTranscription);
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room, localParticipant]);

  return (
    <>
      <RoomAudioRenderer />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Conversation Transcript & Text Fallback */}
        <div className="lg:col-span-7 space-y-4">
          <TranscriptPanel
            messages={messages}
            onNewConsultation={onNewConsultation}
            isConnected={simpleState === 'connected'}
          />
        </div>

        {/* Right Column: Microphone Controls & System Metadata Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl border border-slate-800/80 p-6 shadow-2xl space-y-6">
            <MicrophoneControl
              connectionState={simpleState}
              isMuted={!isMicrophoneEnabled}
              onToggleMute={handleToggleMute}
              onStartSession={() => {}}
              onDisconnectSession={onDisconnectSession}
              agentState={agentState}
              audioTrack={audioTrack}
            />
          </div>

          <SystemStatusPanel
            connectionState={simpleState}
            emergencyDetected={emergencyDetected}
            emergencyMessage={emergencyMessage}
            onDismissEmergency={() => setEmergencyDetected(false)}
          />
        </div>
      </div>
    </>
  );
};
