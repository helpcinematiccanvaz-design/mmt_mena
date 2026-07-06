/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sliders, Shield, Wind, Sun, Layers, Weight, RefreshCw, Send, CheckCircle2, Ruler } from 'lucide-react';

interface CampaignEstimatorProps {
  onLockSpecs: (specsText: string) => void;
}

export default function CampaignEstimator({ onLockSpecs }: CampaignEstimatorProps) {
  // Slider Inputs
  const [width, setWidth] = useState<number>(18);
  const [height, setHeight] = useState<number>(6);
  const [duration, setDuration] = useState<number>(12);

  // Selector States
  const [material, setMaterial] = useState<string>('mesh');
  const [climate, setClimate] = useState<string>('desert');

  // Outputs States
  const [area, setArea] = useState<number>(108);
  const [dpi, setDpi] = useState<number>(180);
  const [windLoad, setWindLoad] = useState<string>('');
  const [warranty, setWarranty] = useState<number>(10);
  const [weight, setWeight] = useState<number>(48.6);
  const [isSeamless, setIsSeamless] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Recalculate parameters on changes
  useEffect(() => {
    const computedArea = width * height;
    setArea(computedArea);

    // DPI calculation: smaller formats require higher density
    let computedDpi = 360;
    if (computedArea > 250) {
      computedDpi = 90;
    } else if (computedArea > 60) {
      computedDpi = 180;
    }
    setDpi(computedDpi);

    // Seamless check (MMT seamless drum supports up to 5.2m height/width)
    const seamlessState = width <= 5.2 || height <= 5.2;
    setIsSeamless(seamlessState);

    // Weight calculation: mesh is lighter, backlit is heavier
    let weightPerSqm = 0.45; // 450gsm
    if (material === 'backlit') weightPerSqm = 0.65;
    if (material === 'sustainable') weightPerSqm = 0.38;
    setWeight(parseFloat((computedArea * weightPerSqm).toFixed(1)));

    // Wind Load calculations based on material and climate
    let rating = 'DIN 1055-4 Class A (Standard)';
    if (climate === 'desert') {
      rating = material === 'mesh' 
        ? 'DIN 1055-4 Class E (High Durability - Up to 180 km/h)'
        : 'DIN 1055-4 Class D (Up to 140 km/h)';
    } else if (climate === 'urban') {
      rating = 'DIN 1055-4 Class C (Structural High-Rise - Up to 120 km/h)';
    }
    setWindLoad(rating);

    // Warranty calculation
    let years = 10;
    if (climate === 'desert') {
      years = material === 'sustainable' ? 5 : 8;
    } else {
      years = material === 'mesh' ? 12 : 10;
    }
    setWarranty(years);
  }, [width, height, duration, material, climate]);

  const handleLockSpecsAction = () => {
    const specsMessage = `TECHNICAL PRE-PRESS BLUEPRINT LOCK:\n` +
      `- Dimensions: ${width}m Width x ${height}m Height (Total: ${area} sqm)\n` +
      `- Material Substrate: ${material === 'mesh' ? 'Heavy-Duty Polyester Mesh (450gsm)' : material === 'backlit' ? 'Premium Backlit Vinyl (650gsm)' : 'Sustainable ECO Fabric (380gsm)'}\n` +
      `- Climate Tolerance Factor: ${climate === 'desert' ? 'Extreme Desert Oasis (High UV Index)' : climate === 'urban' ? 'Urban High-Altitude Wind Profile' : 'Coastal High Humidity'}\n` +
      `- Calibrated Resolution: ${dpi} DPI Precision\n` +
      `- Wind Load Resistance Code: ${windLoad}\n` +
      `- Extended Acrylic Warranty: ${warranty} Years Zero-Fade Protection\n` +
      `- Joining Tech: ${isSeamless ? '100% Seamless single-sheet' : 'Sonic Fusion Weld Seaming required'}`;
    
    onLockSpecs(specsMessage);
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 2000);
  };

  return (
    <div id="campaign-estimator-widget" className="glass-panel rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
      {/* Decorative Blueprint Graph Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/5 rounded-full blur-2xl z-0 pointer-events-none" />
      
      {/* Widget Header */}
      <div className="px-6 py-5 bg-white/2 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-highlight/10 border border-highlight/20 text-highlight flex items-center justify-center animate-pulse-slow">
            <Ruler className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-widest text-highlight uppercase font-bold">Interactive Engineering Tool</span>
            <h3 className="text-white font-extrabold text-base sm:text-lg">Dynamic Campaign Spec Estimator</h3>
          </div>
        </div>

        <button
          onClick={() => {
            setWidth(18);
            setHeight(6);
            setMaterial('mesh');
            setClimate('desert');
          }}
          className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Tool</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Interactive Input Parameters Block (7 Columns) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col gap-6 text-left border-r border-white/5">
          <h4 className="text-white font-bold text-xs font-mono uppercase tracking-widest border-b border-white/5 pb-2">
            1. Calibrate Dimensions & Environment
          </h4>

          {/* Width Slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400 uppercase tracking-wider">Campaign Width:</span>
              <span className="text-white font-extrabold text-sm">{width} Meters</span>
            </div>
            <input
              type="range"
              min="2"
              max="100"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="w-full accent-highlight h-1.5 bg-primary/80 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-600">
              <span>Min: 2m</span>
              <span>Unipole standard: 18m</span>
              <span>Skyscraper Max: 100m</span>
            </div>
          </div>

          {/* Height Slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400 uppercase tracking-wider">Campaign Height:</span>
              <span className="text-white font-extrabold text-sm">{height} Meters</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full accent-highlight h-1.5 bg-primary/80 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-600">
              <span>Min: 2m</span>
              <span>Unipole standard: 6m</span>
              <span>Facade Max: 40m</span>
            </div>
          </div>

          {/* Substrate & Material Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Substrate Subsurface</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'mesh', label: 'Polyester Wind Mesh', desc: '450gsm, ventilated' },
                  { id: 'backlit', label: 'Premium Backlit Vinyl', desc: '650gsm, translucent' },
                  { id: 'sustainable', label: 'Sustainable ECO Fabric', desc: '380gsm, PVC-Free' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      material === m.id
                        ? 'bg-accent/15 border-accent text-white shadow-md'
                        : 'bg-primary/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold font-sans">{m.label}</p>
                    <p className="text-[9px] font-mono text-gray-500 mt-0.5">{m.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Microclimate Stressors</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'desert', label: 'Extreme Desert Oasis', desc: 'High UV Index, sandstorms' },
                  { id: 'urban', label: 'Urban High-Rise Profile', desc: 'Extreme windshear values' },
                  { id: 'coastal', label: 'Coastal High Humidity', desc: 'Salt air corrosion vectors' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setClimate(c.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      climate === c.id
                        ? 'bg-highlight/10 border-highlight text-white shadow-md'
                        : 'bg-primary/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold font-sans">{c.label}</p>
                    <p className="text-[9px] font-mono text-gray-500 mt-0.5">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Calibrated Output Telemetry Block (5 Columns) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-white/1 flex flex-col justify-between gap-6 text-left relative overflow-hidden">
          
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-xs font-mono uppercase tracking-widest border-b border-white/5 pb-2 flex items-center justify-between">
              <span>2. Calculated Specifications</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </h4>

            {/* Total Square Meters Gauge Output */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-primary/40 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-highlight/10 text-highlight flex items-center justify-center font-bold text-xs font-mono">
                  M²
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase block">Total Print Footprint</span>
                  <span className="text-white font-extrabold text-lg tracking-tight font-sans">{area} Square Meters</span>
                </div>
              </div>
            </div>

            {/* Technical Parameters List */}
            <div className="flex flex-col gap-3.5 text-xs font-mono text-gray-400">
              
              <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-highlight" />
                  <span>DPI Resolution density:</span>
                </span>
                <span className="text-white font-bold">{dpi} Calibrated DPI</span>
              </div>

              <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-highlight" />
                  <span>Wind Load rating:</span>
                </span>
                <span className="text-white font-bold text-right truncate max-w-[170px]">{windLoad}</span>
              </div>

              <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-highlight" />
                  <span>UV Fading warranty:</span>
                </span>
                <span className="text-highlight font-bold">{warranty} Years Extended (Acrylic)</span>
              </div>

              <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-highlight" />
                  <span>Est. Material weight:</span>
                </span>
                <span className="text-white font-bold">~{weight} kg</span>
              </div>

              <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-highlight" />
                  <span>Material joining strategy:</span>
                </span>
                <span className={`font-bold uppercase text-[10px] ${isSeamless ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isSeamless ? '100% Seamless Fabric' : 'Sonic Fusion Weld seams'}
                </span>
              </div>

            </div>
          </div>

          {/* Action Trigger button to Lock and Send to Form */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            <button
              onClick={handleLockSpecsAction}
              className={`w-full py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                isLocked 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-98' 
                  : 'bg-accent hover:bg-highlight hover:text-primary hover:shadow-lg hover:shadow-accent/30 text-white'
              }`}
            >
              {isLocked ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                  <span>Blueprints Transmitted!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Lock Specifications Into Form</span>
                </>
              )}
            </button>
            <p className="text-[9px] text-gray-500 font-mono text-center leading-relaxed">
              *Locking compiles calculated area parameters and auto-fills the inquiry description desk message below.*
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
