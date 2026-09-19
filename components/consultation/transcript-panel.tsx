'use client';

import React, { useEffect, useRef } from 'react';
import { Bot, User, MessageSquare, RefreshCw, Send, Lock } from 'lucide-react';

export interface TranscriptMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  language?: string;
}

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
  onNewConsultation: () => void;
  isConnected: boolean;
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  messages,
  onNewConsultation,
  isConnected,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="glass-panel rounded-3xl border border-slate-800/80 p-5 sm:p-6 shadow-2xl flex flex-col h-[520px] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live Conversation Transcript</h3>
            <p className="text-xs text-slate-400">Real-time voice-to-text transcript</p>
          </div>
        </div>

        <button
          onClick={onNewConsultation}
          className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          New Consultation
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-3 py-12">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
              <Bot className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-400">Your conversation will appear here.</p>
            <p className="text-xs text-slate-500 max-w-xs">
              Click &quot;Start Consultation&quot; and speak in Telugu, Hindi, or English.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] sm:max-w-[78%] rounded-2xl p-4 space-y-1 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 text-cyan-100 border border-cyan-800/60 rounded-tr-none shadow-md'
                    : 'bg-slate-900/90 text-slate-100 border border-slate-800 rounded-tl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-slate-400 pb-1 border-b border-white/5">
                  <span className={msg.sender === 'user' ? 'text-cyan-400' : 'text-emerald-400'}>
                    {msg.sender === 'user' ? 'YOU' : 'MEDICO AI'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-slate-100 whitespace-pre-wrap">{msg.text}</p>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Disabled Text Interaction Fallback */}
      <div className="pt-4 border-t border-slate-800/80 mt-2 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-300">Prefer typing?</span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-500" />
            Voice-first mode active
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            disabled
            placeholder="Text interaction will be available in a future version."
            className="w-full bg-slate-900/60 text-slate-500 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none cursor-not-allowed opacity-75"
          />
          <button
            disabled
            aria-label="Send message"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-800 text-slate-600 cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
