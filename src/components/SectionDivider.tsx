/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface SectionDividerProps {
  type?: 'blueprint' | 'neon' | 'wave' | 'slope';
  fromBg?: 'primary' | 'secondary' | 'darker';
  toBg?: 'primary' | 'secondary' | 'darker';
  className?: string;
  id?: string;
}

export default function SectionDivider({
  type = 'blueprint',
  fromBg = 'primary',
  toBg = 'secondary',
  className = '',
  id,
}: SectionDividerProps) {
  // BG colors mapped to CSS tailwind classes
  const bgClasses = {
    primary: '#071A2D',
    secondary: '#0c253d',
    darker: '#040d16',
  };

  const currentFromBg = bgClasses[fromBg] || bgClasses.primary;
  const currentToBg = bgClasses[toBg] || bgClasses.secondary;

  const renderDivider = () => {
    switch (type) {
      case 'slope': {
        // A diagonal wedge wedge with gridlines overlay & glowing neon seam
        return (
          <div className="relative w-full overflow-hidden" style={{ height: '70px' }}>
            <svg
              viewBox="0 0 1440 70"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="slopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1565FF" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#00C8FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1565FF" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {/* Solid wedge shape for the background transition */}
              <path
                d="M0 0 L1440 50 L1440 70 L0 70 Z"
                fill={currentToBg}
              />
              {/* Highlight Neon Seam Line */}
              <motion.path
                d="M0 0 L1440 50"
                stroke="url(#slopeGrad)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            {/* Tech Dots on the path */}
            <div className="absolute top-[25px] left-1/4 w-1.5 h-1.5 rounded-full bg-highlight shadow-[0_0_8px_#00C8FF] animate-ping" />
            <div className="absolute top-[38px] left-3/4 w-1 h-1 rounded-full bg-accent shadow-[0_0_6px_#1565FF] animate-pulse" />
          </div>
        );
      }

      case 'neon': {
        // Futuristic double laser lines with a central coordinate crosshair & sweeping dot
        return (
          <div className="relative w-full flex items-center justify-center py-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              {/* Split left and right fading neon rules */}
              <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-highlight/40 to-highlight/80" />
              <div className="w-1/2 h-px bg-gradient-to-l from-transparent via-highlight/40 to-highlight/80" />
            </div>

            {/* Glowing Focal Point with telemetry aesthetic */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="absolute -inset-2.5 rounded-full bg-highlight/10 blur-sm animate-pulse-glow" />
              
              {/* Outer crosshair brackets */}
              <svg className="w-8 h-8 text-highlight/60 animate-spin" style={{ animationDuration: '24s' }} viewBox="0 0 40 40">
                <path d="M 12,4 A 16,16 0 0,1 28,4" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M 28,36 A 16,16 0 0,1 12,36" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>

              {/* Inner core circle */}
              <div className="absolute w-2 h-2 rounded-full bg-white border border-highlight shadow-[0_0_10px_#00C8FF] z-20" />
              
              {/* Coordinate label */}
              <span className="absolute -bottom-6 text-[8px] font-mono tracking-widest text-highlight uppercase">
                CAL_PT // 01
              </span>
            </div>

            {/* Secondary subtle rule */}
            <div className="absolute bottom-1 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        );
      }

      case 'wave': {
        // Aero Wind-tunnel mesh. Multiple curves simulating aerodynamic wind simulation across billboards
        return (
          <div className="relative w-full overflow-hidden" style={{ height: '50px' }}>
            <svg
              viewBox="0 0 1440 50"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full opacity-35"
            >
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="25%" stopColor="#1565FF" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#00C8FF" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#1565FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              
              {/* Wave 1 */}
              <motion.path
                d="M0 25 Q360 5, 720 25 T1440 25"
                fill="none"
                stroke="url(#waveGrad)"
                strokeWidth="1"
                animate={{ d: [
                  "M0 25 Q360 5, 720 25 T1440 25",
                  "M0 25 Q360 45, 720 25 T1440 25",
                  "M0 25 Q360 5, 720 25 T1440 25"
                ] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Wave 2 */}
              <motion.path
                d="M0 25 Q360 40, 720 25 T1440 25"
                fill="none"
                stroke="url(#waveGrad)"
                strokeWidth="0.75"
                strokeDasharray="4 4"
                animate={{ d: [
                  "M0 25 Q360 40, 720 25 T1440 25",
                  "M0 25 Q360 10, 720 25 T1440 25",
                  "M0 25 Q360 40, 720 25 T1440 25"
                ] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Solid divider line */}
              <line x1="0" y1="25" x2="1440" y2="25" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" />
            </svg>
          </div>
        );
      }

      case 'blueprint':
      default: {
        // High-tech Millimeter scale rule / caliper blueprint look
        return (
          <div className="relative w-full h-12 flex flex-col justify-end overflow-hidden select-none pointer-events-none">
            {/* Ambient horizontal rule */}
            <div className="w-full h-px bg-white/10" />

            {/* Rule tics */}
            <div className="w-full h-4 relative flex justify-between px-4 opacity-40">
              {Array.from({ length: 41 }).map((_, idx) => {
                const isMajor = idx % 10 === 0;
                const isMedium = idx % 5 === 0 && !isMajor;
                
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center"
                    style={{ width: '1px' }}
                  >
                    <div
                      className={`w-px transition-colors duration-500 ${
                        isMajor ? 'bg-highlight h-3' : isMedium ? 'bg-accent h-2' : 'bg-white/20 h-1'
                      }`}
                    />
                    {isMajor && (
                      <span className="text-[7px] font-mono text-gray-500 mt-1">
                        {(idx * 2.5).toFixed(0)}mm
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Technical Labels */}
            <div className="absolute top-1 left-8 flex items-center gap-1 text-[8px] font-mono text-highlight/50 uppercase tracking-widest">
              <span>grid_snap: 10mm</span>
              <span className="w-1 h-1 rounded-full bg-highlight animate-ping" />
            </div>
            <div className="absolute top-1 right-8 text-[8px] font-mono text-gray-600 uppercase tracking-widest">
              sys_status: [CALIBRATED_100%]
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div
      id={id}
      className={`w-full relative z-10 transition-colors duration-500 ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${currentFromBg}, ${currentToBg})`,
      }}
    >
      {renderDivider()}
    </div>
  );
}
