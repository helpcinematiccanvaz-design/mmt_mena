/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Youtube, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PageType } from '../types';
import MetromediaLogo from './MetromediaLogo';

interface FooterProps {
  onPageChange: (page: PageType) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer id="main-footer" className="bg-primary pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Gradient Glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-12 w-80 h-80 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Company Statement Column */}
        <div className="flex flex-col gap-6">
          <button
            onClick={() => {
              onPageChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left focus:outline-none"
          >
            <MetromediaLogo iconSize={36} textColor="light" />
          </button>

          <p className="text-gray-400 text-sm leading-relaxed">
            Delivering award-winning, industrial-grade large format graphics and outdoor media production across GCC & MENA since 1987.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Core Capabilities Columns */}
        <div>
          <h3 className="text-white font-semibold tracking-wide text-sm mb-6 uppercase font-mono text-highlight/80">Services</h3>
          <ul className="flex flex-col gap-3">
            {[
              { id: 'outdoor-advertising', label: 'Outdoor Advertising' },
              { id: 'retail-branding', label: 'Retail Branding & Shopfronts' },
              { id: 'airport-branding', label: 'Airport Passenger Takeovers' },
              { id: 'mall-branding', label: 'Mall Rigging & Banners' },
              { id: 'building-wraps', label: 'Skyscraper Building Wraps' },
              { id: 'event-branding', label: 'National Events & Summits' }
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    onPageChange('home');
                    setTimeout(() => {
                      const element = document.getElementById('services-section');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-1 group text-left cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-highlight transition-colors" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate Navigation Columns */}
        <div>
          <h3 className="text-white font-semibold tracking-wide text-sm mb-6 uppercase font-mono text-highlight/80">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            {[
              { page: 'home', label: 'Corporate Overview' },
              { page: 'technology', label: 'Proprietary Technology' },
              { page: 'technology', label: 'Production Facility', hash: 'facility-section' },
              { page: 'projects', label: 'Case Studies' },
              { page: 'projects', label: 'B2B Lead Submission', hash: 'contact-form-section' }
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    onPageChange(item.page as PageType);
                    if (item.hash) {
                      setTimeout(() => {
                        const el = document.getElementById(item.hash);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 150);
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-1 group text-left cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-highlight transition-colors" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle East Offices Details */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-semibold tracking-wide text-sm uppercase font-mono text-highlight/80">Corporate Offices</h3>
          
          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Dubai HQ (UAE)</p>
                <p className="text-xs mt-1">Al Thanyah Fifth, Dubai Marina District, Executive Towers, Floor 44</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
              <span className="font-mono text-xs text-white/90">+971 4 456 7890</span>
            </div>

            <div className="flex gap-3">
              <Mail className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
              <span className="font-mono text-xs text-white/90">b2b@mmtmena.com</span>
            </div>

            <div className="flex gap-3">
              <Clock className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
              <span className="text-xs">Mon - Fri: 08:30 - 18:00 GST</span>
            </div>
          </div>
        </div>
      </div>

      {/* ISO, Safety, Trust Indicators */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-8 items-center justify-between text-xs text-gray-500 font-mono relative z-10">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 9001:2015 CERTIFIED</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 14001:2015 ECO-PROOF</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>OHSAS 18001 Rigger Safety</span>
          </div>
        </div>

        <div className="text-right">
          <span>Schema.org Corporation Certified</span>
        </div>
      </div>

      {/* Legal & Trademark Information */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 relative z-10">
        <div>
          <span>© 2026 MMT MENA (Metromedia Technologies). All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <button onClick={() => alert('B2B Privacy Policy: This application is configured to safely process design uploads and requests directly with secure server infrastructure without tracking or telemetry.')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
          <button onClick={() => alert('Corporate Terms & Conditions: All printing contracts are subject to local municipal permits and structural load confirmations.')} className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</button>
          <button onClick={() => alert('MMT is a registered trademark of Metromedia Technologies Inc. in Dubai and internationally.')} className="hover:text-white transition-colors cursor-pointer">Trademarks</button>
        </div>
      </div>
    </footer>
  );
}
