import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui';

export function Copilot({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
    { role: 'ai', content: "Hello! I am BharatProcure Copilot, your AI procurement assistant. I can help you find startups, structure challenges, or analyze pilot metrics based on our demo database. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");

    // Mock AI Responses based on prompt keywords
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = "I'm currently operating in Demo Mode. I don't have real-time data for that, but I can help you with the Pune Water Leakage challenge.";
      
      if (lowerInput.includes('pune')) {
        response = "Yes, we have 3 startups located in Pune that match the water leakage challenge, including AquaSense Technologies, which has a 94% technical match.";
      } else if (lowerInput.includes('why') || lowerInput.includes('recommend')) {
        response = "AquaSense Technologies is recommended because it has strong technical capability (IoT & Anomaly Detection), is located in Pune (reducing implementation friction), and its ₹8 lakh estimate fits the budget.";
      } else if (lowerInput.includes('pilot')) {
        response = "The pilot with AquaSense achieved a 94% detection accuracy and reduced water loss by 21%. It exceeded all targets and I recommend it for procurement consideration.";
      } else if (lowerInput.includes('scale')) {
        response = "Based on our capability map, this solution can be scaled immediately to Municipal Corporations in Mumbai, Nashik, and Nagpur which have reported similar non-revenue water issues.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 800);
  };

  return (
    <div className={cn(
      "fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-transform duration-300 ease-in-out z-40",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-slate-800">BharatProcure Copilot</h3>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
              msg.role === 'user' ? "bg-blue-600 text-white rounded-tr-sm" : "bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about startups, pilots..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSend} size="default" className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
