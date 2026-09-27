import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getQuickAssistantResponse, ChatMessage } from '../services/aiAssistantService';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  ShieldAlert,
  Info,
  LifeBuoy,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export const FloodGuardAssistant: React.FC = () => {
  const { activeRegion, showAssistantDrawer, setShowAssistantDrawer } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello, I am FloodGuard Assistant. I provide National Disaster Management Authority (NDMA) flash flood response protocols and telemetry explanations for ${activeRegion.name}. How can I assist you with safety or flood risk data?`,
      timestamp: 'Just now',
      category: 'GENERAL'
    }
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getQuickAssistantResponse(query, activeRegion);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: response.category
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const quickPrompts = [
    'What should I do during a flash flood?',
    'Why is my area showing high risk?',
    'What items belong in a 72-hour emergency go-bag?',
    'What should I avoid in hilly flash flood zones?',
    'What does the current risk level mean?'
  ];

  if (!showAssistantDrawer) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              FloodGuard Assistant
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                NDMA SAFETY
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Active Catchment: {activeRegion.name}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAssistantDrawer(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
          aria-label="Close Assistant"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="bg-amber-950/40 border-b border-amber-800/40 px-3.5 py-2 text-[11px] text-amber-300 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Emergency Disclaimer:</strong> Follow instructions from local emergency authorities. AI-generated information should not replace official emergency guidance.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[88%] p-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-700 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">
              {m.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 w-24">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950">
        <div className="text-[10px] font-mono text-slate-500 mb-1.5">SUGGESTED EMERGENCY TOPICS:</div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white whitespace-nowrap cursor-pointer transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask FloodGuard Assistant..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="p-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 text-white transition-colors cursor-pointer"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
