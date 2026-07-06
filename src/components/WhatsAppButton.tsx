/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('dubai');
  const [messageText, setMessageText] = useState('Hello MMT MENA, I would like to request a specialized B2B large-format quote.');

  const agents = [
    {
      id: 'dubai',
      name: 'Dubai Head Office Sales',
      role: 'SZR, Airports & Wraps',
      phone: '+97144567890',
      avatarBg: 'bg-accent',
      initials: 'DH'
    },
    {
      id: 'riyadh',
      name: 'KSA Regional Sales',
      role: 'Riyadh Boulevard & Events',
      phone: '+96611234567',
      avatarBg: 'bg-emerald-600',
      initials: 'RH'
    },
    {
      id: 'logistics',
      name: 'Logistics & Rigging Control',
      role: 'GCC Delivery Coordination',
      phone: '+97144567891',
      avatarBg: 'bg-amber-600',
      initials: 'LR'
    }
  ];

  const activeAgentObj = agents.find((a) => a.id === selectedAgent) || agents[0];

  const handleSend = () => {
    const cleanPhone = activeAgentObj.phone.replace('+', '');
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const selectPredefined = (text: string) => {
    setMessageText(text);
  };

  return (
    <div id="whatsapp-container" className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Dynamic Popover Window */}
      {isOpen && (
        <div
          id="whatsapp-popover"
          className="bg-primary/95 border border-white/10 rounded-2xl shadow-2xl shadow-black/80 w-80 sm:w-96 mb-4 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-accent to-highlight p-5 relative">
            <button
              id="whatsapp-close-btn"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">MMT MENA Support</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 text-[10px] uppercase font-mono tracking-widest">Active • Response time: 5 mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agents Picker */}
          <div className="p-4 border-b border-white/5 bg-white/2 flex flex-col gap-2">
            <p className="text-gray-400 text-[10px] font-mono uppercase tracking-wider mb-1">Select Specialized Team:</p>
            <div className="grid grid-cols-1 gap-2">
              {agents.map((agent) => {
                const isSelected = selectedAgent === agent.id;
                return (
                  <button
                    key={agent.id}
                    id={`wa-agent-${agent.id}`}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-accent/10 border-accent/40 text-white'
                        : 'bg-white/5 border-transparent text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${agent.avatarBg} flex items-center justify-center text-xs font-bold text-white shadow-md`}>
                        {agent.initials}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{agent.name}</p>
                        <p className="text-[10px] text-gray-400">{agent.role}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-highlight/20 border border-highlight/50 flex items-center justify-center text-highlight">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Predefined prompts */}
          <div className="px-4 py-3 bg-white/1 flex flex-col gap-1.5 border-b border-white/5">
            <p className="text-gray-400 text-[10px] font-mono uppercase tracking-wider mb-1">Quick Scenarios:</p>
            <div className="flex flex-col gap-2">
              <button
                id="wa-predefined-1"
                onClick={() => selectPredefined('Hello MMT, I would like to request custom specifications & estimates for a skyscraper Building Wrap.')}
                className="text-[11px] text-left text-highlight hover:text-white bg-highlight/5 border border-highlight/10 hover:bg-highlight/10 px-3 py-1.5 rounded-lg transition-all"
              >
                Building Wrap Specs & Quotes
              </button>
              <button
                id="wa-predefined-2"
                onClick={() => selectPredefined('Hello MMT, we have an upcoming Airport takeover campaign. Can you assist with our strict security clearance guidelines?')}
                className="text-[11px] text-left text-highlight hover:text-white bg-highlight/5 border border-highlight/10 hover:bg-highlight/10 px-3 py-1.5 rounded-lg transition-all"
              >
                Airport Rigging & Clearance Guides
              </button>
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 bg-primary flex flex-col gap-3">
            <textarea
              id="wa-msg-input"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full h-16 rounded-lg bg-white/5 border border-white/10 p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent resize-none placeholder-gray-500"
              placeholder="Type your WhatsApp inquiry message..."
            />

            <button
              id="wa-submit-btn"
              onClick={handleSend}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <span>Initiate Chat via WA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Floating Button */}
      <button
        id="whatsapp-floating-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 shadow-2xl hover:scale-115 relative group ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 rotate-90 shadow-red-500/20'
            : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30'
        }`}
        aria-label="Contact us on WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 border-2 border-primary text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
              1
            </span>
            {/* Hover Tooltip text */}
            <span className="absolute right-16 bg-primary border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
              Connect with B2B Sales
            </span>
          </>
        )}
      </button>
    </div>
  );
}
