/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { PageType } from '../types';
import MagneticButton from './MagneticButton';
import MetromediaLogo from './MetromediaLogo';

interface HeaderProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  onRequestQuote: () => void;
}

export default function Header({ currentPage, onPageChange, onRequestQuote }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'technology', label: 'Technology & Facility' },
    { id: 'projects', label: 'Portfolio & Contact' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-primary/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl shadow-primary/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Corporate Logo / Wordmark */}
        <button
          id="logo-home-btn"
          onClick={() => {
            onPageChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center group text-left focus:outline-none"
        >
          <MetromediaLogo iconSize={36} textColor="light" />
        </button>

        {/* Desktop Navigation Menu */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onPageChange(item.id as PageType);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative py-2 text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none cursor-pointer ${
                  isActive ? 'text-highlight' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-highlight rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Global/Quote Action Items */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5 text-highlight animate-pulse" />
            <span>GCC & MENA</span>
          </div>
          
          <MagneticButton
            id="header-quote-cta"
            onClick={onRequestQuote}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-highlight hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-slate-950 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:translate-y-[-1px] flex items-center gap-2 group cursor-pointer border border-white/10"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 text-slate-950" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/5"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 top-[73px] bg-primary/95 backdrop-blur-2xl z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full px-8 py-12 gap-8">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onPageChange(item.id as PageType);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-2xl font-semibold tracking-wide py-2 border-b border-white/5 ${
                    isActive ? 'text-highlight' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6 mt-auto mb-16">
            <div className="flex items-center gap-3 text-sm text-gray-400 font-mono bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
              <Globe className="w-4 h-4 text-highlight animate-pulse" />
              <span>HQ: Dubai Marina, United Arab Emirates</span>
            </div>

            <button
              id="mobile-header-quote-cta"
              onClick={() => {
                onRequestQuote();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-highlight text-slate-950 text-center font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent/30 border border-white/10"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
